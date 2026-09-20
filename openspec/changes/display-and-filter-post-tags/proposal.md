# Proposal

## Why

Posts now carry a `tags` field in their front matter, but the build treats every
front-matter value as a plain string and the list page ignores it entirely. The
tag is therefore invisible to readers, and on the post page it renders as a raw
string. Surfacing tags gives readers a way to see what a post is about at a
glance and to narrow the list to a single topic.

## What Changes

- Front matter gains a list-valued key: `tags: TIL, AI` parses into `["TIL", "AI"]`.
  Tags keep the capitalisation the post declared, so acronyms stay recognisable;
  matching a selected tag against a post's tags ignores casing.
- The list page renders each post's tags as a row of links below the excerpt.
- A `?tag=<tag>` URL parameter filters the list to posts carrying that tag.
- Tag links toggle: an inactive tag links to `?tag=<tag>`, and the currently
  active tag links back to the unfiltered list, so clicking it again clears the
  filter. Active tags render in a distinct state.
- The post page renders array-valued front matter as a comma-separated string
  rather than relying on default array-to-string coercion.
- Posts with no `tags` key keep working unchanged.

## Capabilities

### New Capabilities
- `post-tags`: parsing tags from post front matter, displaying them on the post
  list, and filtering the list by a single selected tag via the URL.

### Modified Capabilities
<!-- None. The project has no existing specs. -->

## Impact

- `scripts/build-posts.js` - front-matter parsing gains a list-valued key
  allowlist; `posts.json` output shape changes so
  that `meta.tags` is an array of strings.
- `posts.json` - regenerated at build time (gitignored); the existing post's
  `meta.tags` becomes `["TIL"]`.
- `index.html` - the `post-list-item` template gains a tag list; a new template
  for an individual tag link.
- `index.js` - `render()` reads `?tag`, filters the post list, and renders tag
  links with toggle hrefs; `renderPost()` joins array meta values.
- `styles.css` - styling for the tag row and the active tag state.
- No new dependencies. No changes to the existing click interceptor: tag links
  are same-path links, which it already handles.

## Non-goals

- Multiple simultaneously selected tags. The `?tag=` URL shape is forward
  compatible with it (`searchParams.getAll` already returns a list), so this can
  be extended later without a migration.
- Making the tags on the post detail page clickable.
- A tag index page or tag counts.
