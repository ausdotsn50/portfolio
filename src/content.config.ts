import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// "Selected Work" projects — one markdown file per project in src/content/projects/.
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: () =>
    z.object({
      title: z.string(),
      tagline: z.string(), // one line, for the album-sleeve card
      description: z.string(), // longer, shown in the modal as "liner notes"
      techStack: z.array(z.string()),
      url: z.string().url().optional(),
      featured: z.boolean().default(false), // show on the landing page
    }),
});

export const collections = { projects };
