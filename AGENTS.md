# AGENTS.md

Minimal rules for AI sessions in this repo.

## 1. Session Start

1. Read `README.md`, `AGENTS.md`, `docs/process.md`.
2. Check workspace: `git status`.
3. Use Docker-first workflow:
   - `docker compose up -d`
   - run project commands inside container.

## 2. Local Run and Test (Docker-first)

Docker is the default for both development and validation.

- Start service: `docker compose up -d`
- Build validation: `docker compose exec weekly npm run build`
- Optional checks: `docker compose exec weekly npm run astro -- check`
- Preview check (if UI/search changed):
  - `docker compose exec weekly npm run preview -- --host 0.0.0.0`
  - open one page and one post route for smoke check

Only use host npm commands if Docker is unavailable.

## 3. Change Rules

- Content-only change (`*.md`): run build validation.
- UI/config/behavior change: run build + preview check.
- Search changes: validate in production build/preview, not only dev.

## 4. Conventions

- Formatting: Prettier.
- Components: `PascalCase.astro`.
- Posts: `src/pages/posts/{NN}-{title}.md`.
- Prefer explicit frontmatter date: `YYYY/MM/DD`.

## 5. Git Flow

- Branches: `feat/*`, `fix/*`, `docs/*`.
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, etc.).
- Never commit `dist/`.

## 6. Delivery Format

For each task, report:

1. changed files
2. what changed
3. validation commands + results
4. risks / follow-ups

If requirements or behavior changed, update `docs/process.md` in the same task.
If a task changes requirements or behavior and `docs/process.md` is not updated, treat the task as incomplete.