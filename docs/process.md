# Process: History + Requirements

Last updated: 2026-09-03

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

| ID            | Date       | Feature                                                                    | Status | Notes                                                                                                                                                                                                         |
| ------------- | ---------- | -------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H-20260903-01 | 2026-09-03 | Remove the publication-date link from article details                      | done   | Kept the publication date and Pagefind date-sort metadata while rendering it as plain text on both Chinese and English article pages.                                                                         |
| H-20260902-01 | 2026-09-02 | Polish article navigation, metadata, and ambient rain                      | done   | Refined sidebar alignment/focus, corrected previous/next destinations, grouped the publication date with reading stats, and added theme-aware rain; rejected water experiments were removed.                  |
| H-20260901-01 | 2026-09-01 | Harden development search and article image accessibility                  | done   | Expanded Pagefind rebuild inputs, made config-reload recovery reliable, isolated its asset namespace, handled asset failures, and restored semantic and keyboard navigation paths.                            |
| H-20260831-04 | 2026-08-31 | Restore canonical post titles, title search, and effective image lazy-load | done   | Restored localized titles across all numeric routes and search metadata, indexed titles as searchable content, emitted lazy image attributes during rendering, and scoped Astro lock bypassing to Docker.     |
| H-20260831-03 | 2026-08-31 | Remove upgrade leftovers and consolidate duplicated site logic             | done   | Removed dead CSS, files and packages; shared homepage, logo and RSS implementations; reduced homepage JavaScript; fixed locale-aware post navigation and Docker dev restarts.                                 |
| H-20260831-02 | 2026-08-31 | Allow the apartment OrbStack development hostname                          | done   | Corrected the misspelled Astro `allowedHosts` entry so `apartment.weekly.orb.local` can access the development server.                                                                                        |
| H-20260831-01 | 2026-08-31 | Fix homepage width and search initialization regressions                   | done   | Restored mobile and centered desktop card layouts, made Pagefind initialization reliable, and enabled search in Docker development.                                                                           |
| H-20260830-03 | 2026-08-30 | Finalize sitemap, social metadata, and local Heti delivery                 | done   | Removed ineffective sitemap hints and synthetic timestamps, corrected article/share metadata, and bundled Heti from the locked npm dependency instead of a CDN.                                               |
| H-20260830-02 | 2026-08-30 | Fix Docker isolation, article styling, metadata, and script reliability    | done   | Isolated container dependencies, restored image/intro styling, fixed sitemap and social metadata, bundled Lozad locally, and localized Giscus.                                                                |
| H-20260830-01 | 2026-08-30 | Fix upgrade review findings for routes, search, images, mobile UI, and CI  | done   | Canonicalized numeric article routes, removed alias pages from Pagefind, scoped image behavior to article content, removed mobile overflow, and added Astro check to CI.                                      |
| H-20260829-01 | 2026-08-29 | Upgrade runtime to Node.js 24, Astro 7, and Tailwind CSS 4                 | done   | Updated Docker, CI, package engines, Astro integrations, Markdown processing, and UI compatibility; clean Docker check/build plus production preview smoke tests passed.                                      |
| H-20260825-01 | 2026-08-25 | Add rounded corners to article images and lightbox preview (8px)           | done   | Added 8px border-radius to .heti img, img[loading='lazy'], #lightbox-img, .lightbox-video, and .live-inline-video                                                                                             |
| H-20260819-01 | 2026-08-19 | Full English archive translation (1-49 issues)                             | done   | Translated all 49 issues into English (`src/pages/en/posts/`), updated English home cards, English RSS feed, and full-text dual-language search index                                                         |
| H-20260515-01 | 2026-05-15 | Image lightbox + Live Photo experience (R-20260514-02)                     | done   | Replaced intense.js with native `<dialog>` lightbox, added `#live` badge/playback flow, playback/error recovery and delegated events, preserved `.mov` query params, and tuned backdrop to lighter glass blur |
| H-20260817-01 | 2026-08-17 | Bilingual routing and English skeleton (R-20260817-01)                     | done   | Added `/en/` and `/en/posts/:id`, localized shared UI and metadata, and linked every Chinese post to its English placeholder.                                                                                 |
| H-20260514-02 | 2026-05-14 | Fix「第NaN期」on Vercel (trailing slash in `extractFilename`)              | done   | `src/util.ts`: strip trailing slash before `pop()`                                                                                                                                                            |
| H-20260514-01 | 2026-05-14 | Documentation system refresh (`README.md`, `AGENTS.md`, `docs/process.md`) | done   | Added Docker-first workflow and requirement ledger                                                                                                                                                            |
| H-20260202-01 | 2026-02-02 | Full-text search with Pagefind in production build                         | done   | Validated in build/preview                                                                                                                                                                                    |
| H-20260101-01 | unknown    | Post reading UX improvements                                               | done   | Reading progress bar, word count, reading-time estimate                                                                                                                                                       |
| H-20250101-01 | unknown    | Weekly post routing and ordering model                                     | done   | `NN-title.md` -> `/posts/:id`, numeric sorting                                                                                                                                                                |

Status values: `proposed` | `in_progress` | `done` | `blocked` | `dropped`

---

## 3) New Requirements (Write Here)

Add each new request as one item below.

### R-20260903-01 Enhancement

- Status: done
- Priority: P2
- Owner: ai
- Goal: 移除文章详情页发布日期的超链接。
- Acceptance Criteria:
  - 中英文文章详情页的发布日期显示为普通文字，不再可点击跳转至 GitHub 源文件。
  - 保留发布日期内容及 Pagefind 日期排序元数据。
- Outcome: 共享文章布局已将发布日期由 GitHub 编辑链接改为普通文字，并保留 `data-pagefind-sort="date"`，因此中英文文章及搜索日期排序行为不受影响。

### R-20260902-01 Enhancement

- Status: done
- Priority: P2
- Owner: ai
- Goal: 优化文章导航和元信息布局，并为站点增加克制的背景细雨氛围。
- Acceptance Criteria:
  - 中英文文章侧栏的 1–9 期编号在编号列内右对齐。
  - 桌面精确指针设备上，侧栏闲置时柔化非当前文章并保持当前文章清晰；鼠标或键盘进入列表后全部恢复清晰。
  - “下一篇”指向期号更大的新一期，“上一篇”指向期号更小的旧一期；首尾文章只显示存在的方向。
  - 发布日期与字数、阅读时长显示在文章标题下方的同一统计行；窄屏空间不足时可以自然换行，文章底部不再重复显示日期。
  - 中英文首页及文章页显示主题感知的背景细雨，且不拦截内容交互。
  - 触屏、小屏及减少动态效果偏好下保持完整可读性并隐藏背景雨效。
- Outcome: 侧栏链接拆分为右对齐的固定编号列、连字符列与标题列；桌面端列表闲置时以 38% 不透明度和 1.4px 模糊柔化非当前链接，交互时恢复清晰；修正倒序文章集合中的前后篇索引，使 Next 指向新一期、Previous 指向旧一期，并补充首尾和无匹配文章的边界保护；发布日期从页底移到标题下方，与字数和阅读时长组成可换行的同一统计行；新增共享 `AmbientRain` 组件，为中英文首页和文章页提供主题感知的背景细雨，并在交互时减弱。水滴与水汽方案经视觉评估后已完整撤回。Docker Prettier、Astro check（0 errors / 0 warnings / 0 hints）、生产构建（198 pages）、Pagefind（98 pages / 2 languages / 9040 words）及中英文生产预览均通过。

### R-20260901-01 Bugfix

- Status: done
- Priority: P2
- Owner: ai
- Goal: 修复复审发现的开发搜索索引刷新范围、Pagefind 静态资源异常处理、首页语义结构和文章图片键盘访问问题。
- Acceptance Criteria:
  - 会影响文章索引的 Astro、Markdown、JavaScript、TypeScript 与 Astro 配置变更会自动重建开发 Pagefind 索引。
  - Pagefind 文件在重建期间消失或读取失败时，开发服务器返回受控错误而不会因未处理的文件流异常退出。
  - `/pagefind/` 下的缺失和目录穿越请求由该中间件受控处理，不会落入 Vite 的其他静态文件服务。
  - 中英文首页在存在文章时使用唯一的 `<main>` 主内容 landmark。
  - 普通文章图片及图片链接可通过键盘打开 Lightbox，并保留原有鼠标与 Live Photo 行为。
- Outcome: 开发 Pagefind 现在监听 `src` 下影响索引的 Astro、Markdown、JavaScript 与 TypeScript 文件；Astro 配置热重载后，新服务会按配置和索引时间戳修复陈旧索引，并避免旧服务关闭造成的失败误报。资源中间件使用原始 URL 隔离 `/pagefind/` 命名空间，目录穿越返回 403、缺失资源返回 404，读取流异常也会受控处理。中英文首页恢复唯一 `<main>`，文章图片与图片链接支持 Enter/Space、焦点样式和本地化辅助标签。Docker Prettier、Astro check（0 errors / 0 warnings / 0 hints）、生产构建（198 pages）、Pagefind（98 pages / 2 languages / 9040 words）、198 个 HTML/784 项路由断言/100 个 sitemap URL、98 项中英文搜索及开发/预览冒烟均通过。

### R-20260831-04 Bugfix

- Status: done
- Priority: P1
- Owner: ai
- Goal: 修复清理复审发现的数字文章标题丢失、文章标题无法搜索、运行时 lazy-load 过晚，以及宿主机开发命令被迫忽略 Astro 锁的问题。
- Acceptance Criteria:
  - 49 篇中英文数字规范路由的页面标题、SEO 与 Pagefind 标题均包含期号和本地化文章名。
  - 使用中英文文章名可以搜索到对应的数字规范路由。
  - 第三张及之后的文章图片在生成 HTML 时已经包含 `loading="lazy"` 与 `decoding="async"`。
  - `--ignore-lock` 只用于 Docker Compose，宿主机 `npm run dev` 保留 Astro 标准锁行为。
- Outcome: 文章 layout 现按语言和期号解析源文件标题，并将标题作为独立 `data-pagefind-body` 纳入搜索；删除两个数字路由中不会传递给 Markdown layout 的伪 frontmatter。98 个中英文规范页面标题与侧栏标题全部一致，Pagefind 可分别通过“钟意坐坐”“stunning sunset”“starting from scratch”返回正确数字路由。文章图片的 lazy/async 属性改在服务端渲染阶段写入。Docker Compose 单独传入 `--ignore-lock`，宿主机脚本恢复标准 `astro dev`。Docker `astro check`（0 errors / 0 warnings / 0 hints）、生产构建（198 pages）和 Pagefind（98 pages / 2 languages / 9040 words）通过。

### R-20260831-03 Maintenance

- Status: done
- Priority: P2
- Owner: ai
- Goal: 清理 Node.js 24 / Astro 7 升级后遗留的无用依赖、死代码和重复实现，在保持现有功能的同时缩减客户端代码与维护面。
- Acceptance Criteria:
  - 删除未使用的依赖、评论样式文件和不会命中的全局/组件 CSS。
  - 中英文首页、RSS、站点 Logo 和文章编号工具复用同一份实现。
  - 首页不加载仅文章页使用的 Heti、Lightbox 与 Live Photo 客户端代码。
  - 搜索弹窗不再依赖额外动画库，卡片图片使用浏览器原生加载策略。
  - 中英文文章前后导航都使用对应语言的数字规范路由。
  - Docker 开发容器重启后不受宿主机残留 Astro PID 锁影响。
  - Docker `astro check`、生产构建、生产预览路由及中英文 Pagefind 查询通过。
- Outcome: 删除 `motion`、`lozad`、`@types/lozad`、`rehype`、`rehype-parse`、`unist-util-visit` 及其传递包，共减少 13 个安装包；删除两份未引用评论 CSS，并清理全局和组件死样式。新增共享 Home layout、SiteLogo 和 RSS builder，统一文章编号/标题解析。搜索入口脚本由约 12 KB 降至 2.8 KB，首页不再加载约 12 KB 的文章增强脚本，主 CSS 由约 59 KB 降至 54 KB；首页仅首张图片使用高优先级，其余原生 lazy-load。修复文章前后导航语言串线，以及 Astro 7 开发锁在 Docker PID 重用时终止容器的问题。Docker `astro check`（0 errors / 0 warnings / 0 hints）、生产构建（198 pages）、Pagefind（98 pages / 2 languages）和开发/生产冒烟测试均通过。

### R-20260831-02 Bugfix

- Status: done
- Priority: P1
- Owner: ai
- Goal: 允许通过 `apartment.weekly.orb.local` 访问 Astro 开发服务器。
- Acceptance Criteria:
  - 使用 `Host: apartment.weekly.orb.local` 请求开发服务器时不再返回 `Blocked request`。
  - 保留原有 `weekly.orb.local` 本地域名访问能力。
- Outcome: 修正 `astro.config.mjs` 中误写为 `apartment.weeekly.orb.local` 的 `allowedHosts` 配置，并在 README 中记录两个 OrbStack 本地域名。

### R-20260830-03 Bugfix

- Status: done
- Priority: P2
- Owner: ai
- Goal: 收尾升级复审中的 sitemap 更新时间、社交分享元数据与 Heti CDN 依赖问题。
- Acceptance Criteria:
  - sitemap 不再把每次构建时间伪装成所有页面的更新时间。
  - sitemap 不再输出 Google 忽略的全局 `changefreq` 与 `priority` 提示。
  - 文章使用 `article` Open Graph 类型，站点名称保持稳定；Twitter 卡片包含标题并且不输出无效账号。
  - Heti 增强脚本由锁定的本地 npm 依赖打包，不再依赖运行时 CDN。
- Outcome: 移除 sitemap 的全局 `lastmod`、`changefreq` 与 `priority`；首页和文章分别输出 `website` 与 `article` 类型，`og:site_name` 使用本地化站点名，Twitter 元数据不再输出 `@unknown`。Heti 0.9.6 已锁定并从 ES 模块入口打包，同时确保自动排版在 DOM 就绪时执行。Docker `astro check`（0 errors / 0 warnings / 0 hints）与生产构建（198 pages、Pagefind 100 pages）通过；构建产物已确认无 Heti CDN URL、包含本地 Heti 代码，并输出预期 sitemap 与社交标签。

### R-20260831-01 Bugfix

- Status: done
- Priority: P1
- Owner: ai
- Goal: 修复 Astro 7 升级后首页手机端卡片被重复内边距压窄、桌面布局无法居中，以及 Pagefind UI 在开发和生产环境无法可靠使用的问题。
- Acceptance Criteria:
  - 手机首页保留 12px 左右 gutter，同时不产生横向滚动。
  - 桌面首页容器居中显示，第一列不被裁切且左右留白均衡。
  - 全局基础样式与组件样式使用正确的 Tailwind cascade layer，不再覆盖响应式工具类。
  - 搜索组件不依赖 `DOMContentLoaded` 或浏览器空闲时机，也能初始化 Pagefind UI。
  - 使用 Escape 关闭搜索后恢复页面滚动。
  - Pagefind 仅索引 98 个规范文章正文，不包含首页、侧栏和页脚内容。
  - Docker 开发服务器在 4321 端口提供 Pagefind 索引和完整搜索界面，不再显示仅生产环境可用的占位信息。
  - Docker 容器重启后可以替换 Astro 遗留的开发进程记录并重新监听 4321 端口。
  - 开发中修改、新增或删除文章 Markdown 后自动刷新 Pagefind 索引。
  - Pagefind UI 仅挂载到当前搜索组件的容器，避免全局选择器冲突。
- Outcome: 中英文首页使用 12px 手机 gutter 与响应式卡片宽度；全局基础样式和组件样式分别移入 Tailwind `base` 与 `components` layer，使 utilities 恢复优先级，桌面网格重新居中。搜索组件在首次打开时可靠且单次初始化，原生 dialog 关闭事件统一清理滚动锁。Pagefind 仅索引规范文章标题与 `#article-content`，排除中英文首页、侧栏和页脚。开发启动前生成索引，Vite 在 `/pagefind/` 提供文件，并在文章 Markdown 改变后自动重建索引及刷新页面；Docker 开发命令忽略跨容器无效的 Astro PID 锁，确保容器重启后恢复监听。

### R-20260830-02 Bugfix

- Status: done
- Priority: P1
- Owner: ai
- Goal: 修复升级复审中发现的 Docker 跨平台依赖污染、文章简介与卡片图片样式回归，以及 sitemap、外部脚本、英文评论和 Open Graph 元数据问题。
- Acceptance Criteria:
  - 默认 Docker Compose 使用独立 `node_modules` 卷，Linux 容器不读取或覆盖宿主机原生依赖。
  - 文章 `<small>` 简介恢复原有排版，首页卡片图片保持 `object-fit: cover`。
  - 页面与 `robots.txt` 指向实际生成的 sitemap index，文章 Open Graph 使用文章头图。
  - Lozad 从本地依赖打包；Heti CDN 加载失败不会阻断图片、Lightbox 与其他页面增强。
  - 英文文章使用英文 Giscus 界面，中文文章继续使用中文界面。
- Outcome: Docker Compose 现使用 `weekly_node_modules` 命名卷；首次 Node.js 24 容器 `npm ci` 后，第二个容器可跳过安装直接通过 `astro check`。文章简介恢复块级负边距，卡片图片恢复 `object-fit: cover`。页面和新增 `robots.txt` 均指向 `/sitemap-index.xml`；Open Graph 使用文章头图。Lozad 已由本地依赖打包，Heti 缺失时安全降级；中英文 Giscus 分别使用 `zh-CN` 与 `en`。Docker `astro check`（0 errors / 0 warnings / 0 hints）、生产构建（198 pages、Pagefind 100 pages）及浏览器回归全部通过。

### R-20260830-01 Bugfix

- Status: done
- Priority: P2
- Owner: ai
- Goal: 修复 Node.js 24 / Astro 7 升级 review 中发现的重复搜索索引、错误语言替代链接、手机文章 Logo 被 Lightbox 拦截、图片 lazy-load 计数偏移、手机首页横向溢出与 CI 缺少类型检查问题。
- Acceptance Criteria:
  - Pagefind 对每篇中英文文章仅返回一个数字规范路由，标题兼容路由不重复参与搜索索引。
  - 所有文章路由的 canonical、hreflang 与语言切换均指向有效的中英文数字路由。
  - 手机文章页 Logo 正常返回首页，Lightbox 与 lazy-load 仅处理正文图片。
  - 390px 视口首页不产生横向滚动，桌面卡片布局保持不变。
  - CI 在构建前执行 `astro check`。
- Outcome: 数字文章路由现为统一 canonical/hreflang 目标；标题兼容路由加入 `noindex` 和 `data-pagefind-ignore`，Pagefind 索引由 198 页降至 100 页且搜索结果不再重复。Lightbox 与 lazy-load 仅处理正文图片，手机 Logo 导航恢复；390px 视口 `scrollWidth` 与 `clientWidth` 均为 375px。CI 已加入 `astro check`。Node.js 24 Docker `npm ci`、`astro check`（0 errors / 0 warnings / 0 hints）、生产构建（198 pages）与浏览器回归全部通过。

### R-20260829-01 Maintenance

- Status: done
- Priority: P1
- Owner: ai
- Goal: 将项目运行时升级至 Node.js 24，并将 Astro 5 升级至 Astro 7；同步迁移已弃用的 Tailwind Astro 集成，保持现有中英文内容、搜索、RSS、Lightbox 与 Live Photo 行为。
- Acceptance Criteria:
  - Docker、本地开发约定、CI 与 Vercel 可明确使用 Node.js 24。
  - Astro 7 与相关官方依赖安装成功，生产构建无错误。
  - Tailwind 样式通过官方 Vite 插件生成，现有响应式断点与 class-based dark mode 保持可用。
  - 现有 Markdown 元数据注入逻辑继续工作；中英文首页、文章页、RSS 与 Pagefind 可用。
  - 生产预览完成首页与至少一个中英文文章路由的冒烟检查。
- Outcome: Docker、CI、Vercel `engines` 与 `.nvmrc` 已统一至 Node.js 24；升级至 Astro 7.2.9、Tailwind CSS 4.3.3 与 Vite 8.2.2，并迁移至 Tailwind Vite 插件。保留自定义 Markdown 元数据注入，修复搜索脚本、响应式卡片图片、英文文章标题与图片 alt 兼容问题。Docker `astro check`（0 errors / 0 warnings / 0 hints）和生产构建（198 pages）通过；生产预览已验证中英文首页、文章、搜索与 Lightbox。

### R-20260825-01 Feature

- Status: done
- Priority: P2
- Owner: ai
- Goal: 为文章详情图片、延迟加载占位、点击放大（Lightbox 图片/视频）以及 Live Photo 内联播放视频添加统一的 8px 精致圆角。
- Acceptance Criteria:
  - 文章详情内图片 (`.heti img` 与 `img[loading='lazy']`) 具有 8px 圆角。
  - 点击放大后展示的图片 (`#lightbox-img`)、Lightbox 播放视频 (`.lightbox-video`) 及内联 Live Photo 播放视频 (`.live-inline-video`) 统一保持 8px 圆角。
- Outcome: 更新 `src/styles/heti.min.css` 和 `src/styles/index.css`，将所有文章图片及 Lightbox 预览与视频播放的 `border-radius` 统一设置为 8px。Docker build 验证通过。

### R-20260817-01 Feature

- Status: done
- Priority: P1
- Owner: ai
- Goal: 建立中英文独立页面的第一阶段骨架；保留中文站现有 URL，提供英文首页、英文文章占位页和双向语言切换。
- Acceptance Criteria:
  - 中文首页 `/` 与英文首页 `/en/` 均可访问，并显示各自语言的页面元信息和站点文案。
  - `/posts/:id` 可切换至 `/en/posts/:id`；英文占位页可返回同一期中文文章。
  - 现有中文文章路由与 RSS 保持可用。
- Outcome: 新增 49 个静态英文文章占位页与空的英文 RSS；英文稿未上线前统一提示即将推出。Header、文章页和侧栏均提供语言切换；页面加入 canonical 和中英文 `hreflang` 互链。Docker build 与生产预览冒烟检查通过。

### R-20260514-01 bug fix

- Status: done
- Priority: P1
- Owner: ai
- Goal: 在文章內容詳情顯示 第NaN期，本地 deploy 是沒出現問題，vercel 卻顯示第NaN期.
- Acceptance Criteria: Vercel 部署後文章頁面應正確顯示「第N期」，不出現 NaN。
- Outcome: Vercel 預設對所有路由加 trailing slash（如 `/posts/49/`），導致 `extractFilename` 在 `split('/').pop()` 時拿到空字串，`parseInt("")` = NaN。修復：在 `src/util.ts` 的 `extractFilename` 中先 strip trailing slash 再解析。Build 驗證通過（99 頁，exit 0）。

### R-20260514-02 Feature

- Status: done
- Priority: P1
- Owner: ai
- Goal:
  - 點擊圖片放大，支援居中顯示大圖
  - Live Photo 圖片（URL 含 `#live`）自動顯示可點擊的 LIVE badge
  - 點擊 badge → 原地播放對應 `.mov` 一次，再點停止；badge 播放時變黃
  - 放大 dialog 內同樣有 LIVE 按鈕，行為與 badge 一致（播放時變黃，播完恢復靜圖）
- Acceptance Criteria: 點圖 → dialog 大圖；點 badge → 原地播一次；dialog LIVE 按鈕與 badge 視覺行為一致
- Outcome: 移除 intense.js，改用原生 `<dialog showModal()>`。Live Photo 以 `#live` URL hash 標記，JS 自動注入可點擊 badge 和 inline video。所有 lightbox CSS 放在全局 `src/styles/index.css` 以規避 Astro scoped-style 對 `::backdrop` 的限制。後續優化：保留 `.mov` URL query 參數、`play().catch` 回復 UI、`mode` 化播放函數、`#write`/`dialogContent` 事件委託、非 live 圖片清理 `dataset.liveUrl`。另將 backdrop 改為更透明的玻璃模糊效果。Build 驗證通過。
