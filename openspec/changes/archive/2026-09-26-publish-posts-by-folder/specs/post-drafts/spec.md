# Spec Delta

## ADDED Requirements

### Requirement: A post's folder decides whether it is published

A post SHALL count as published when it lives in `posts/done/` and as a draft
when it lives in `posts/drafts/`. The `finished` front matter value SHALL NOT
affect whether a post is published. Anything placed directly in `posts/`,
outside these two folders, SHALL be ignored by the build.

#### Scenario: A post in the done folder

- **WHEN** a post lives in `posts/done/`
- **THEN** the post counts as published

#### Scenario: A post in the drafts folder

- **WHEN** a post lives in `posts/drafts/`
- **THEN** the post counts as a draft

#### Scenario: A published post without a finished date

- **WHEN** a post lives in `posts/done/` and its front matter has no
  `finished` value
- **THEN** the post counts as published

#### Scenario: A draft with a finished date

- **WHEN** a post lives in `posts/drafts/` and its front matter contains
  `finished: 18.09.2026`
- **THEN** the post counts as a draft

#### Scenario: A post outside both folders

- **WHEN** a post lives directly in `posts/`
- **THEN** the build leaves it out, with or without `--drafts`

### Requirement: Draft files are not uploaded to the live site

The deploy workflow SHALL NOT upload `posts/drafts/`, so a draft's text and
media cannot be reached on the live site by direct URL. Media of published
posts SHALL stay reachable.

#### Scenario: Opening a draft file by URL

- **WHEN** a reader requests a draft's `text.md` or image by its direct URL on
  the live site
- **THEN** the file is not served

#### Scenario: Images in a published post

- **WHEN** a published post references an image stored next to its `text.md`
- **THEN** the image is shown on the live post page

## REMOVED Requirements

### Requirement: A post is finished only when it has a valid finished date

**Reason**: Replaced by folder-based publishing; the `finished` date is now
display metadata only.
**Migration**: Move a post to `posts/done/` to publish it and to
`posts/drafts/` to unpublish it.
