---
name: blog-translator
description: Translate Chinese (including Cantonese expressions) blog markdown articles into English while preserving the author's voice, tone, and frontmatter structure. Use this skill whenever the user asks to translate a blog post, mentions creating an English version of an article, or adds/updates a markdown file in src/pages/posts/ that needs a corresponding English version in src/pages/en/posts. Always use this skill for any blog article translation task, even if the user just says "translate this" or "帮我翻译这篇文章" without naming the skill explicitly.
---

# Blog Translator (Chinese → English)

This skill translates the author's Chinese blog articles (which frequently feature Cantonese expressions, casual tech musings, and personal life reflections) into natural, engaging English, preserving the author's authentic voice and technical curiosity.

## Author Persona & Tone Guidelines

1. **Register**: Casual, conversational, authentic, tech-enthusiast personal weekly notes (not corporate or academic).
2. **Voice & Attitude**:
   - Curious and pragmatic about new tools/software.
   - Lighthearted and self-deprecating (e.g., admitting to "talk is cheap / 说说主义", getting scammed by fake SD cards, getting bitten by Mount Emei monkeys).
   - Conversational pacing: preserve lively punctuation nuance (`~`, `LOL`, exclamation marks) naturally in English.
3. **Handling Cantonese & Colloquialisms**:
   - Translate for *cultural sentiment and meaning*, not literal words.
   - Capture the humor, wit, or irony behind Cantonese sayings without sounding stiff or overly formal.

## Article Structure Conventions

Most articles follow this standard layout:
1. **Header Image & Caption**: `<img ... />` followed by `<small>Caption...</small>` (often a travel photo, street snap, food, or funny encounter).
2. **Section Modules**:
   - `## Interesting Tools` 
   - `## Learning` 
   - `## Reading`
   - `## Life`

## Glossary & Expression Mapping

| Chinese / Cantonese | English Equivalent | Context / Notes |
|---|---|---|
| 辦鬼辦馬 | Dressing up in wild costumes / Halloween cosplay | Extravagant dressing up (Post 19) |
| 唔客气啦 | Digging in / Not holding back | Casual dining phrase (Post 44) |
| 鍾意坐坐 | Love sitting around / chilling at cafes | Leisurely vibe (Post 38) |
| 幾百蚊一臺，唔算貴，又唔算便 | A few hundred bucks each—neither cheap nor pricey | Balanced street shopping comment (Post 44) |
| 冬大過年 | Winter Solstice is bigger than New Year | Traditional Cantonese idiom (Post 26) |
| 說說主義 | All talk and no action / Talk is cheap | Self-deprecating proactivity joke (Post 01) |
| 試水 / try try | Give it a spin / Take it for a test drive | Trying a new tool or method |
| 亮瞎大家的👁 | Blind everyone's eyes / Super dazzling | HDR emoji effect (Post 38) |
| 菠萝油 | Pineapple Bun with Butter (Bolo Yau) | Traditional HK/Canton cafe food |
| 菲林 | Film (photography) | Traditional Cantonese usage for camera film |
| 說說 / 碎碎念 | Thoughts / Quick Notes / Wrap-up | Bottom section heading |

## Frontmatter Handling Rules

- Keep frontmatter minimal as in the source files:
  ```markdown
  ---
  date: YYYY/MM/DD
  ---
  ```
- Do not introduce redundant frontmatter fields unless the source file explicitly has them.
- Post title and ID are derived directly from the English filename.

## Output Rules

- **Input path**: `src/pages/posts/<NN>-<chinese-title>.md` (e.g. `src/pages/posts/19-辦鬼辦馬.md`)
- **Output path**: `src/pages/en/posts/<NN>-<english-slug>.md` (e.g. `src/pages/en/posts/19-dressing-up.md`)
- **Filename convention**:
  - Keep the numeric prefix `NN-` identical to keep ordering in sync.
  - Convert the title part into a concise, lowercase, hyphen-separated slug (2–4 words) capturing the essence of the post title.
- **Code & Media**:
  - Keep all `<img src="..." ... />`, URLs, and code blocks intact.

## Workflow

1. Read the source file from `src/pages/posts/`.
2. Propose/determine the concise English slug for `<NN>-<english-slug>.md`.
3. Translate headings, captions, and body text ensuring author's casual voice and natural English expressions.
4. Output to `src/pages/en/posts/<NN>-<english-slug>.md`.
5. Run build validation (`docker compose exec weekly npm run build`).

## Reference Examples

**Example 1 (Humorous Caption & Cantonese tone)**
- *Original*: `<small>拍於 24 年 05 的峨眉山，🐒太兇，不要招惹，有個小朋友手指被咬破了喲~~~</small>`
- *Translation*: `<small>Taken at Mount Emei in May '24. The monkeys are pretty wild—definitely don't mess with them! A kid even got his finger bitten open 🐒~~~</small>`
- *Why it works*: Maintains the light warning and playful tone with emoji/tilde without being overly stiff.

**Example 2 (Tech Musings & Slang)**
- *Original*: `之前一直想開發一個 web 來記錄自己的生活，一直有想法沒行動，典型的說說主義。`
- *Translation*: `I've always wanted to build a site to document my life, but it was all talk and no action—a classic case of talk is cheap.`
- *Why it works*: Translates the sentiment of "说说主义" naturally into conversational English.
