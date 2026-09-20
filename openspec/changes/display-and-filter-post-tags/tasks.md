# Tasks

There is no test suite in this project, so every task is verified by running
`npm run build`, inspecting `posts.json`, or serving the site and looking at the
page.

## 1. Build: parse tags

- [ ] 1.1 Add a `LIST_KEYS` set naming `tags` in `scripts/build-posts.js`, and in `parseFrontMatter` split a list key's value on commas, trimming each entry and dropping empty ones; verify by temporarily logging the parsed meta during `npm run build` and seeing `tags` come through as an array
- [ ] 1.2 Confirm the parser leaves each tag's capitalisation untouched; verify with a scratch post declaring `tags:  TIL ,, Home Lab ` that the built output is exactly `["TIL", "Home Lab"]`, then delete the scratch post
- [ ] 1.3 Confirm a non-list key whose value contains a comma is still stored as one string, and that a post with no `tags` key builds with no `tags` in its meta; verify by checking `posts.json` after `npm run build`
- [ ] 1.4 Run `npm run build` and commit the regenerated `posts.json`, confirming the existing post's `meta.tags` is `["TIL"]`

## 2. Markup: tag templates

- [ ] 2.1 Add a `<ul class="tags">` to the `post-list-item` template in `index.html`, positioned after the excerpt paragraph; verify the list page still renders unchanged (the list is empty until step 3)
- [ ] 2.2 Add a `tag` template containing a single `<li><a></a></li>`; verify it is present and inert by loading the page and confirming nothing renders from it yet

## 3. List page: render tags

- [ ] 3.1 In `renderList` in `index.js`, clone the tag template once per tag and append to the item's `.tags` list, setting each link's text to the tag as declared; verify the existing post shows a `TIL` link beneath its excerpt
- [ ] 3.2 Guard on `Array.isArray(post.meta.tags)` so a post without tags, or a stale string-valued `meta.tags`, renders no tag row and no error; verify by loading the page against a `posts.json` where the post has no `tags` key

## 4. Filtering and toggle

- [ ] 4.1 Add a `sameTag(a, b)` helper comparing two tags lower-cased, and in `render()` read the `tag` search parameter and pass both the filtered posts and the active tag to `renderList`; verify that `?tag=TIL`, `?tag=til` and `?tag=TiL` each list the post, and `?tag=nope` renders an empty list with no console error
- [ ] 4.2 Confirm `?post=` still takes precedence and renders the post page even when a `tag` parameter is also present; verify by loading a URL carrying both
- [ ] 4.3 Set each tag link's `href` to `?tag=<tag>` when it is not the active tag and to `./` when it is; verify by hovering both states and reading the status bar, or by inspecting the rendered `href`
- [ ] 4.4 Add a modifier class to the link when `sameTag` matches it against the active tag; verify the class appears in the DOM under both `?tag=TIL` and `?tag=til`, and is absent with no filter

## 5. Post page

- [ ] 5.1 In `renderPost`, join array-valued meta entries with `", "` before setting `textContent`; verify the post page's details show `TIL` rather than a bracketed or comma-jammed value

## 6. Styling

- [ ] 6.1 Style `.tags` as an inline, unbulleted row of chips in `styles.css`, consistent with the existing muted-metadata treatment; verify the row reads as metadata and not as body copy in both light and dark colour schemes
- [ ] 6.2 Style the active tag state so it is distinguishable from unselected tags; verify by comparing the list at `?tag=TIL` against the unfiltered list in both colour schemes

## 7. End-to-end verification

- [ ] 7.1 Serve the site and walk the full loop: load the list, click `TIL` to filter, confirm the URL becomes `?tag=TIL` and the chip renders active, click it again to clear, and confirm the unfiltered list returns
- [ ] 7.2 Confirm browser back and forward move between the filtered and unfiltered states, and that a directly loaded `?tag=TIL` URL renders the filtered list on first paint
