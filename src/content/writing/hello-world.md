---
title: "A sample post — delete me"
date: 2026-08-20
cover: "./hello-world.jpg"
coverAlt: "Placeholder cover art"
draft: false
---

This file exists so the Writing grid has something to render. Delete it once you
add a real post.

## Adding a post

Drop a `.md` file into `src/content/writing/`. The frontmatter needs a `title`
and a `date`; `cover`, `coverAlt`, and `draft` are optional.

Put the cover image **next to the markdown file**, not in `public/` — that is
what lets Astro optimise it. A post with no cover still works; its card falls
back to a tinted block.

Set `draft: true` to keep a post out of the grid while you work on it. If every
post is a draft, the whole Writing section disappears rather than leaving an
empty heading behind.
