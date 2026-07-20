import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			author: z.string(),
			pillar: z.enum([
				'Quantum Algorithms',
				'Quantum Hardware',
				'Quantum Cryptography',
				'AI Integrations',
				'Future Tech',
			]).optional(),
			featured: z.boolean().optional(),
			tags: z.array(z.string()).optional(),
			series: z.string().optional(),
			seriesOrder: z.number().int().optional(),
		}),
});

const authors = defineCollection({
	loader: glob({ base: './src/content/authors', pattern: '**/*.md' }),
	schema: z.object({
		name: z.string(),
		role: z.string().optional(),
		bio: z.string().optional(),
		avatarUrl: z.string().optional(),
		social: z.object({
			twitter: z.string().optional(),
			github: z.string().optional(),
			linkedin: z.string().optional(),
			website: z.string().optional(),
		}).optional(),
	}),
});

export const collections = { blog, authors };
