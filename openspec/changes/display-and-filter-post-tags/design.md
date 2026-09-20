# Design

## Context

See proposal.md - Why. The constraints that shape the approach:

- The site is a static page plus a client-side router. `scripts/build-posts.js`
  walks `posts/`, parses front matter, renders markdown, and writes a single
  `posts.json`; `index.js` fetches that file once and renders either the list or
  one post from the URL.
- Front matter is parsed by hand in `parseFrontMatter`: split on `:`, trim, store
  the string. There is no YAML dependency and no type information.
- `renderPost` walks `Object.entries(post.meta)` and prints every key as a
  `<dt>/<dd>` pair, so any front-matter key a post declares already shows up on
  the post page without code changes - including, today, a raw `tags` value.
- `index.js` already intercepts clicks on same-path links, pushes history, and
  re-renders. Anything expressible as an `href` on the current path gets SPA
  navigation and browser history for free.
- Rendering uses `<template>` elements cloned by id. Adding a new kind of node
  means adding a template, not building DOM in JavaScript.

## Goals / Non-Goals

**Goals:**

- Keep the front-matter parser free of per-key special-casing beyond a single
  declarative list of which keys are list-valued.
- Express filter state entirely in the URL, so that history, back/forward, and
  link sharing work without extra state management.
- Express tag toggling as `href` values, so no new event handling is introduced.

**Non-Goals:**

- Introducing a YAML parser. The hand-rolled parser stays; this change adds one
  typed key, not general type support.
- A general query-parameter or routing abstraction. The router stays two
  branches wide.

## Decisions

### Comma-separated values with a list-key allowlist

`tags: TIL, AI` splits on commas into a list. Because a comma is an ordinary
character in a string value, the split cannot be inferred from the value itself
- a future `summary: a, b` must stay one string. So the parser carries a
`LIST_KEYS` set naming which keys are list-valued, and splits only those.

Alternative considered: a JSON-array value (`tags: ["TIL", "AI"]`), detected by a
leading `[`. That needs no allowlist and generalises to any key, but it is
noisier to type and leaks JSON syntax into the front matter. The user chose the
comma form; the allowlist is the cost of that choice and it is one line.

Alternative considered: inferring a list from the presence of a comma. Rejected -
it makes `tags: TIL` and `tags: TIL, AI` different types, and silently turns any
prose value containing a comma into a list.

### Preserve declared casing, normalise only when comparing

A tag is stored and rendered exactly as the post wrote it, because lower-casing
`TIL` to `til` makes an acronym hard to recognise. Casing is normalised only at
the moment two tags are compared: the selected tag and a post's tag are both
lower-cased for the match, and neither is changed for display.

Comparison happens in two places - filtering the list, and deciding whether a
chip is the active one - so both go through a single `sameTag(a, b)` helper
rather than open-coding `toLowerCase()` at each site. That keeps the "compare
normalised, display declared" rule in one place.

Alternative considered: lower-casing once at build time, so stored, displayed
and compared values are identical. That needs no helper and no discipline about
where normalisation happens, but it renders `TIL` as `til`, which was the
deciding factor against it.

Consequence: if two posts spell a tag differently, both chips render, each in
its own casing, and both filter to the same set. The chip text is therefore not
a unique key - the lower-cased form is.

### Filtering is a list-level concern, not a post-level one

The `tag` parameter is read in `render()` alongside the existing `post`
parameter, used as declared with no case change, and the filtered array is
passed into `renderList` along with the active tag. `renderList` needs the
active tag anyway, to decide each chip's
`href` and selected state, so passing it is not extra plumbing.

The two parameters stay independent branches: `?post=` wins and renders a post,
otherwise the list renders, filtered or not. A URL carrying both is not a
meaningful state and needs no handling beyond that precedence.

### Toggling is an href, not a click handler

Each chip's `href` is computed at render time: `?tag=<tag>` for an unselected
tag, carrying the tag as the post declared it, and `./` for the currently
selected one. Activating the selected chip
therefore navigates to the unfiltered list, which is exactly "deselect". The
existing click interceptor turns both into SPA navigation with history entries,
so back/forward across filter changes works with no new code.

Alternative considered: a click handler that toggles state and rewrites the URL.
Rejected - it reimplements what the href plus the existing interceptor already
do, and it would make the chips non-functional as ordinary links.

### Selected state is a class on the chip

The chip carries a modifier class when it is the active tag, styled in
`styles.css`. No separate "filtering by X" header is rendered: with a filter
active every listed post matches, so the selected chip is visible on every row
and doubles as the indicator and the clear control.

### `posts.json` gains an array-valued field

`meta.tags` becomes `string[]`. `renderPost`'s `dt`/`dd` loop sets
`textContent` from the value, which would coerce an array to `TIL,AI` with no
space, so the loop joins array values with `", "` explicitly. This is the only
place that consumes `meta` generically; everything else reads `meta.tags` by
name.

## Risks / Trade-offs

- **`posts.json` changes shape.** It is gitignored and regenerated by the deploy
  workflow (`npm run build` in `.github/workflows/main.yml`), so no stale copy
  ships. A local stale copy during development would leave `meta.tags` a string.
  → Tag handling reads `meta.tags` through `Array.isArray`, so a string yields no
  tags rather than wrong ones; re-run `npm run build` locally after pulling.
- **Comparison and display diverge.** Any future code that groups or counts tags
  must group on the normalised form while displaying a declared one, or a tag
  spelled two ways will appear twice. → `sameTag` is the single comparison
  point; a tag index or counts are a non-goal of this change, and whoever adds
  them inherits this note.
- **A filtered list can be empty** if a URL names a tag no post carries. → The
  list renders empty rather than erroring. No empty-state message is added; with
  tag links being the only way to reach a filter in-app, the state is only
  reachable by hand-editing the URL.
- **Tags repeat down the list.** Every visible post shows the selected chip when
  a filter is active. → Accepted: it is the honest rendering of per-post tags and
  keeps the deselect control near wherever the reader is looking.

## Migration Plan

No data migration or deployment sequencing. `posts.json` is gitignored and
regenerated by `npm run build` in the deploy workflow, so the source changes ship
on their own. Rollback is reverting the commit; no persisted state is affected.
