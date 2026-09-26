# Proposal

## Why

Posts in progress sit in `posts/` alongside finished ones, and every post the
build finds ends up on the page. Writing in the repo therefore means publishing
half-written drafts on the next deploy.

## What Changes

- The build SHALL treat a post as finished only when its front matter carries a
  `finished` value that is a valid `D.M.YYYY` date. Posts with a missing, empty
  or malformed `finished` value are drafts.
- Drafts are left out of `posts.json`, so they appear neither in the post list,
  nor as a post page, nor as a source of tags in the tag filter.
- A `--drafts` build flag (`npm run build -- --drafts`) includes drafts, for
  previewing them locally. The deploy workflow runs the plain build and so
  never publishes drafts.
- Non-goal: draft files are still uploaded with the rest of `posts/` by the
  deploy workflow. They are reachable by direct file URL but linked from
  nowhere; this is accepted.

## Capabilities

### New Capabilities

- `post-drafts`: which posts count as finished, excluding drafts from the
  built site, and opting drafts back in for local preview.

### Modified Capabilities

None. `post-tags` requirements are unchanged; its "every post" wording now
simply ranges over the published posts.

## Impact

- `scripts/build-posts.js`: filter posts on `finished`, read a `--drafts` flag.
- Existing posts: three of the four current posts lack a valid `finished` date
  and will disappear from the page until one is added.
- No change to `index.js`, `index.html`, the deploy workflow or dependencies.
