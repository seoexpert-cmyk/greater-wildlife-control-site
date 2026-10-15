// Cloudflare Worker entry point.
//
// The site itself is static (dist/), served by Workers static assets. Only
// /api/* reaches this script (see run_worker_first in wrangler.jsonc); the
// lead endpoint reuses the Pages Function so the site deploys the same way on
// Workers or Pages.
import { onRequestPost as handleLead } from '../functions/api/lead.js';

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/lead') {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
      }
      return handleLead({ request, env, ctx });
    }
    return env.ASSETS.fetch(request);
  },
};
