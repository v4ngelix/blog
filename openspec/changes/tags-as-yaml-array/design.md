# Design

## Context

`scripts/build-posts.js` has its own line-based front-matter parser. For keys
in `LIST_KEYS` (only `tags`), `parseValue` splits on commas. Brackets are not
recognised, so `[TIL]` is kept as a literal tag. See proposal.md for why.

## Goals / Non-Goals

**Goals:**
- Parse `tags: [a, b]` into `["a", "b"]`.
- Reject a non-bracketed tags value loudly.

**Non-Goals:**
- Full YAML support (block lists like `- TIL`, nested values, escapes).
- Commas inside a tag name.

## Decisions

1. **Keep the hand-written parser and don't add a YAML library.** Stripping
   `[` `]` and optional quotes is a few lines. A YAML dependency would
   change how every other key is parsed (for example, dates like `18.09.2026`
   and empty `finished:`), which is out of scope.
2. **A non-bracketed value fails the build (throw), not a warning or silent
   ignore.** The user chose arrays only, and a warning would publish broken
   or missing tags without anyone noticing. Throwing before
   `writeFileSync` leaves `posts.json` untouched. The error names the post
   file, so `parseFrontMatter` needs the file path (or the caller wraps the
   error with it).
3. **Strip one pair of matching quotes per entry.** The IDE or YAML habits
   may produce `["TIL"]`. Supporting it is cheap and avoids `"TIL"` showing
   up as a tag.
4. **An empty value (`tags:`) means no tags, not an error.** This matches how
   `finished:` is left empty in drafts.

## Risks / Trade-offs

- [A draft with a malformed tag breaks the production build too] → This is
  intended: the error is immediate and names the file.
- [A tag containing a comma can't be expressed] → No existing tag needs one.
  Revisit if one does.
