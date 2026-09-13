# Process: Requirements and Outcomes

Last updated: 2026-09-13

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

### R-20260913-01 Collaboration documentation and translation skill maintenance

- Status: done
- Goal: 优化 AGENTS.md、仓库翻译 Skill 和 process.md，修正文档之间及文档与实现之间的不一致。
- Acceptance Criteria:
  - 执行规则、运行说明、需求记录与翻译约定各有明确入口，历史记录按需加载且不丢失。
  - 文档区分流程文档、文章内容和运行行为的验证要求；待办状态不会触发未请求的工作。
  - 翻译按期号更新已有英文文件，保留发布日期、媒体链接和作者语气，并覆盖缺少日期及已有重复期号的处理。
  - README 的 Docker 端口、开发域名及生产预览命令与仓库配置一致，PR 模板与验证规则一致。
- Outcome: 明确 AGENTS、README、需求记录和翻译技能的职责；将原有 21 条历史和 16 条已完成需求完整移入 `process-archive.md`，后续按需加载。按文件用途区分文档、文章和运行行为的验证；翻译技能补齐按期号更新、防重号、日期处理及媒体保留规则。README 已按现有配置修正宿主机端口为 4322、开发域名为 `weekly.apartment.internal`，并提供使用 4323 端口的独立生产预览容器；同步 PR 模板。
- Validation:
  - Docker Prettier 检查本次全部 6 个 Markdown 文件通过；`git diff --check` 通过。
  - `quick_validate.py .agents/skills/weekly-translation` 通过；校验器缺少的 PyYAML 仅装入临时目录，没有修改项目依赖。
  - 归档内容对比通过；20 个本地文档链接及锚点有效；49 对中英文文章期号唯一、发布日期一致。
  - `docker compose exec -T weekly npm run astro -- check`：0 errors / 0 warnings / 0 hints。
  - `docker compose exec -T weekly npm run build`：198 pages；Pagefind 98 pages / 2 languages / 9040 words。虽然新规则允许纯文档修改免构建，本次仍按任务开始时的要求完成构建。
  - 实际运行 README 的 `docker compose run --rm --no-deps -p 4323:4321 weekly npm run preview -- --host 0.0.0.0 --port 4321`；浏览器打开中英文首页及第 49 期文章，文本和语言切换可用，4 条页面路由及 Pagefind JS 返回 200。开发服务对两个当前允许的 Host 返回 200，对旧的 apartment Host 返回 403。
- Follow-ups:
  - 全局 `~/.agents/skills/blog-translator/SKILL.md` 仍有重复触发范围；仓库明确以 `weekly-translation` 为准，全局副本未在本次仓库修改中变更。
  - 内置浏览器的远程图片未加载，抽查同一头图 URL 的独立 HTTP 请求返回 200；不能据此判定图片服务故障，本次未完成远程媒体的视觉验收。
