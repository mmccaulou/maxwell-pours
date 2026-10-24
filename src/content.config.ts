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
    featured: z.boolean().optional().default(false),   // pin to the homepage hero
  }),
});

// Work With Me services: one file per service card. The card on /work-with-me
// and the service's own page both read from here, so they never drift apart.
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    track: z.enum(['restaurants', 'cellars']),
    order: z.number(),              // position within its track (1–3)
    tag: z.string(),                // "From scratch", "Year-round", …
    blurb: z.string(),              // card description + page intro
    billing: z.string(),            // "One-time project", "Monthly retainer"
    price: z.string(),              // "$3,500"
    priceUnit: z.string().optional().default(''),   // "/month" or empty
    description: z.string(),        // meta description
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  }),
});

export const collections = { posts, services };
