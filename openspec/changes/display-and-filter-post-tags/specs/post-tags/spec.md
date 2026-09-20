# Spec Delta

## Purpose

Lets readers see what a post is about at a glance and narrow the post list to a
single topic, by declaring tags in a post's front matter and exposing them as
toggleable filters in the URL.

## ADDED Requirements

### Requirement: Tags are declared as a comma-separated front-matter list

A post SHALL be able to declare tags in its front matter using a
comma-separated `tags` value. The build SHALL parse that value into a list of
individual tags, trimming surrounding whitespace from each and discarding empty
entries. Front-matter keys other than the known list-valued keys SHALL continue
to be parsed as plain strings, so a comma in their value carries no meaning.

#### Scenario: A post declares several tags

- **WHEN** a post's front matter contains `tags: TIL, AI`
- **THEN** the built post's tags are the list `TIL`, `AI`

#### Scenario: A post declares one tag

- **WHEN** a post's front matter contains `tags: TIL`
- **THEN** the built post's tags are the single-item list `TIL`

#### Scenario: Extra whitespace and empty entries

- **WHEN** a post's front matter contains `tags:  TIL ,, AI `
- **THEN** the built post's tags are the list `TIL`, `AI`

#### Scenario: A post declares no tags

- **WHEN** a post's front matter has no `tags` key
- **THEN** the post builds successfully and carries no tags
- **AND** the post list renders it without a tag row

#### Scenario: A non-list key containing a comma

- **WHEN** a post's front matter contains a key other than `tags` whose value
  contains a comma
- **THEN** that value is kept as a single string and is not split

### Requirement: Tags display with their declared capitalisation

A tag SHALL be displayed exactly as the post declared it, so that acronyms and
proper nouns stay recognisable to readers. The build SHALL NOT alter a tag's
casing.

#### Scenario: An acronym tag

- **WHEN** a post declares `tags: TIL`
- **THEN** that tag is displayed as `TIL` wherever it appears

#### Scenario: A mixed-case tag

- **WHEN** a post declares `tags: Home Lab`
- **THEN** that tag is displayed as `Home Lab` wherever it appears

### Requirement: Tags are matched without regard to capitalisation

Tags SHALL be compared case-insensitively, so that tags differing only in
casing select the same set of posts. Each post SHALL still display its own
declared casing.

#### Scenario: Two posts spelling a tag differently

- **WHEN** one post declares `tags: TIL` and another declares `tags: til`
- **AND** either of those tags is selected
- **THEN** both posts are listed
- **AND** each post's entry displays the tag as that post declared it

#### Scenario: A selected tag in unexpected casing

- **WHEN** a reader opens the post list with the `tag` parameter set to `til`
- **THEN** posts carrying the tag `TIL` are listed

### Requirement: The post list displays each post's tags

The post list SHALL display a post's tags beneath its excerpt. Each tag SHALL
be rendered as a link. A post with no tags SHALL render no tag row.

#### Scenario: A tagged post in the list

- **WHEN** a reader views the post list and a listed post carries the tags
  `TIL` and `AI`
- **THEN** that post's entry shows `TIL` and `AI` beneath its excerpt
- **AND** each is a link

### Requirement: A selected tag filters the post list

The post list SHALL accept a selected tag as the `tag` URL parameter and SHALL
show only the posts carrying that tag. With no `tag` parameter present, the
list SHALL show all posts. A `tag` parameter matching no post SHALL produce an
empty list rather than an error.

#### Scenario: Filtering to a tag

- **WHEN** a reader opens the post list with the `tag` parameter set to `TIL`
- **THEN** only posts carrying the tag `TIL` are listed

#### Scenario: No tag selected

- **WHEN** a reader opens the post list with no `tag` parameter
- **THEN** every post is listed

#### Scenario: A tag no post carries

- **WHEN** a reader opens the post list with the `tag` parameter set to a value
  no post carries
- **THEN** the list renders with no post entries and no error

### Requirement: Tags toggle the filter and show their selected state

A tag in the post list SHALL act as a toggle for the filter. A tag that is not
the currently selected one SHALL link to the post list filtered to that tag. The
currently selected tag SHALL link to the unfiltered post list, so that
activating it clears the filter. The currently selected tag SHALL be visually
distinguishable from unselected tags.

#### Scenario: Selecting a tag

- **WHEN** a reader activates a tag that is not currently selected
- **THEN** the list is filtered to that tag
- **AND** that tag is shown in its selected state

#### Scenario: Deselecting the selected tag

- **WHEN** a reader activates the currently selected tag
- **THEN** the filter is cleared and every post is listed again
- **AND** no tag is shown in its selected state

#### Scenario: Navigating filter changes

- **WHEN** a reader selects a tag and then uses the browser's back control
- **THEN** the list returns to its previous filter state

### Requirement: The post page displays a post's tags

A post's own page SHALL display its tags among the post's other front-matter
details, rendered as a readable comma-separated list rather than as a raw
value.

#### Scenario: Viewing a tagged post

- **WHEN** a reader opens a post carrying the tags `TIL` and `AI`
- **THEN** the post's details show its tags as `TIL, AI`
