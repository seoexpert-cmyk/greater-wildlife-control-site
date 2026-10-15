import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Articles for local pages (/on/toronto/raccoon-removal) and service pages
// (/services/raccoon-removal). The file path mirrors the URL.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string(),
    meta_description: z.string(),
    path: z.string(),
    hero_image: z.string().optional(),
    source: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Greater Wildlife Control'),
    featured_image: z.string().optional(),
    source: z.string().optional(),
  }),
});

export const collections = { pages, blog };
