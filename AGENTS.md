# Repository Guidelines

## Project Structure & Module Organization

This repo is an Astro site for publishing “weekly” posts.

- `src/pages/` — route entrypoints (e.g. `src/pages/index.astro`, `src/pages/rss.xml.js`).
- `src/pages/posts/*.md` — weekly posts (Markdown content).
- `src/components/` — UI components (`*.astro`).
- `src/layouts/` — shared layouts (notably `src/layouts/post.astro`).
- `src/styles/` — global CSS and theme files.
- Key config: `astro.config.mjs`, `tailwind.config.cjs`, `tsconfig.json`, `prettier.config.js`.
- Build output: `dist/` (do not commit).

## Build, Test, and Development Commands

Uses `npm` (see `package-lock.json`).

- `npm install` — install dependencies.
- `npm run dev` — run local dev server (Astro).
- `npm run build` — build to `dist/` and generate search index via Pagefind (`postbuild`).
- `npm run preview` — serve the production build locally.
- `docker compose up` — optional containerized dev server (see `docker-compose.yml`).

## Coding Style & Naming Conventions

- Formatting: Prettier is the source of truth (`prettier.config.js`).
  - 2-space indentation, 80-char print width, semicolons.
  - Run: `npx prettier -w .` (or `npx prettier . --check` in CI).
- Astro components: `PascalCase.astro` in `src/components/`.
- Posts: `src/pages/posts/NN-Title.md` (numeric prefix + readable title; Unicode is OK).
  - Prefer explicit frontmatter `date: YYYY/MM/DD` for stable ordering across machines.
  - The first `<img>` is used as the post cover when present.
- Imports: use path aliases from `tsconfig.json` (`@/…`, `@layouts/…`) where appropriate.

## Testing Guidelines

There is no dedicated test suite in this repo. Treat the build as the primary validation:

- `npm run build` should succeed with no warnings/errors.
- Optional type/content checks: `npm run astro check` (or `npx astro check`).

## Commit & Pull Request Guidelines

- Commit messages follow a Conventional Commits-style prefix (e.g. `feat: …`, `fix: …`,`doc: …`); keep subjects short and imperative.
- PRs should include: a clear description, linked issue/discussion if applicable, and screenshots for UI/style changes.