# Tasks

## 1. Parser

- [x] 1.1 In `scripts/build-posts.js`, change list-key parsing so a bracketed value `[a, b]` is split into trimmed entries, with one pair of matching quotes stripped and empty entries dropped. An empty value or `[]` gives an empty list. Verify by running `npm run build:dev` and checking that `posts.json` shows `"tags": ["TIL"]` (no brackets) for the bracketed posts.
- [x] 1.2 Throw an error when a non-empty list-key value is not bracketed. The message must name the post file and show `tags: [TIL, AI]` as the expected format. Verify by temporarily setting a post to `tags: TIL, AI`: `npm run build` must exit non-zero with that message and leave `posts.json` unchanged. Then revert the post.

## 2. Content migration

- [x] 2.1 Change `posts/Running an LLM locally in two commands/text.md` from `tags: TIL` to `tags: [TIL]`. Verify with `grep -n "^tags:" posts/*/text.md`: every line must use brackets.

## 3. Manual verification

- [x] 3.1 Run `npm run build` and `npm run build:dev`. Both must succeed. Open the site and check that the tags show without brackets, that filtering by `TIL` lists the tagged posts, and that the post page shows tags as `TIL`.
- [x] 3.2 Temporarily set a tag to `["Home Lab"]` and to `[]`, rebuild, and check that the result is `Home Lab` for the first and no tag row for the second. Then revert.
