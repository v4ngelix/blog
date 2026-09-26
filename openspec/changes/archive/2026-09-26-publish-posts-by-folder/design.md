# Design

## Context

`scripts/build-posts.js` reads `posts/` one level deep, builds every post and
filters on `isFinished` unless `--drafts` is given. Media links are rewritten to
`posts/<post>/…`. The deploy workflow runs `npm run build` and `rsync --delete`s
`index.html index.js styles.css posts.json posts` to the server.

## Goals / Non-Goals

**Goals:**
- Keep the existing `readPost` logic; only change where posts are read from and
  how drafts are recognised.

**Non-Goals:**
- Detecting the same post name in both folders.
- Changing the `--drafts` flag, the post page or the tag filter.

## Decisions

1. **Read both folders on every build, filter by folder.** Each post gets its
   source folder attached; drafts are dropped unless `--drafts` is set.
   Alternative: read `posts/drafts/` only with `--drafts`. Rejected because the
   skipped-drafts count and the `tags` format check (which covers drafts) would
   stop working.
2. **`readPost` takes the folder name** (`done` or `drafts`) so the media URL
   becomes `posts/<folder>/<post>`. The slug still comes from the post's own
   name, so links stay stable when a post moves from drafts to done.
3. **Drop `isFinished` and its use of `parseDate`.** `parseDate` stays for
   sorting by `started`.
4. **Exclude drafts in rsync** with `--exclude=/posts/drafts/`, plus
   `--delete-excluded` so a `posts/drafts/` that ever reaches the server is
   removed. Alternative: upload `posts/done` alone with `--relative`. Rejected
   as less readable for the same result.
5. **A missing folder is treated as empty**, so a repo with no drafts (or no
   published posts yet) still builds.

## Risks / Trade-offs

- [Media URLs of published posts change to `posts/done/…`] → Only one post is
  live; its old URLs are removed by `rsync --delete` and the new ones are
  uploaded in the same deploy.
- [A post with the same name in both folders gives two posts with one slug
  under `--drafts`] → Accepted; only affects local preview.

## Migration Plan

Posts are already moved into `posts/done/` and `posts/drafts/`. Deploy is a
normal push to `main`; rollback is reverting the commit.
