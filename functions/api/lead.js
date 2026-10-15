// Cloudflare Pages Function: POST /api/lead
//
// Replaces the PocketBase `leads` collection + lead-routing hook from the
// Horizons site. It validates the form, works out the franchisee from the
// city in the page URL (src/data/cities.json), and forwards the lead to the
// Make.com webhook in the MAKE_WEBHOOK_URL environment variable, using the
// same JSON fields the old hook sent so the existing Make scenario keeps
// working.
import cities from '../../src/data/cities.json';

const PHONE_RE = /^[+]?[\d\s().-]{10,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v, max = 500) => String(v ?? '').trim().slice(0, max);
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

function franchiseeFor(sourceUrl) {
  try {
    const [province, city] = new URL(sourceUrl).pathname.split('/').filter(Boolean);
    const match = cities.find((c) => c.province === province && c.slug === city);
    if (!match) return '';
    if (match.franchiseeEmail) return match.franchiseeEmail;
    // Cities without their own franchisee fall back to their hub's.
    const hub = cities.find((c) => c.province === province && c.slug === match.parentHub);
    return hub?.franchiseeEmail || '';
  } catch {
    return '';
  }
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.website)) return json({ ok: true });

  const lead = {
    id: crypto.randomUUID(),
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 200),
    postal_code: clean(body.postal_code, 20),
    animal_issue: clean(body.animal_issue, 200),
    source_url: clean(body.source_url || request.headers.get('Referer'), 500),
    status: 'New',
    created: new Date().toISOString(),
  };
  const phoneDigits = lead.phone.replace(/\D/g, '');
  if (lead.name.length < 2 || !PHONE_RE.test(lead.phone) || phoneDigits.length < 10) {
    return json({ error: 'Please enter your name and a valid phone number.' }, 400);
  }
  if (lead.email && !EMAIL_RE.test(lead.email)) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }
  lead.assigned_franchisee_email = franchiseeFor(lead.source_url);

  if (!env.MAKE_WEBHOOK_URL) {
    console.error('MAKE_WEBHOOK_URL is not set; lead not forwarded', lead.id);
    return json({ error: 'Lead service is not configured' }, 500);
  }
  const res = await fetch(env.MAKE_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    console.error('Make.com webhook rejected lead', lead.id, res.status, await res.text());
    return json({ error: 'Could not send your request. Please call us.' }, 502);
  }
  return json({ ok: true });
}
