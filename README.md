# olehvolostnykh.com

[![CI](https://github.com/olegvol15/my-story/actions/workflows/ci.yml/badge.svg)](https://github.com/olegvol15/my-story/actions/workflows/ci.yml)

My personal site: who I am, what I'm writing, and what I'm building, with a public changelog for each project.

**Live:** https://olehvolostnykh.com · **RSS:** [/rss.xml](https://olehvolostnykh.com/rss.xml)

It's a fully static [Astro](https://astro.build) site with no UI framework and no client-side bundle. The few scripts it has (copy-email, the particle background, the subscribe toast) are small inline progressive enhancements. Keeping it that light is the main design constraint.

## Stack

- **Astro 7**: static output, content collections, `astro:assets` image optimisation
- **TypeScript** (strict), plain scoped CSS with design tokens
- **Kit** for the newsletter (a plain HTML form POST, no embed script)
- **Cloudflare Pages** for hosting and deploys, **GitHub Actions** for CI

## Getting started

Requires Node 22 (see `.nvmrc`).

```sh
npm ci
npm run dev        # http://localhost:4321
```

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run check` | Type-check (`astro check`) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |

## Writing and projects

Content is Markdown in `src/content/`. Images live next to the file that uses them.

**New post:** add `src/content/writing/<slug>.md`, which is published at `/writing/<slug>`.

```yaml
---
title: "The long way round"
description: "Optional; falls back to an excerpt"
date: 2026-08-22
cover: "./cover.jpg"
coverAlt: "What's in the photo"
---
```

**New project:** add `src/content/projects/<slug>.md`, which is published at `/projects/<slug>`. The body is the description; the changelog lives in the frontmatter:

```yaml
---
title: "My project"
description: "One line about it"
status: building          # building | live | paused | archived
started: 2026-09-01
stack: [Astro, TypeScript]
links:
  - label: GitHub
    href: https://github.com/olegvol15/...
shipped:                  # rendered newest first
  - date: 2026-11-07
    text: What shipped
planned:                  # move an item to `shipped` (with a date) when it lands
  - What's next
---
```

Set `draft: true` on either to keep it out of the build. The full field list is in [`src/content.config.ts`](src/content.config.ts).

## Project structure

```text
src/
├── pages/          index, rss.xml, writing/[...slug], projects/[...slug]
├── layouts/        Base (every page), Article (post and project pages)
├── components/     Hero, Milestones, Feed (Writing/Projects switch), Card, Subscribe, BaseHead…
├── content/        writing/ and projects/ Markdown + images
├── lib/            sorting, filtering and date helpers
├── data/           profile, links, milestones, newsletter config
└── styles/         tokens, base, motion, prose
```

## Workflow and deploys

`main` is protected: every change goes through a pull request.

1. Branch from `main`, e.g. `feat/project-timeline` or `content/new-post`.
2. Open a PR titled as a conventional commit: `type(scope): summary`, e.g. `content(writing): add post about moving`.
3. CI type-checks and builds; the PR is labelled automatically (`type:` from the title, `area:` from the changed files). Cloudflare comments with a preview URL.
4. Squash-merge. The PR title becomes the commit on `main`, and Cloudflare Pages deploys it to production.

Coding conventions, content rules and the full PR guide are in [`AGENTS.md`](AGENTS.md) (also read by AI coding agents via `CLAUDE.md`).

