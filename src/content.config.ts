import { defineCollection } from "astro:content";
import { z } from "astro/zod";
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
      description: z.string(),
      status: z.enum(["building", "live", "paused", "archived"]).default("building"),
      started: z.coerce.date(),
      cover: image().optional(),
      coverAlt: z.string().default(""),
      stack: z.array(z.string()).default([]),
      links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
      key: z.string().regex(/^[A-Z][A-Z0-9]{1,5}$/).optional(),
      tickets: z
        .array(
          z
            .object({
              title: z.string(),
              status: z.enum(["backlog", "in-progress", "done"]),
              done: z.coerce.date().optional(),
              href: z.url().optional(),
            })
            .refine((t) => t.status !== "done" || t.done, {
              message: "a done ticket needs a `done` date",
              path: ["done"],
            }),
        )
        .default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { writing, projects };
