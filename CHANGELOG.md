# CHANGELOG

## Introduction

This CHANGELOG tells you:

* when a release was made
* what is in each release

It also tells you what changes have been completed, and will be included in the next tagged release.

For each release, changes are grouped under these headings:

* _Backwards-Compatibility Breaks_: a list of any backwards-compatibility breaks
* _New_: a list of new features. If the feature came from a contributor via a PR, make sure you link to the PR and give them a mention here.
* _Fixes_: a list of bugs that have been fixed. If there's an issue for the bug, make sure you link to the GitHub issue here.
* _Dependencies_: a list of dependencies that have been added / updated / removed.
* _Tools_: a list of bundled tools that have been added / updated / removed.

## develop branch

The following changes have been completed, and will be included in the next tagged release.

## v0.2.0

Released Sunday, 3rd March 2024.

### Backwards-Compatibility Breaks

* `validateWatchList()` now takes the data path as an optional parameter
  - this matches the latest TypeValidator approach in @safelytyped/core-types

### Fixes

* Added simultaneous support for CommonJS and ESM runtime environments.

### Dependencies

* Upgraded to Typescript v5.2

### Tools

* Replaced tslint with eslint

## v0.1.1

Released Saturday, 5th June 2021.

### Dependencies

* Upgraded all dependencies to their latest version.

## v0.1.0

Released Sunday, 20th December 2020.

### New

* Added `WatchList` type.
* Added `isWatchList()`
* Added `makeWatchList()`
* Added `mustBeWatchList()`
* Added `validateWatchList()`
* Added `WatchListUnsubscriber()`
