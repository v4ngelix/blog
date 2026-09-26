# Spec Delta

## Purpose

Lets the author keep unfinished posts in the repository without publishing
them, by treating only posts with a finished date as published, while still
allowing drafts to be previewed locally.

## ADDED Requirements

### Requirement: A post is finished only when it has a valid finished date

A post SHALL count as finished only when its front matter contains a
`finished` value that is a date written as day, month and four-digit year
separated by dots (for example `18.09.2026`). A post whose `finished` key is
missing, empty or holds any other value SHALL count as a draft.

#### Scenario: A post with a finished date

- **WHEN** a post's front matter contains `finished: 18.09.2026`
- **THEN** the post counts as finished

#### Scenario: A post with no finished key

- **WHEN** a post's front matter has no `finished` key
- **THEN** the post counts as a draft

#### Scenario: A post with an empty finished value

- **WHEN** a post's front matter contains `finished:` with no value
- **THEN** the post counts as a draft

#### Scenario: A post with a malformed finished value

- **WHEN** a post's front matter contains `finished: soon`
- **THEN** the post counts as a draft

### Requirement: Drafts are excluded from the built site

The default build SHALL leave drafts out of the built post data, so that a
draft does not appear in the post list, cannot be opened as a post page, and
contributes no tags to the tag filter. Finished posts SHALL be built exactly as
before.

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

### Requirement: Drafts can be included for local preview

The build SHALL accept a `--drafts` option that includes drafts in the built
post data alongside finished posts, so the author can preview them locally.
The deployed site SHALL be built without this option.

#### Scenario: Building with drafts

- **WHEN** the site is built with `npm run build -- --drafts`
- **THEN** drafts are listed and can be opened like finished posts

#### Scenario: Deploying

- **WHEN** the deploy workflow builds the site
- **THEN** drafts are excluded

### Requirement: The build reports skipped drafts

The build SHALL report how many drafts it left out, so a post hidden by a
missing or mistyped `finished` date is noticed.

#### Scenario: Drafts present

- **WHEN** the site is built without options and three posts are drafts
- **THEN** the build output states that three drafts were skipped
