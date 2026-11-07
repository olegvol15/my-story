import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      cover: image().optional(),
      coverAlt: z.string().default(""),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One line: used on the card's page meta and as the SEO description. */
      description: z.string(),
      status: z.enum(["building", "live", "paused", "archived"]).default("building"),
      started: z.coerce.date(),
      cover: image().optional(),
      coverAlt: z.string().default(""),
      stack: z.array(z.string()).default([]),
      links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
      /** Changelog. Order in the file doesn't matter; it's sorted newest first. */
      shipped: z.array(z.object({ date: z.coerce.date(), text: z.string() })).default([]),
      /** Roadmap, in the order you intend to do it. Move a line to `shipped` when it lands. */
      planned: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { writing, projects };
