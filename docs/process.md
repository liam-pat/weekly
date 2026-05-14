# Process: History + Requirements

Last updated: 2026-05-14

## 1) AI Execution Rules

When a requirement status is `proposed`, AI should:

1. Move it to `in_progress`.
2. Implement the change.
3. Validate (Docker-first):
   - `docker compose up -d`
   - `docker compose exec weekly npm run build`
   - add preview checks if UI/search changed
4. Update this file:
   - set status to `done` (or `blocked`)
   - add short outcome note
5. Report changed files + verification result.
6. If requirements or behavior changed but this file was not updated, mark the task as incomplete.

If requirement is ambiguous, AI should add a short clarification note under that requirement before coding.

## 2) History (Recent Features)

Rules:

- Use exact dates: `YYYY-MM-DD`.
- If exact date is unknown, use `unknown`.
- In History dates, do not use placeholders like `XX`.

| ID | Date | Feature | Status | Notes |
|---|---|---|---|---|
| H-20260514-01 | 2026-05-14 | Documentation system refresh (`README.md`, `AGENTS.md`, `docs/process.md`) | done | Added Docker-first workflow and requirement ledger |
| H-20260202-01 | 2026-02-02 | Full-text search with Pagefind in production build | done | Validated in build/preview |
| H-20260101-01 | unknown | Post reading UX improvements | done | Reading progress bar, word count, reading-time estimate |
| H-20250101-01 | unknown | Weekly post routing and ordering model | done | `NN-title.md` -> `/posts/:id`, numeric sorting |

Status values: `proposed` | `in_progress` | `done` | `blocked` | `dropped`

---

## 3) New Requirements (Write Here)

Add each new request as one item below.

### R-YYYYMMDD-XX <Title>
- Status: proposed
- Priority: P0 | P1 | P2 | P3
- Owner: ai | human | shared
- Goal:
- Scope (files/modules):
- Acceptance Criteria:
- Constraints (optional):
- Notes (optional):
- Outcome (required when done/blocked):

Example:

### R-20260514-02 Improve RSS metadata quality
- Status: proposed
- Priority: P1
- Owner: ai
- Goal: Ensure every RSS item has stable title/description/date.
- Scope (files/modules): `src/pages/rss.xml.js`, `src/config.ts`
- Acceptance Criteria:
  - `docker compose exec weekly npm run build` passes
  - `/rss.xml` renders valid item fields for latest 12 posts
- Outcome (required when done/blocked):

---
