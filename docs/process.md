# Process: Requirements and Outcomes

Last updated: 2026-10-30

## Document Responsibilities

- [AGENTS.md](../AGENTS.md): execution rules and validation requirements.
- [README.md](../README.md): current setup, commands, and content model.
- This file: scoped requirements, acceptance criteria, outcomes, and follow-ups.
- [process-archive.md](process-archive.md): completed history, loaded only when
  relevant. Historical implementation details and test counts may be superseded.
- [weekly-translation](../.agents/skills/weekly-translation/SKILL.md): repository
  translation conventions.

## Maintaining the Ledger

1. Track changes to requirements, site behavior, or collaboration workflow here.
   Routine copy edits, translations, and formatting need no new entry unless they
   change one of those contracts.
2. Select only work covered by the current user request. `proposed` means recorded,
   not automatically scheduled or authorized. Update an existing related item
   rather than creating a duplicate for each follow-up.
3. Write a concrete goal and observable acceptance criteria before implementation;
   move the selected item to `in_progress`. Record reasonable assumptions. Ask for
   clarification only when missing information materially blocks correct work.
4. Validate according to `AGENTS.md`. Record actual commands, results, and limits;
   do not copy an earlier task's verification claims.
5. Mark `done` only when acceptance criteria and required checks pass. For `blocked`,
   record the blocker and the next action needed. Use `dropped` for cancelled work.
6. Keep active items and the latest completed task here. Move older completed or
   dropped items to the archive when adding a new task, preserving their IDs and
   outcomes. Do not duplicate new entries in a separate history table.

Use IDs `R-YYYYMMDD-NN` and exact dates `YYYY-MM-DD`; use `unknown` for unknown
historical dates. Status values: `proposed`, `in_progress`, `done`, `blocked`,
`dropped`. Record priority only when useful (`P1` high, `P2` normal, `P3` low).

Entry shape:

```markdown
### R-YYYYMMDD-NN Short title

- Status: proposed
- Goal: The requested outcome.
- Acceptance Criteria:
  - An observable result.
- Outcome: Implementation summary, or pending.
- Validation: Actual commands and results, or not run yet.
- Follow-ups: Concrete outstanding work, or none.
```

## Current Work

### R-20261029-01 Mobile homepage layout

- Status: in_progress
- Goal: 在 `feat/mobile-homepage` 分支优化中英文手机首页的导航、卡片和阅读层级。
- Acceptance Criteria:
  - 320–430px 手机宽度下导航、标题、日期不挤压，无横向溢出。
  - 首页 Logo 保持完整比例，不受链接内边距压缩；手机文章标题独占一行区域，英文长标题自然换行，导航按钮不挤占标题宽度。
  - 手机卡片统一左右边距，图片保持比例，摘要两行且文字不被固定高度裁切。
  - 保留桌面网格和数字文章链接，明暗主题及中英文均可使用。
  - Docker Prettier、Astro check、生产构建通过；验证两种语言首页与数字文章页的手机及桌面生产预览。
- Outcome: 已创建 `feat/mobile-homepage`；手机首页统一 16px 边距，导航缩小站点标题并扩大语言切换触控区域，限制 Logo 加载失败时的占位；卡片改为 16:9 图片、14px 圆角、独立日期行及自然高度的两行摘要。改动复用于中英文首页，桌面保留原有网格。
- Validation:
  - 2026-10-30 跟进：提高首页 Logo 链接尺寸规则的优先级，清除原有内边距并使用 `object-fit: contain`；手机文章页改为上方导航、下方全宽标题，保留原有标题文本及 Pagefind 元数据。
  - 本次生产预览覆盖中英文首页与第 49 期文章的 320、375、430、1440px；手机 Logo 实测 32×32px、内边距 0，文章标题与容器等宽，无页面横向溢出。检查明暗主题，语言切换和返回首页链接可用。远程媒体仍未加载，保留媒体视觉验收限制。
  - `docker compose exec -T weekly npm run astro -- check`：0 errors / 0 warnings / 0 hints。
  - `docker compose exec -T weekly npm run build`：198 pages；Pagefind 98 pages / 2 languages / 9040 words。
  - 独立 Docker 生产预览检查了中英文首页及 `/posts/49/`、`/en/posts/49/` 的手机与桌面布局；首页覆盖 320、375、430 和 1440px，窄屏未见横向溢出，桌面保留四列，49 个卡片链接均指向对应语言的数字路由。检查手机明暗主题。
  - 远程图片在内置浏览器中未加载，图片占位比例已确认，实际照片裁切视觉验收未完成。文章页原有的远程图片问题仍存在。
  - Prettier 检查全部 6 个改动文件通过；`git diff --check` 通过。
- Follow-ups: 在可加载远程媒体的浏览器中确认照片裁切与 Logo 显示后完成视觉验收；当前保留 `in_progress`，未提交或推送。
