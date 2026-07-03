import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  // Astro v5+ Content Layer API: glob() picks up every .md file in src/content/posts/
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.enum(['in-the-glass', 'on-the-floor', 'at-the-table', 'off-the-map', 'punch-downs']).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { posts };
