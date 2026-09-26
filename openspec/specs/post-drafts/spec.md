# post-drafts Specification

## Purpose

Lets the author keep unfinished posts in the repository without publishing
them, by treating only posts in `posts/done/` as published and posts in
`posts/drafts/` as drafts, while still allowing drafts to be previewed locally.

## Requirements

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

### Requirement: Drafts are excluded from the built site

The default build SHALL leave drafts out of the built post data, so that a
draft does not appear in the post list, cannot be opened as a post page, and
contributes no tags to the tag filter. Published posts SHALL be built exactly
as before.

#### Scenario: A draft is not listed

- **WHEN** the site is built without options and a post is a draft
- **THEN** the post list does not include that post

#### Scenario: A draft cannot be opened

- **WHEN** the site is built without options and a reader opens the post page
  URL of a draft
- **THEN** the draft's content is not shown

#### Scenario: A tag used only by drafts

- **WHEN** the site is built without options and a tag is carried only by
  drafts
- **THEN** that tag appears nowhere on the page

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

### Requirement: Drafts can be included for local preview

The build SHALL accept a `--drafts` option that includes drafts in the built
post data alongside published posts, so the author can preview them locally.
The deployed site SHALL be built without this option.

#### Scenario: Building with drafts

- **WHEN** the site is built with `npm run build -- --drafts`
- **THEN** drafts are listed and can be opened like published posts

#### Scenario: Deploying

- **WHEN** the deploy workflow builds the site
- **THEN** drafts are excluded

### Requirement: The build reports skipped drafts

The build SHALL report how many drafts it left out, so a post still sitting in
`posts/drafts/` is noticed.

#### Scenario: Drafts present

- **WHEN** the site is built without options and three posts are drafts
- **THEN** the build output states that three drafts were skipped
