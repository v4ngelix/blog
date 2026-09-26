# Proposal

## Why

Drafts are kept out of `posts.json`, but the deploy workflow uploads the whole
`posts/` folder, so every draft's `text.md` and media are still reachable by
direct URL. Posts have now been split into `posts/done/` and `posts/drafts/`,
which the build does not understand yet: it only reads `posts/` itself and
would build no posts at all.

## What Changes

- **BREAKING** A post's folder decides whether it is published: posts in
  `posts/done/` are published, posts in `posts/drafts/` are drafts. The
  `finished` date no longer affects publishing and stays display metadata only.
- The default build publishes only `posts/done/`; `--drafts` also publishes
  `posts/drafts/`. Drafts are still read (and validated) on every build, so
  the skipped-drafts count and the `tags` format check keep working.
- The deploy workflow no longer uploads `posts/drafts/`, so draft files are not
  reachable on the live site. This replaces the previous non-goal that accepted
  uploaded draft files.
- Post media URLs include the folder (`posts/done/<post>/…`); post slugs are
  unchanged because they still come from the post's own folder name.
- Anything placed directly in `posts/` (outside `done/` and `drafts/`) is
  ignored.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `post-drafts`: a post is a draft by its folder rather than its `finished`
  date, and drafts are no longer uploaded to the live site.

## Impact

- `scripts/build-posts.js`: read posts from `posts/done/` and
  `posts/drafts/`; filter on folder instead of the `finished` date.
- `.github/workflows/main.yml`: exclude `posts/drafts/` from the upload.
- Existing posts: already moved into the new folders; no front matter changes.
- No change to `index.js`, `index.html` or dependencies.
