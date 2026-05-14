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
| H-20260514-02 | 2026-05-14 | Fix "第NaN期" on Vercel (trailing slash in `extractFilename`) | done | `src/util.ts`: strip trailing slash before `pop()` |
| H-20260514-01 | 2026-05-14 | Documentation system refresh (`README.md`, `AGENTS.md`, `docs/process.md`) | done | Added Docker-first workflow and requirement ledger |
| H-20260202-01 | 2026-02-02 | Full-text search with Pagefind in production build | done | Validated in build/preview |
| H-20260101-01 | unknown | Post reading UX improvements | done | Reading progress bar, word count, reading-time estimate |
| H-20250101-01 | unknown | Weekly post routing and ordering model | done | `NN-title.md` -> `/posts/:id`, numeric sorting |

Status values: `proposed` | `in_progress` | `done` | `blocked` | `dropped`

---

## 3) New Requirements (Write Here)

Add each new request as one item below.

### R-20260514-01 bug fix 
- Status: done
- Priority: P1
- Owner: ai
- Goal: 在文章內容詳情顯示 第NaN期，本地 deploy 是沒出現問題，vercel 卻顯示第NaN期.
- Acceptance Criteria: Vercel 部署後文章頁面應正確顯示「第N期」，不出現 NaN。
- Outcome: Vercel 預設對所有路由加 trailing slash（如 `/posts/49/`），導致 `extractFilename` 在 `split('/').pop()` 時拿到空字串，`parseInt("")` = NaN。修復：在 `src/util.ts` 的 `extractFilename` 中先 strip trailing slash 再解析。Build 驗證通過（99 頁，exit 0）。