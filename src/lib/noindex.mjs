// Which generated pages are thin (no written article yet) and should be
// kept out of Google: noindex meta tag + left out of sitemap.xml.
// A page becomes indexable as soon as src/content/pages/<path>.md exists.
import fs from 'node:fs';
import path from 'node:path';

// Resolved from the project root (where `astro build` runs), so this works
// both from astro.config.mjs and from the bundled pages.
const root = path.join(process.cwd(), 'src');
const cities = JSON.parse(fs.readFileSync(path.join(root, 'data/cities.json'), 'utf8'));
const services = JSON.parse(fs.readFileSync(path.join(root, 'data/services.json'), 'utf8'));
import { EXTRA_SERVICE_SLUGS } from './extraServices.mjs';

const hasArticle = (urlPath) => fs.existsSync(path.join(root, 'content/pages', `${urlPath}.md`));

let cache;
export function noindexPaths() {
  if (cache) return cache;
  cache = new Set();
  for (const c of cities) {
    for (const s of services) {
      const p = `/${c.province}/${c.slug}/${s.slug}`;
      if (!hasArticle(p)) cache.add(p);
    }
  }
  for (const slug of [...services.map((s) => s.slug), ...EXTRA_SERVICE_SLUGS]) {
    const p = `/services/${slug}`;
    if (slug !== 'wildlife-control' && !hasArticle(p)) cache.add(p);
  }
  return cache;
}
