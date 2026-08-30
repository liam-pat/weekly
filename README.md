# weekly

Static weekly blog built with Astro.

## Stack

- Astro 7 (SSG)
- Tailwind CSS 4
- Pagefind (search)
- Giscus (comments)

## Quick Start

Requirements: Docker Compose (default workflow), Node.js 24 (fallback).

### Docker-first (recommended)

```bash
docker compose up -d
```

Site URL: `http://localhost:4321`
Local domains (OrbStack): `http://weekly.orb.local` and
`http://apartment.weekly.orb.local`

Container dependencies are isolated in the `weekly_node_modules` Docker volume.
Development startup creates a production Pagefind index and serves it through
Astro dev, so search also works on port 4321. Changes to index-affecting Astro,
Markdown, JavaScript, TypeScript, or Astro configuration files automatically
rebuild the local index and reload the page.

### Host fallback (only if Docker is unavailable)

```bash
npm install
npm run dev
```

## Commands

```bash
docker compose exec weekly npm run build
docker compose exec weekly npm run preview -- --host 0.0.0.0
docker compose exec weekly npm run astro -- check

# host npm env (only if Docker is unavailable)
npm run build
npm run preview
npm run astro -- check
```

## Project Structure

```txt
src/
  components/
  layouts/
  pages/
    index.astro
    rss.xml.js
    posts/*.md
    posts/[id].astro
  styles/
  config.ts
  util.ts
```

## Content Model

- Posts: `src/pages/posts/*.md`
- Filename: `{NN}-{title}.md`
- Route: `/posts/:id`
- Order: numeric prefix descending

## Metadata Behavior

`astro.config.mjs` auto-fills missing post metadata:

- `layout`
- `pic` (first image)
- `desc`
- `date` (inferred)

## Deploy (Vercel)

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Quality Baseline

1. `docker compose exec weekly npm run astro -- check` passes
2. `docker compose exec weekly npm run build` passes
3. one post page renders correctly in preview

## AI Collaboration Docs

- `AGENTS.md` — execution rules
- `docs/process.md` — history + requirements ledger
