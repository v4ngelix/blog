# Tasks

There is no test suite in this project, so every task is verified by running
`npm run build`, inspecting `posts.json`, or serving the site and looking at the
page.

## 1. Build: exclude drafts

- [x] 1.1 In `scripts/build-posts.js`, add an `isFinished(post)` check that reuses `parseDate` on `post.meta.finished`, and filter posts on it in `buildPosts()`; verify with `npm run build` that `posts.json` contains only "Running an LLM locally in two commands"
- [x] 1.2 Confirm an empty `finished:` and a malformed value (e.g. `finished: soon`) both count as drafts; verify by temporarily editing a draft's front matter, rebuilding and checking it stays out of `posts.json`, then reverting
- [x] 1.3 Report the skipped drafts in the build's console line (e.g. `Wrote 1 posts to … (3 drafts skipped)`); verify by reading the `npm run build` output

## 2. Build: `--drafts` option

- [x] 2.1 Read `--drafts` from `process.argv` and skip the finished filter when present; verify `npm run build -- --drafts` writes all four posts to `posts.json` and plain `npm run build` writes one
- [x] 2.2 Confirm `.github/workflows/main.yml` runs `npm run build` without `--drafts`; verify by reading the workflow

## 3. End-to-end verification

- [x] 3.1 Serve the site after a plain build and confirm only the finished post is listed, the `Fishing` tag (drafts only) is absent, and a draft's `?post=<slug>` URL shows the existing "Not found" page
- [x] 3.2 Rebuild with `--drafts`, serve the site, and confirm the drafts are listed and open normally; finish with a plain `npm run build` so the local `posts.json` matches what deploys
