# Process: Requirements and Outcomes

Last updated: 2026-11-06

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

### R-20261104-01 Paragraph sharing

- Status: in_progress
- Goal: 在 `feat/paragraph-share` 分支为中英文文章添加选中文字后复制段落链接的交互。
- Acceptance Criteria:
  - 正文同一段落内选中非空白文字后出现浮动按钮，包括双击选中的短词，适配明暗主题及桌面/手机边界；跨段、评论和导航不触发。
  - 正文文字选区使用紫底白字，分享链接定位的整段使用淡紫色高亮。
  - 复制当前语言的数字规范路由及段落定位信息，显示成功或失败反馈。
  - 自动剪贴板接口不可用或被拒绝时尝试兼容复制；两种方式均失败时显示已选中的链接，允许手动复制，不显示虚假的成功反馈。
  - 新页面打开链接后校验指定段落是否包含文字、定位并高亮整段；指定段落不匹配时仅回退到唯一匹配段落，支持页面内 hash 变化。文章编辑后段落序号变化且新位置包含相同文字的误定位风险按下述约定保留。
  - 取消选区、滚动或 Esc 关闭按钮，支持键盘操作；原有正文、搜索、图片预览与中英文导航可用。
  - Docker Prettier、Astro check、生产构建通过，并检查中英文首页和文章页的桌面/手机生产预览与实际复制链接流程。
- Outcome: 已在 `feat/paragraph-share` 独立实现 `ParagraphShare.astro`，共享文章布局接入，中英文提示复用配置；无新增项目依赖。链接使用当前站点的数字规范路由和 `#p=段落序号&q=文字`，高亮整段，图片/字体加载时最多跟随布局 8 秒，用户主动操作立即停止位置校正。支持键盘 Tab 聚焦、选区保存、复制反馈及同页 hash 切换。
- Validation:
  - `docker compose exec -T weekly npm run astro -- check`：32 files，0 errors / 0 warnings / 0 hints。
  - `docker compose exec -T weekly npm exec --no -- prettier --check src/components/ParagraphShare.astro src/layouts/post.astro src/config.ts docs/process.md`：通过；`git diff --check` 通过。
  - `docker compose exec -T weekly npm run build`：通过，198 pages；Pagefind 98 pages / 2 languages / 9040 words。
  - 容器临时目录安装 jsdom，使用临时脚本 `/tmp/weekly-paragraph-share-test.cjs` 执行 40 项断言：中文/英文选区、规范链接、重新打开后定位、键盘聚焦与 Esc、滚动关闭、跨段/标题排除、复制失败、重复文字、失效/畸形链接、换行匹配、hash 切换和手机按钮边界均通过。布局及剪贴板 API 使用模拟，不能替代真实浏览器验收；未改变项目依赖。
  - 独立生产预览运行于 `http://localhost:4323`；通过该地址检查 `/`、`/en/`、`/posts/49/`、`/en/posts/49/` 均为 HTTP 200，分享组件仅出现在文章页。
  - 浏览器预览服务报 `The browser access host is unavailable`，原生 Chrome 控制报 `cgWindowNotFound`；真实桌面/手机、明暗主题视觉与系统剪贴板端到端验证未完成，因此保留 `in_progress`。
  - 2026-11-04 错误跟进：开发服务曾返回 HTTP 500 / `Could not import ../components/ParagraphShare.astro`，确认组件在容器内存在且可读；`docker compose restart weekly` 后恢复，无需修改组件源码。重启期间自动生产构建及 Pagefind 通过；重新检查开发服务中英文首页/文章页 HTTP 200，组件脚本和样式正常返回，4323 生产预览四个路由亦为 HTTP 200。与开发服务热更新状态异常一致，具体触发原因尚未确定。
  - 2026-11-04 复制失败跟进：在 `http://weekly.orb.local/posts/49/` 实际复现旧版失败提示。组件新增 `execCommand("copy")` 兼容路径和原生手动复制对话框；中文/英文均保留规范链接。自动接口不存在、拒绝请求、兼容复制返回 false/抛异常等路径的临时 jsdom 回归脚本 `/tmp/weekly-copy-regression.cjs` 共 88 项断言通过；无新增项目依赖。
  - 修复后的 Docker Astro check：0 errors / 0 warnings / 1 hint，提示兼容路径的 `execCommand` 已弃用；生产构建通过（198 pages，Pagefind 98 pages / 2 languages / 9040 words）。
  - 内置浏览器恢复连接后，已验证 HTTP 本地域名和生产预览的复制成功提示；生产预览中英文按钮、中文段落链接定位高亮、375px 手机英文浅色/中文深色布局可用且无横向溢出。浏览器自动化的虚拟剪贴板未接收到系统复制内容，无法据此验证系统粘贴；手动复制对话框目前通过模拟测试，实际浏览器失败路径及实体触屏操作仍待验证。
  - 中断后发现 OrbStack 停止，已启动并恢复开发容器；确认不存在预览容器后，将失效的 `.astro/preview.json` 移到 `/tmp/weekly-stale-preview.json`，恢复 4323 独立预览。开发模式曾出现旧依赖 URL 与 WebSocket 错误，最终验证使用独立生产预览。
  - 2026-11-05 简化与复查：合并自动/兼容复制为 `copyLink`，删除随后必定清除或替换的选区保存/恢复逻辑；统一关闭按钮时取消显示计时器，避免重复字符转换。复制开始立即收起按钮，复制未结束或手动对话框打开时不重新显示。临时回归脚本在旧版本复现了等待复制期间关闭按钮后被 `pointerup` 再次唤出的问题，新版本通过。
  - 本轮 Docker Prettier、`git diff --check`、Astro check（0 errors / 0 warnings / 1 个兼容复制弃用 hint）和生产构建通过；Pagefind 98 pages / 2 languages / 9040 words。临时脚本 `/tmp/weekly-copy-regression.cjs` 的 88 项复制路径断言和 `/tmp/weekly-share-review.cjs` 的 43 项键盘、关闭计时、异步复制、手动对话框、链接匹配及 Unicode 断言均通过；未新增项目依赖。
  - 本轮 4323 生产预览的中英文首页、第 49 期数字文章路由及本地脚本均返回 HTTP 200，组件范围与规范路径正确。浏览器工具再次报 `The browser access host is unavailable`，原生 Chrome 报 `cgWindowNotFound`，无法重做本轮桌面/手机视觉与系统剪贴板验收。检查后开发脚本出现 `504 Outdated Optimize Dep`，重启开发容器后复查 4322/4323 上述四个路由及所有 HTML 引用的本地脚本均为 HTTP 200。
  - 2026-11-05 配色调整：正文 `::selection` 改为紫色 `#7c3aed` 背景与白字，对比度约 5.7:1；分享链接定位高亮改为同色 16% 透明背景。Docker Prettier、Astro check（0 errors / 0 warnings / 既有 1 hint）、生产构建通过；4323 中英文首页和第 49 期文章返回 HTTP 200，文章加载的生产 CSS 包含新选区样式。浏览器工具仍不可用，本轮明暗主题、桌面/手机视觉确认未完成。
  - 2026-11-05 双击/整行选择修复：真实浏览器复现双击「能見度」被四字符门槛过滤，以及选择 `router: dae` 整行时选区包含列表项后的换行、被误判跨段。取消最少字符数限制并同步短文字链接校验；仅当段落外部分为空白时裁去尾部边界，真正跨到下一项文字仍不触发。
  - 本轮 Docker Prettier、`git diff --check`、Astro check（0 errors / 0 warnings / 既有 1 hint）及生产构建通过。临时脚本 `/tmp/weekly-doubleclick-regression.cjs` 63 项断言与原复制路径 88 项断言通过，覆盖短词、空白、短词链接、歧义保护及列表换行边界。生产预览中确认双击 `dae` 和选中 `router: dae` 整行可显示按钮，英文整行复制显示成功反馈；1280px/375px 中英文首页及文章页无横向溢出，手机宽度按钮在视口内。实体触屏与系统粘贴限制仍保留。
  - 本轮收尾：4323 四个路由及本地脚本检查通过；4322 页面和文章脚本正常，但 Astro 开发工具栏入口仍返回 `504 Outdated Optimize Dep`，两次重启后未恢复。功能验收使用 4323 生产预览，开发工具栏缓存问题待独立排查。
  - 2026-11-06 提交前复查：重新审阅全部四个改动文件，63 项选区/链接回归与 88 项复制路径回归通过；Astro check 为 0 errors / 0 warnings / 既有 1 hint，生产构建通过（198 pages；Pagefind 98 pages / 2 languages / 9040 words）。浏览器工具仍报 `The browser access host is unavailable`，本轮未重做真实浏览器视觉和系统粘贴；沿用 2026-11-05 相同源码的桌面/手机生产预览结果。
- Accepted trade-off (2026-11-06): 用户确认暂不增加段落指纹，也不缩短链接；引用文字最多保留 160 个 Unicode 码点。旧文章增删段落后，如果原序号的新段落恰好包含相同引用文字，旧链接可能定位到该段落；这是当前序号加文字校验方案的已接受限制。
  - 最终 Prettier 与 `git diff --check` 通过；4323 生产预览的中英文首页、第 49 期文章及引用的本地脚本均为 HTTP 200，组件范围和规范路径正确。容器使用 `host.docker.internal` 访问预览被主机名校验拒绝（403），改用允许的 `localhost` 地址后通过。
- Follow-ups: 用户已授权提交 PR；在实际访问地址确认系统粘贴、失败时手动复制和实体触屏体验后标记完成。PR 不代表这些人工验收已完成。

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
