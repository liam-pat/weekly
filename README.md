# weekly

Bilingual static weekly blog built with Astro 7, Tailwind CSS 4, Pagefind search,
and Giscus comments.

## Quick Start

Requirements: Docker Compose (default), or Node.js 24 for the host fallback.

```bash
docker compose up -d
```

Open `http://localhost:4322` (host port 4322 maps to container port 4321).
`http://weekly.orb.local` is configured through the OrbStack label.
`weekly.apartment.internal` is also allowed by Astro, but requires your local
DNS/proxy to resolve and forward it; an allowed-host entry does not create DNS.
See [docker-compose.yml](docker-compose.yml) and
[astro.config.mjs](astro.config.mjs) for the current configuration.

Container dependencies are isolated in the `weekly_node_modules` volume. Startup
runs `npm install`, then `predev` builds the production Pagefind index before
starting Astro. Changes to index-affecting Astro, Markdown, JavaScript, TypeScript,
or Astro configuration files rebuild the index and reload the page. Wait for
startup or index rebuilds to finish before checking search or running another build.

### Host Fallback

Only if Docker is unavailable, use Node.js 24 (see `.nvmrc`):

```bash
npm ci
npm run dev
```

The host development server defaults to `http://localhost:4321`. Container
`node_modules` are separate from host dependencies. The Docker-only `--ignore-lock`
option is already set in Compose; host development keeps Astro's normal lock.

## Validation

```bash
docker compose exec -T weekly npm run astro -- check
docker compose exec -T weekly npm run build
docker compose exec -T weekly npm exec --no -- prettier --check <changed-files>
```

`npm run build` produces `dist/` and runs Pagefind via `postbuild`.
[AGENTS.md](AGENTS.md#development-and-validation) defines which checks apply to
documentation, blog content, and runtime changes. CI uses Node.js 24 with
`npm ci`, Astro check, and build on every pull request and push to `main`.

### Production Preview

After a successful build, start a separate preview container in a terminal:

```bash
docker compose run --rm --no-deps -p 4323:4321 weekly npm run preview -- --host 0.0.0.0 --port 4321
```

Open `http://localhost:4323`. This uses the built `dist/` and the existing dependency
volume without competing with the development server's port. Stop it with Ctrl-C.
Finish source edits and rebuilds before previewing, since both containers share
`dist/`.

Smoke-check `/`, `/en/`, `/posts/49/`, and `/en/posts/49/` as appropriate for the
change. For search, run a real query in each affected language and open a result.
See `AGENTS.md` for the full validation scope.

For the host fallback, run `npm run build`, then
`npm run preview -- --host 127.0.0.1 --port 4323`.

## Project Structure

```text
src/
  components/             Shared navigation, search, and article enhancements
  layouts/                Shared home and post layouts
  pages/
    index.astro
    rss.xml.js
    posts/                Chinese Markdown and [id].astro numeric routes
    en/
      index.astro
      rss.xml.js
      posts/              English Markdown and [id].astro numeric routes
  styles/
  config.ts               Site identity, locale copy, and feature settings
  util.ts                 Issue numbers, titles, and sorting
  rss.ts                  Shared RSS builder
astro.config.mjs          Metadata processing and development search indexing
```

## Content Model

- Chinese posts: `src/pages/posts/{NN}-{title}.md`.
- English posts: `src/pages/en/posts/{NN}-{english-slug}.md`.
- Each language has at most one Markdown file per numeric issue. English
  translations match the Chinese issue number and publication date; reuse an
  existing English filename when updating a translation.
- Titles come from filenames, and posts sort by numeric prefix descending.
- Canonical routes: `/posts/:id/` and `/en/posts/:id/`, with an unpadded numeric ID.
  Filename routes remain compatibility pages and are excluded from Pagefind and
  the sitemap. The English numeric route shows a placeholder if a translation is
  missing.
- Homepages, navigation, RSS (`/rss.xml` and `/en/rss.xml`), and language links share
  this numeric model. Pagefind indexes canonical article titles and bodies.

Use the [weekly-translation skill](.agents/skills/weekly-translation/SKILL.md) for
English versions.

### Metadata Behavior

Prefer explicit `date: YYYY/MM/DD` in post frontmatter. In `astro.config.mjs`, the
Markdown plugin assigns the shared post layout and English locale, derives `pic`
from a leading HTML image when absent, and derives `desc` from the introductory
content when it matches the expected structure (which can replace an explicit
`desc`). It supplies site fallbacks for missing picture/description and infers a
missing date from the issue number or filesystem creation time. Preserve known
publication dates rather than relying on that inference.

## Deployment

Vercel uses Node.js 24 from `package.json` engines, `npm run build`, and `dist/`.
Use `npm ci` for a reproducible install from `package-lock.json`. The repository's
`vercel.json` only configures GitHub notifications; dashboard overrides need to be
checked in Vercel when deployment configuration changes.

## Collaboration Docs

- [AGENTS.md](AGENTS.md): execution rules and validation.
- [docs/process.md](docs/process.md): current requirements and outcomes.
- [docs/process-archive.md](docs/process-archive.md): completed history.
- [weekly-translation](.agents/skills/weekly-translation/SKILL.md): translation rules.
