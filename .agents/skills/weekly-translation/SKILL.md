---
name: weekly-translation
description: Translate or update this weekly repository's Chinese and Cantonese blog posts into English in src/pages/en/posts. Use for a requested English version or synchronization of a changed Chinese post. Does not apply to UI copy, repository documentation, or unrelated posts.
---

# Weekly Translation (Chinese → English)

Preserve the author's casual weekly-journal voice, humor, and technical curiosity.
Repository paths below are relative to the project root. Follow
[AGENTS.md](../../../AGENTS.md) for execution and validation and
[README.md](../../../README.md#content-model) for routing and metadata behavior.

## Select the Source and Destination

- Read the requested Chinese file in `src/pages/posts/` and any existing English
  version in `src/pages/en/posts/`. For an update, inspect the relevant diff when
  available and preserve valid existing translation outside the changed passage.
- Match by numeric issue ID, not translated title: `01-...` and `1-...` represent
  the same issue. Before writing, check that each language has at most one source
  file for that issue. If duplicates exist, inspect their content and history;
  resolve only when the intended file is clear, otherwise ask before discarding work.
- Update an existing English file in place. Do not create a second file or rename
  an established slug merely to improve the title wording.
- For a new translation, preserve the source's numeric prefix exactly and choose
  a concise lowercase, hyphen-separated English slug that conveys its title.
  Titles are derived from filenames, so the slug also affects the displayed title.
- Translate only the requested issue(s). A source edit may need an English update;
  do not automatically translate the archive or override an explicit Chinese-only
  request. For inline translation requests, return text instead of creating files
  unless a repository edit is requested or clearly implied.

## Preserve Meaning and Structure

- Keep first-person perspective, level of certainty, section order, headings,
  lists, quotes, emphasis, captions, and meaningful emoji/punctuation. Translate
  existing sections; do not impose a fixed set of headings or add commentary.
- Use natural conversational English. Retain the author's understatement and
  self-deprecation without adding jokes, claims, or stronger opinions.
- Interpret Cantonese by context. For example, `說說主義` can be “all talk and no
  action,” `鍾意坐坐` can mean enjoying sitting around or relaxing at cafés, and
  `菲林` means photographic film. These are contextual choices, not fixed mappings.
- Preserve code blocks, inline code, link destinations, image/video URLs, query
  strings, fragments (especially Live Photo `#live`), and functional HTML
  attributes. Translate visible captions, Markdown image alt text, and descriptive
  HTML `alt`/`title` text; preserve markup and non-prose attribute values.
- Do not silently repair or localize link destinations. Report a broken link
  separately unless fixing links is part of the task.

## Frontmatter and Publication Dates

- Preserve frontmatter structure, keys, and non-language values. Translate existing
  human-readable descriptions; do not add redundant `title`, `layout`, or locale
  fields, since this repository derives those during rendering.
- Copy an explicit source date exactly; never use the translation date as the
  publication date. Preferred format for new explicit dates is `YYYY/MM/DD`.
- If the source has no date, inspect its resolved date in a production build and
  use that value for the English post so the dates match. Do not infer a new date
  from today's date or the new English file's creation time. If the source date
  cannot be established, ask rather than fabricate one; do not rewrite the
  Chinese source just to add metadata unless the task includes that change.

## Verify and Deliver

- Compare source and output for omitted paragraphs, media, links, and code; confirm
  the numeric issue is unique in each language and publication dates agree.
- Format only the edited Markdown and run the content checks from `AGENTS.md`,
  including `docker compose exec -T weekly npm run build`. For multiple requested
  translations, validate together after the edits rather than rebuilding each file.
- Inspect the generated English numeric page for its title, date, and translated
  content. Use `/posts/<id>/` and `/en/posts/<id>/` with the unpadded numeric ID.
- Report the English file(s), validation results, and any unresolved source
  ambiguity. Routine translation does not need a new process-ledger entry unless
  it changes requirements or behavior beyond article content.
