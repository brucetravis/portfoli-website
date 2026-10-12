import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
    schema: ({ image }) =>
        z.object({
        title: z.string(),
        summary: z.string(),
        year: z.number(),
        role: z.string(),
        status: z.enum(['Live', 'In development', 'Archived']),
        stack: z.array(z.string()),
        links: z
            .object({
                live: z.string().url().optional(),
                code: z.string().url().optional(),
            })
            .optional(),
        cover: image().optional(),
        label: z.string().optional(),
        size: z.enum(['featured', 'tall', 'wide', 'small']).default('small'),
        order: z.number().default(0),
        draft: z.boolean().default(false),
    }),
});

export const collections = { work };