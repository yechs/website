import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writingSchema = z.looseObject({
  title: z.string(),
  titleId: z.string().optional(),
  slug: z.string().optional(),
  date: z.coerce.date().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  authors: z.array(z.string()).optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const knowledgeBaseSchema = z.looseObject({
  title: z.string().optional(),
  slug: z.string().optional(),
  id: z.string().optional(),
  sidebar_label: z.string().optional(),
  sidebar_position: z.number().optional(),
});

const writing = defineCollection({
  loader: glob({
    base: './src/content/writing',
    pattern: '**/*.{md,mdx}',
  }),
  schema: writingSchema,
});

const knowledgeBase = defineCollection({
  loader: glob({
    base: './src/content/knowledge-base',
    pattern: '**/*.{md,mdx}',
  }),
  schema: knowledgeBaseSchema,
});

export const collections = { knowledgeBase, writing };
