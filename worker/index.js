// Cloudflare Worker entry point.
//
// The site itself is static (dist/), served by Workers static assets. This
// script runs first on every request (see run_worker_first in wrangler.jsonc)
// to redirect www to the bare domain and to handle /api/lead, which reuses the
// Pages Function so the site deploys the same way on Workers or Pages.
import { onRequestPost as handleLead } from '../functions/api/lead.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.hostname === 'www.greaterwildlifecontrol.ca') {
      url.hostname = 'greaterwildlifecontrol.ca';
      return Response.redirect(url.toString(), 301);
    }
    const { pathname } = url;
    if (pathname === '/api/lead') {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
      }
      return handleLead({ request, env, ctx });
    }
    return env.ASSETS.fetch(request);
  },
};
