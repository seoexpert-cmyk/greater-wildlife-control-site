// Sends a lead to the /api/lead function (functions/api/lead.js), which
// attaches the franchisee for the page's city and forwards it to Make.com.
export async function submitLead(lead) {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`Lead submit failed (${res.status})`);
  return res.json().catch(() => ({}));
}
