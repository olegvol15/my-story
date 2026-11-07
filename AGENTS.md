# Agent guide: olehvolostnykh.com

Personal site of Oleh Volostnykh: a hero, milestones, a Writing section (long-form posts) and a Projects section (project pages with a Backlog / In progress / Done board). Built with Astro 7 as a fully static site. **The whole point is that it stays small and fast**, so treat every new dependency, script or request as a cost that has to justify itself.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `astro dev --background` (manage with `astro dev stop` / `status` / `logs`) |
| Type-check | `npm run check` |
| Production build | `npm run build` (output in `dist/`) |
| Preview the build | `npm run preview` |

Node version: see `.nvmrc` (22). `package.json` requires `>=22.12`.

**Before you call any change done, run `npm run check && npm run build`; both must pass with no errors and no warnings you introduced.** CI runs exactly these two.

If the build dies inside `node_modules` (for example `Cannot find module .../astro/dist/...`), the install is corrupt, not the code: run `npm ci`.
If a build still references a deleted content file or image, the content cache is stale: run `npx astro sync --force`.

## Layout

```
src/
  pages/              routes: index, rss.xml.ts, writing/[...slug], projects/[...slug]
  layouts/
    Base.astro        <html>, BaseHead, Particles, <main class="wrap">. Every page uses it.
    Article.astro     detail page shell: back link, title, meta slot, cover, .prose body, "after" slot
  components/
    Hero, Milestones  homepage top
    Card              the card used by both Writing and Projects
    ProjectBoard      the three-column ticket board on project pages (wider than the text column; stacks on mobile)
    Feed              homepage Writing/Projects switch (CSS-only radios + :has(); tiny script syncs #writing/#projects).
                      Hides the switch and shows a plain heading when only one collection has entries.
    Subscribe         Kit newsletter form (see Newsletter below)
    BaseHead          all <head> metadata/SEO/OG: extend it, don't add <meta> elsewhere
  content/
    writing/*.md      posts (images co-located next to the .md)
    projects/*.md     projects (images co-located next to the .md)
  content.config.ts   collection schemas (zod from "astro/zod")
  lib/                posts.ts, projects.ts, excerpt.ts: sorting, formatting, derived data
  data/content.ts     profile, links, milestones, newsletter config
  styles/             tokens.css (design tokens), base.css, motion.css, prose.css, global.css imports them
```

## Content workflows

### New post
Create `src/content/writing/<slug>.md`. The slug is the URL (`/writing/<slug>`).
```yaml
---
title: "..."
description: "..."      # optional; falls back to an excerpt of the body
date: 2026-11-07
cover: "./image.jpg"    # optional, relative to the .md
coverAlt: "..."         # required in practice whenever cover is set
draft: false
---
```

### New project / board ticket
Create `src/content/projects/<slug>.md` (URL `/projects/<slug>`). The body is the project description.
```yaml
---
title: "..."
description: "One line, used for SEO"
status: building        # building | live | paused | archived
started: 2026-01-15
cover: "./shot.png"     # optional; cards fall back to the title in the display font
coverAlt: "..."
stack: [Astro, TypeScript]
links:
  - label: GitHub
    href: https://github.com/...
key: ABC                # optional ticket prefix; defaults to the slug's first 3 letters
tickets:                # the board (Backlog | In progress | Done)
  - title: One sentence about the work
    status: done        # backlog | in-progress | done
    done: 2026-11-07    # required when status is done (the build fails without it)
    href: https://github.com/.../pull/12   # optional PR/issue/release link
  - title: Next thing
    status: backlog
draft: false
---
```
Ticket keys (`ABC-1`, `ABC-2`…) come from the ticket's position in the list, so **only append new tickets at the end and never reorder or delete them**, or every key after it shifts. To move a ticket, change its `status` (and add `done:` when it's finished). Done is shown newest first; Backlog and In progress keep file order.

Projects are sorted on the homepage by their latest `done` date (or `started` when nothing is done).

Rules for content:
- **Never invent content**: dates, changelog entries, metrics, project facts or post text. If something is unknown, leave it empty or ask. Don't publish placeholders.
- Keep the author's voice: plain, direct, first person. Fix typos, but don't rewrite the prose unless asked.
- Use hyphens, not em dashes. The existing copy uses " - ".
- Every image gets meaningful alt text.

## Code conventions

- **Static only.** No SSR adapter, no API routes, no server endpoints besides `rss.xml.ts`.
- **No UI framework integrations** (React/Vue/Svelte/Tailwind). Plain `.astro` components only.
- **Client JS is progressive enhancement only**: a small inline `<script>` in the component that needs it, and the page must still work without it (see the copy-email link in `Hero` and the form in `Subscribe`). No third-party scripts, analytics or embeds without asking first.
- **Don't add runtime dependencies without asking.** Prefer a few lines in `src/lib/`.
- Styles: use scoped `<style>` in the component. Use the tokens in `styles/tokens.css` (`--fg`, `--body`, `--muted`, `--hairline`, `--surface`, `--radius`, `--measure`, `--gutter`, `--ease-out`) instead of raw values; add a token rather than repeating a magic colour. Global CSS is only for base/prose/motion.
- Elements created by scripts or `set:html` are unscoped. Reach them with `:global()` and leave a comment saying why (see `Hero`, `Milestones`).
- Motion: entrances use the `data-reveal` attribute with a `--reveal-delay` style; homepage sections step by 80ms. Anything animated must respect `prefers-reduced-motion` (handled globally in `motion.css`, so don't override it).
- Images: import or reference through the content schema `image()` and render with `astro:assets` `<Image>` with `widths` + `sizes`. Never put content images in `public/`.
- Data shaping (sorting, filtering drafts, date formatting) lives in `src/lib/`. Pages and components call it and never re-implement it. Dates: `formatDate` / `toISODate` from `lib/posts.ts`, and always pair visible dates with `<time datetime>`.
- Accessibility: one `<h1>` per page, sections labelled with `aria-labelledby`, visible focus states, links that open new tabs use `rel="noopener"`.
- TypeScript is `astro/tsconfigs/strict`. Keep `npm run check` at 0 errors, 0 warnings, 0 hints.
- Comments explain *why* (a constraint, a browser quirk), not what the code does.

## CI/CD and deploy

- **CI**: `.github/workflows/ci.yml` (job "Check and build") runs `npm ci`, `npm run check` and `npm run build` on every PR and every push to `main`. `.github/workflows/pr-labels.yml` validates the PR title (job "PR title") and applies labels.
- **CD**: Cloudflare Pages project `my-story`, connected to GitHub `olegvol15/my-story`. It is configured in the Cloudflare dashboard, not in this repo. Build `npm run build`, output `dist`, env `NODE_VERSION=22`. A push to `main` **is a production deploy** to https://olehvolostnykh.com; other branches get preview URLs on `*.my-story-b38.pages.dev`.
- `site` in `astro.config.mjs` (`https://olehvolostnykh.com`) drives canonical URLs, OG URLs and RSS links. Change it only if the domain changes.
- DNS for the domain lives in Cloudflare (registrar is Porkbun, but its DNS panel does nothing). Keep the existing MX records and the single `v=spf1` TXT record: they carry email forwarding. Never add a second SPF record.

## Newsletter

`Subscribe.astro` is a plain HTML form that POSTs to Kit form 9829499 (`newsletter` in `data/content.ts`). This is deliberate: don't swap in Kit's JS embed or add an API route.

## Git and pull requests

All changes reach `main` through a pull request. A repo ruleset on `main` blocks direct pushes and force pushes, and requires the "Check and build" and "PR title" checks to pass. Only squash merges are enabled, and the **PR title becomes the commit on `main`**.

Workflow:
1. Branch off an up-to-date `main`: `git switch main && git pull && git switch -c <type>/<short-slug>`, e.g. `feat/project-timeline`, `content/new-post-moving`, `fix/card-focus-ring`.
2. Commit in small steps (conventional messages; they get squashed anyway).
3. Run `npm run check && npm run build`, then push and open the PR:
   `gh pr create --title "feat(projects): add changelog timeline" --body-file -` filling in `.github/pull_request_template.md`.
4. Report the PR URL. Cloudflare posts a preview URL on the PR; check UI changes there.
5. **Don't merge unless the user asks.** When asked: `gh pr merge --squash --delete-branch`.

PR title format: `type(scope): summary`, lower-case, imperative, no trailing period.

| type | use for | label |
| --- | --- | --- |
| `feat` | new user-visible feature or section | `type: feat` |
| `fix` | bug fix | `type: fix` |
| `content` | new or edited post/project/changelog entry, copy changes | `type: content` |
| `style` | visual-only changes (CSS, animation) | `type: style` |
| `refactor` | code change with no visible effect | `type: refactor` |
| `perf` | page weight / speed | `type: perf` |
| `docs` | AGENTS.md, README, comments | `type: docs` |
| `ci` | GitHub workflows, repo automation | `type: ci` |
| `deps` | dependency bumps | `type: deps` |
| `chore` | anything else (tooling, config) | `type: chore` |

Scopes: `writing`, `projects`, `home`, `newsletter`, `seo`, `design`, `ci`, `agents`.

Labels are automatic: the `type:` label comes from the title, and `area:` labels come from changed paths (`.github/labeler.yml`). When you add a new component or route, add its path to `labeler.yml`. Don't hand-edit labels, except the GitHub defaults (`bug`, `accessibility`, ...), which are fine to add when relevant.

Other rules:
- **Commit, push or open PRs only when asked.** Merging to `main` deploys to production.
- Don't delete or overwrite files with uncommitted changes you didn't make. Ask first.
- Never commit `dist/`, `.astro/`, `node_modules/` or `.env*`.

## Astro docs

Full docs: https://docs.astro.build. Read the relevant guide before working on:
[routing](https://docs.astro.build/en/guides/routing/) ·
[components](https://docs.astro.build/en/basics/astro-components/) ·
[content collections](https://docs.astro.build/en/guides/content-collections/) ·
[styling](https://docs.astro.build/en/guides/styling/) ·
[images](https://docs.astro.build/en/guides/images/)
