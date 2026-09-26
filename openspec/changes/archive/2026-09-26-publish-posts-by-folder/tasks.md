# Tasks

There is no test suite in this project, so every task is verified by running
the build, inspecting `posts.json`, reading the workflow, or serving the site.

## 1. Build: publish by folder

- [x] 1.1 In `scripts/build-posts.js`, read posts from `posts/done/` and `posts/drafts/` (a missing folder counts as empty), passing the folder to `readPost` so media URLs become `posts/<folder>/<post>`; verify `npm run build -- --drafts` writes all four posts and each `html` image `src` points at an existing file
- [x] 1.2 Replace the `isFinished` filter with a folder check and remove `isFinished`; verify plain `npm run build` writes only "Running an LLM locally in two commands" and prints `(3 drafts skipped)`
- [x] 1.3 Confirm the `finished` date no longer matters; verify by temporarily removing `finished` from the done post and adding one to a draft, rebuilding, checking `posts.json` is unchanged in membership, then reverting
- [x] 1.4 Confirm files directly in `posts/` are ignored; verify by temporarily adding `posts/stray.md`, rebuilding with and without `--drafts`, checking it is absent, then deleting it
- [x] 1.5 Confirm a malformed `tags` value in a draft still fails the plain build; verify by temporarily editing a draft, running `npm run build`, then reverting

## 2. Deploy: stop uploading drafts

- [x] 2.1 In `.github/workflows/main.yml`, add `--exclude=/posts/drafts/ --delete-excluded` to the rsync command; verify locally with `rsync -azn --delete --exclude=/posts/drafts/ --delete-excluded --itemize-changes index.html index.js styles.css posts.json posts <scratch dir>/` that `posts/done/…` is listed and nothing under `posts/drafts/` is

## 3. Spec and end-to-end check

- [x] 3.1 Update the Purpose of `openspec/specs/post-drafts/spec.md` to describe folder-based drafts instead of the finished date; verify by reading the file
- [x] 3.2 Serve the site after a plain build and confirm the published post lists, opens and shows its GIF; rebuild with `--drafts` and confirm drafts open with their images; finish with a plain `npm run build`
