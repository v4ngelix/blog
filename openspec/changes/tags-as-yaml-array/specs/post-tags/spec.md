# Spec Delta

## ADDED Requirements

### Requirement: Tags are declared as a front-matter array

A post SHALL be able to declare tags in its front matter as a YAML flow array:
a `tags` value wrapped in square brackets, with entries separated by commas.
The build SHALL parse that value into a list of individual tags, trimming
surrounding whitespace from each entry, removing one pair of matching single
or double quotes around an entry, and discarding empty entries. Front-matter
keys other than the known list-valued keys SHALL continue to be parsed as
plain strings, so a comma or bracket in their value carries no meaning.

#### Scenario: A post declares several tags

- **WHEN** a post's front matter contains `tags: [TIL, AI]`
- **THEN** the built post's tags are the list `TIL`, `AI`

#### Scenario: A post declares one tag

- **WHEN** a post's front matter contains `tags: [TIL]`
- **THEN** the built post's tags are the single-item list `TIL`

#### Scenario: Extra whitespace and empty entries

- **WHEN** a post's front matter contains `tags: [ TIL ,, AI ]`
- **THEN** the built post's tags are the list `TIL`, `AI`

#### Scenario: Quoted entries

- **WHEN** a post's front matter contains `tags: ["TIL", 'Home Lab']`
- **THEN** the built post's tags are the list `TIL`, `Home Lab`

#### Scenario: An empty array or empty value

- **WHEN** a post's front matter contains `tags: []` or `tags:` with no value
- **THEN** the post builds successfully and carries no tags

#### Scenario: A post declares no tags

- **WHEN** a post's front matter has no `tags` key
- **THEN** the post builds successfully and carries no tags
- **AND** the post list renders it without a tag row

#### Scenario: A non-list key containing a comma

- **WHEN** a post's front matter contains a key other than `tags` whose value
  contains a comma
- **THEN** that value is kept as a single string and is not split

### Requirement: A tags value that is not an array fails the build

The build SHALL fail when a post's non-empty `tags` value is not wrapped in
square brackets. The failure message SHALL name the offending post and show
the expected format, and no output file SHALL be written. This applies to
drafts as well as finished posts.

#### Scenario: The old comma-separated format

- **WHEN** a post's front matter contains `tags: TIL, AI`
- **THEN** the build exits with an error naming that post and the expected
  `tags: [TIL, AI]` format
- **AND** the existing output file is left unchanged

## MODIFIED Requirements

### Requirement: Tags display with their declared capitalisation

A tag SHALL be displayed exactly as the post declared it, so that acronyms and
proper nouns stay recognisable to readers. The build SHALL NOT alter a tag's
casing.

#### Scenario: An acronym tag

- **WHEN** a post declares `tags: [TIL]`
- **THEN** that tag is displayed as `TIL` wherever it appears

#### Scenario: A mixed-case tag

- **WHEN** a post declares `tags: [Home Lab]`
- **THEN** that tag is displayed as `Home Lab` wherever it appears

### Requirement: Tags are matched without regard to capitalisation

Tags SHALL be compared case-insensitively, so that tags differing only in
casing select the same set of posts. Each post SHALL still display its own
declared casing.

#### Scenario: Two posts spelling a tag differently

- **WHEN** one post declares `tags: [TIL]` and another declares `tags: [til]`
- **AND** either of those tags is selected
- **THEN** both posts are listed
- **AND** each post's entry displays the tag as that post declared it

#### Scenario: A selected tag in unexpected casing

- **WHEN** a reader opens the post list with the `tag` parameter set to `til`
- **THEN** posts carrying the tag `TIL` are listed

## REMOVED Requirements

### Requirement: Tags are declared as a comma-separated front-matter list

**Reason**: The IDE's front-matter schema expects `tags` to be an array and
flags the plain string form as invalid.
**Migration**: Wrap the value in brackets: `tags: TIL, AI` becomes
`tags: [TIL, AI]`. Replaced by "Tags are declared as a front-matter array".
