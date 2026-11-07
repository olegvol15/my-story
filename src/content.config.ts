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
      /** One line: used on the card's page meta and as the SEO description. */
      description: z.string(),
      status: z.enum(["building", "live", "paused", "archived"]).default("building"),
      started: z.coerce.date(),
      cover: image().optional(),
      coverAlt: z.string().default(""),
      stack: z.array(z.string()).default([]),
      links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
      /** Ticket key prefix (TIP -> TIP-1, TIP-2…). Defaults to the slug's first 3 letters. */
      key: z.string().regex(/^[A-Z][A-Z0-9]{1,5}$/).optional(),
      /**
       * The project board. Keys come from list position, so only ever append new
       * tickets at the end; move one between columns by changing its status.
       */
      tickets: z
        .array(
          z
            .object({
              title: z.string(),
              status: z.enum(["backlog", "in-progress", "done"]),
              /** Required once done; also drives "updated" on the homepage card. */
              done: z.coerce.date().optional(),
              /** Optional PR/issue/release link. */
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
