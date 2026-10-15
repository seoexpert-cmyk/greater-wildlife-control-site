# Greater Wildlife Control website

The source for https://greaterwildlifecontrol.ca, rebuilt from the Hostinger Horizons export as a static [Astro](https://astro.build) site. Every page is plain HTML at build time, so search engines see the full content.

## Running it locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # writes the site to dist/
```

## Where things live

| What | Where |
| --- | --- |
| Cities and hubs (91) | `src/data/cities.json`. Each city has `franchiseeEmail` for lead routing. A city without one uses its hub's. |
| Services (11) | `src/data/services.json` |
| Homepage hero and sections | `src/data/homepage.json` |
| Local and service page articles | `src/content/pages/<province>/<city>/<service>.md` and `src/content/pages/services/<service>.md` |
| Blog posts | `src/content/blog/<slug>.md` |
| Page templates | `src/pages/` (`[province]/[city]/[service].astro` is the city × service page) |
| Shared React components from Horizons | `src/components/`, `src/views/` |
| Lead form endpoint | `functions/api/lead.js` (Cloudflare Pages Function) |

## Adding an article

Create a Markdown file whose path matches the URL, with this front matter:

```md
---
title: "Raccoon Removal in Markham, ON: Humane Attic Eviction"   # H1
meta_title: "Raccoon Removal in Markham, ON"                       # " | Greater Wildlife Control" is added automatically
meta_description: "140–155 characters."
path: "/on/markham/raccoon-removal"
---

## First section
...
```

Blog posts go in `src/content/blog/` and use `title`, `description`, `date` and optionally `meta_title` and `featured_image`.

**Indexing:** a city × service page or `/services/*` page with no article is built (so links never break), but it gets `noindex` and is left out of the sitemap. Adding its Markdown file makes it indexable automatically. See `src/lib/noindex.mjs`.

**Titles:** never use "Professional" in titles or headings. A competitor is called Professional Wildlife Control.

## Leads

The forms POST to `/api/lead`. The function:
1. validates the input;
2. finds the franchisee from the city in the page URL;
3. forwards the lead to Make.com.

The JSON fields are the same ones the old PocketBase hook sent: `id`, `name`, `phone`, `email`, `postal_code`, `animal_issue`, `source_url`, `assigned_franchisee_email`, `status` and `created`.

Set the webhook URL as the `MAKE_WEBHOOK_URL` environment variable in Cloudflare Pages. It isn't stored in this repository.

The old site also emailed every lead to service@greaterwildlifecontrol.ca. Add an email step to the Make scenario to keep that alert.

## Deploying (Cloudflare Pages)

- **Framework preset:** Astro.
- **Build command:** `npm run build`.
- **Output directory:** `dist`.
- **Environment variables:** `MAKE_WEBHOOK_URL`, and `NODE_VERSION=22`.
- **After DNS points to Cloudflare:** submit `https://greaterwildlifecontrol.ca/sitemap-index.xml` in Google Search Console. `/sitemap.xml` redirects there.
