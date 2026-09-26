# Proposal

## Why

The IDE validates post front matter against a schema that expects `tags` to be
an array. The currently required format, a plain comma-separated string
(`tags: TIL, AI`), triggers "Incompatible types. Required: array. Actual:
string." The YAML array form (`tags: [TIL, AI]`) passes validation, but the
build does not strip the brackets, so tags come out as `[TIL]`. Three posts
already use the array form and are broken today.

## What Changes

- Tags are declared as a YAML flow array: `tags: [TIL, AI]`.
- **BREAKING**: A `tags` value that is not wrapped in brackets now fails the
  build, with an error that names the post. The comma-separated string format
  is no longer supported.
- Entries wrapped in matching single or double quotes (`["TIL", 'AI']`) have
  the quotes removed.
- An empty array (`tags: []`) or an empty value (`tags:`) means the post has
  no tags.
- The one post still using the old format is migrated to the array form.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `post-tags`: the tag declaration format changes from a comma-separated
  string to a YAML flow array, and invalid values fail the build. Examples in
  the capitalisation requirements are updated to the new syntax.

## Impact

- `scripts/build-posts.js`: `parseValue` for list keys.
- `posts/Running an LLM locally in two commands/text.md`: `tags: TIL` becomes
  `tags: [TIL]`.
- Output shape in `posts.json` is unchanged (`meta.tags` is still a string
  array), so `index.js` needs no change.
