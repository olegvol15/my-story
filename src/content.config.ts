import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      cover: image().optional(),
      coverAlt: z.string().default(""),
      draft: z.boolean().default(false),
    }),
});

export const collections = { writing };
