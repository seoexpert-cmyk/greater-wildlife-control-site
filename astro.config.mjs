import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { noindexPaths } from './src/lib/noindex.mjs';

const SITE = 'https://greaterwildlifecontrol.ca';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      // Pages without real content are noindexed and kept out of the sitemap.
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '') || '/';
        return !noindexPaths().has(path) && path !== '/partner' && path !== '/404';
      },
    }),
  ],
  vite: {
    resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
  },
});
