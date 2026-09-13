# AGENTS.md

Repository instructions for AI work. Keep this file focused on execution;
[README.md](README.md) documents setup and architecture, and
[docs/process.md](docs/process.md) tracks requirements and outcomes.

## Start and Scope

1. Read this file, `README.md`, and `docs/process.md`; run `git status --short`.
2. Work on the user's current request. A `proposed` ledger item is context, not
   authorization to implement unrelated backlog items.
3. Preserve existing user changes. Read relevant source before editing; historical
   records may describe superseded behavior. Load `docs/process-archive.md` only
   when the task needs it.
4. Use the repository's
   [weekly-translation skill](.agents/skills/weekly-translation/SKILL.md) for Chinese
   post translation or English-version synchronization. It owns this repository's
   translation conventions, including when a personal translation skill overlaps.
   Do not translate unrelated posts as a side effect of maintenance.

## Development and Validation

Use Docker for project commands. For development, run `docker compose up -d`, then
`docker compose exec -T weekly <command>`. Documentation-only work can use an
existing container or `docker compose run --rm --no-deps weekly <command>` without
starting the dev server. If that dependency volume is empty, initialize it with
`docker compose run --rm --no-deps weekly npm ci` first. Use host npm only when
Docker is unavailable, with Node.js 24 and `npm ci`; report the fallback reason.

Choose checks by the files' purpose, not just their extension:

| Change                                                  | Required validation                                                                                                                                                    |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository docs or skill instructions only              | Prettier on changed Markdown; check links, commands, and consistency with source. Validate changed skill frontmatter and referenced resources. No site build required. |
| Blog content or translation (`src/pages/**/posts/*.md`) | Prettier on edited files and production build; check issue pairing, dates, links, and media.                                                                           |
| UI, configuration, dependencies, or runtime behavior    | Prettier on supported edited files, Astro check, production build, and relevant production preview smoke checks.                                                       |

```bash
docker compose exec -T weekly npm exec --no -- prettier --check <changed-files>
docker compose exec -T weekly npm run astro -- check
docker compose exec -T weekly npm run build
```

For production preview, follow the isolated preview command in
[README.md](README.md#production-preview); the development container already owns
its port. Check one home page and one numeric post route in each affected language.
For shared UI, check both languages and mobile/desktop layouts. Search changes
also need an actual Chinese and English query in production preview, with results
pointing to numeric canonical routes; HTTP 200 alone does not verify search.
For development search changes, also check automatic index refresh in dev.

`npm run build` includes Pagefind through `postbuild`. Avoid overlapping builds
against the same `dist/`, including rebuilds triggered by the dev watcher. Wait
for the automatic rebuild to finish before running explicit validation.
Report failed, blocked, or skipped checks accurately; CI still runs Astro check
and build for every pull request.

## Editing and Git

- Format only touched files with the installed Prettier; avoid unrelated churn.
- New components use `PascalCase.astro`; preserve existing names unless renaming
  is part of the task.
- Posts use `src/pages/posts/{NN}-{title}.md`; English posts use
  `src/pages/en/posts/{NN}-{english-slug}.md`. Keep one file per numeric issue in
  each language. Prefer explicit `date: YYYY/MM/DD` and preserve publication dates.
- Keep numeric canonical routes, bilingual navigation, RSS, and Pagefind in mind
  when changing shared post behavior; see the content model in `README.md`.
- If creating a branch, use `feat/*`, `fix/*`, or `docs/*`. Use Conventional Commits
  when committing. Do not commit or push unless requested.
- Never commit `dist/`, `.astro/`, dependencies, or secrets.

## Completion

Update `docs/process.md` in the same task when requirements, site behavior, or
collaboration workflow change. Follow its ledger rules; routine copy edits and
translations do not need a new requirement unless they change those contracts.

Report changed files, the resulting behavior, validation commands and results,
and concrete risks or remaining work. Do not mark a requirement `done` while its
acceptance criteria or required validation remain unmet.
