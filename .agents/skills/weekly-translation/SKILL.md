---
name: weekly-translation
description: Translate or synchronize this Weekly repository's Chinese and Cantonese posts into English in src/pages/en/posts. Use for requested English versions or updates, not UI copy, repository documentation, or other blog layouts.
---

# Weekly Translation (Chinese → English)

Preserve the author's casual weekly-journal voice, humor, and technical curiosity.

Use the target project identified by the invoking session or the user. All
project paths below are relative to its root. Follow applicable `AGENTS.md`
instructions for commands and verification. This skill is specific to this
repository's content model; do not apply it to an unrelated project.

For text-only requests, return the translation in chat. Read project context
only as needed; do not write files, change repository metadata, run builds,
or restart servers. File placement, metadata synchronization, and build/route
checks below apply only to requested repository edits.

## Select the Source and Destination

- Read the requested Chinese file in `src/pages/posts/` and any existing English
  version in `src/pages/en/posts/`. For an update, inspect the relevant diff when
  available and preserve valid existing translation outside the changed passage.
- Match by numeric issue ID, not translated title: `01-...` and `1-...` represent
  the same issue. Before writing, check that each language has at most one source
  file for that issue. If duplicates exist, inspect their content and history and
  report the conflict. Do not delete, merge, or rename duplicate files unless
  that cleanup is explicitly included in the task, even if the intended source
  seems clear. If the task does not establish how to resolve the source,
  destination, or numeric-route conflict, ask before writing the affected issue;
  continue any independent requested issues.
- Update an existing English file in place. Do not create a second file or rename
  an established slug merely to improve the title wording.
- For a new translation, preserve the source's numeric prefix exactly and choose
  a concise lowercase, hyphen-separated English slug that conveys its title.
  Titles are derived from filenames, so the slug also affects the displayed title.
- Translate only the requested issue(s). A source edit may need an English update;
  do not automatically translate the archive or override an explicit Chinese-only
  request.

## Preserve Meaning and Structure

- Keep first-person perspective, level of certainty, section order, headings,
  lists, quotes, emphasis, captions, and meaningful emoji/punctuation. Translate
  existing sections; do not impose a fixed set of headings or add commentary.
- Use natural conversational English. Retain the author's understatement and
  self-deprecation without adding jokes, claims, or stronger opinions.
- Interpret Cantonese by context. For example, `說說主義` can be “all talk and no
  action,” `鍾意坐坐` can mean enjoying sitting around or relaxing at cafés, and
  `菲林` means photographic film. These are contextual choices, not fixed mappings.
- Preserve code blocks, inline code, markup, and non-prose HTML attributes.
  Translate visible captions, Markdown image alt text, and descriptive HTML
  `alt`/`title` text while preserving functional media tokens.
- Keep external URLs and the target of links to other articles unchanged; do not
  automatically switch them to English. Preserve query strings and media markers
  such as Live Photo `#live`.
- Keep images and videos pointing to the same resources. Check relative links and
  assets at the English file location and generated route; adjust paths only when
  needed to preserve their original targets, not by blindly adding `../`.
- Preserve explicit anchor IDs. When translated headings change generated IDs,
  update links within the translated article that target those headings, using
  the site's actual anchor-generation behavior. Distinguish heading fragments
  from media markers, which must remain unchanged.
- Fix references broken by the translation or relocation. Report pre-existing
  broken links separately unless repairing them is part of the request.

## Frontmatter and Publication Dates

- Preserve frontmatter structure, keys, and non-language values. Translate existing
  human-readable descriptions; do not add redundant `title`, `layout`, or locale
  fields, since this repository derives those during rendering.
- Copy an explicit source date exactly; never use the translation date as the
  publication date. Preferred format for new explicit dates is `YYYY/MM/DD`.
- If the source has no explicit date, inspect the metadata resolver in
  `astro.config.mjs`. Its issue-number calculation provides a deterministic
  date for older issues, while its filesystem creation-time fallback can vary
  across checkouts. Use a confirmed deterministic source date for the English
  frontmatter; do not persist a filesystem fallback as a known publication date.
- If no reliable source date can be established, explain the uncertainty and
  ask before assigning or replacing the English date. Continue independent
  translation work without claiming date validation passed. Do not change the
  Chinese metadata or date resolver unless requested.

## Verify and Deliver

- Compare source and output for omitted paragraphs, media, links, and code; confirm
  the numeric issue is unique in each language and publication dates agree.
- For repository edits, format only edited Markdown and run the content checks
  and build required by `AGENTS.md` in the documented environment. Validate
  multiple requested translations together after editing.
- Inspect the generated English numeric page for its title, date, and translated
  content. Use `/posts/<id>/` and `/en/posts/<id>/` with the unpadded numeric ID.
- Check affected anchors and relative media/link targets in the generated output.
  Report the English file(s), validation results, and any unresolved ambiguity in
  the user's conversational language. If a check is unavailable or fails, state
  the reason and what remains unverified; never report it as passed.
