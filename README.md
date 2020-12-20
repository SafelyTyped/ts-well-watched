# Welcome To @safelytyped/well-watched!

## Introduction

_Well-Watched_ is a safe type for working with dynamic watch lists.

It's inspired by the way Vuex registers and manages its list of subscribers.

## Quick Start

```
# run this from your Terminal
npm install @safelytyped/well-watched
```

```typescript
// add this import to your Typescript code
import { WatchList } from "@safelytyped/well-watched"

// WatchList is a generic type. If you call it with an empty list of topics
// and watchers, you need to tell the compiler what type each watcher is.
const myWatchList = new WatchList<string>({});

// add the string "watcher1" to a set of topics
//
// the return value is a function you can use to remove "watcher1"
// from all of these topics at any point in the future
const unsubWatcher1 = myWatchList.add("watcher1", "topic1", "topic2", "topic3");

myWatchList.forEach((watcher: string, topic: string) => {
    // this will be called for every watcher
    // that is registered for the topics you ask for
    //
    // in our case, it'll get called:
    //
    // ["watcher1", "topic1"]
    // ["watcher1", "topic3"]
}, "topic1", "topic3");

// if you're no longer interested, you can remove "watcher1" from
// the list of topics
unsubWatcher1();
```

__VS Code users:__ once you've added a single import anywhere in your project, you'll then be able to auto-import anything else that this library exports.

## Our Unit Tests

Our unit tests also serve as documentation.

```
  MODULE_NAME
    ✓ has the value '@safelytyped/well-watched/lib/v1'

  isWatchList()
    accepts valid WatchListData
      ✓ accepts example {"_topicsAndWatchers":{}}
    rejects invalid WatchListData
      ✓ rejects example null
      ✓ rejects example undefined
      ✓ rejects example []
      ✓ rejects example true
      ✓ rejects example false
      ✓ rejects example 3.1415927
      ✓ rejects example 0
      ✓ rejects example -100
      ✓ rejects example 100
      ✓ rejects example {}
      ✓ rejects example "hello world"

  makeWatchList()
    ✓ returns a WatchList
    ✓ applies default functional options
    ✓ does not apply default functional options when extra functional options passed in

  mustBeWatchList()
    accepts valid WatchList
      ✓ accepts example {"_topicsAndWatchers":{}}
    rejects valid WatchList
      ✓ rejects example null
      ✓ rejects example undefined
      ✓ rejects example []
      ✓ rejects example true
      ✓ rejects example false
      ✓ rejects example 3.1415927
      ✓ rejects example 0
      ✓ rejects example -100
      ✓ rejects example 100
      ✓ rejects example {}
      ✓ rejects example "hello world"

  validateWatchList()
    accepts valid WatchListData
      ✓ accepts example {"_topicsAndWatchers":{}}
    rejects invalid WatchListData
      ✓ rejects example null
      ✓ rejects example undefined
      ✓ rejects example []
      ✓ rejects example true
      ✓ rejects example false
      ✓ rejects example 3.1415927
      ✓ rejects example 0
      ✓ rejects example -100
      ✓ rejects example 100
      ✓ rejects example {}
      ✓ rejects example "hello world"

  WatchList
    .constructor()
      ✓ accepts an empty list
      ✓ accepts an initial list of topics
    .add()
      ✓ adds a watcher to the given list of topics
      ✓ returns a function which will unsubscribe the watcher from all the topics
      ✓ the returned unsubscribe function is a no-op when called a second time
    .forEach()
      ✓ applies your callback to every watcher in the given list of topics
      ✓ ignores topics that have no watchers
    .length
      ✓ returns 0 when there are no watchers registered
      ✓ returns the number of watchers across all topics


  49 passing (20ms)
```

## Documentation

Looking for more detailed documentation? You'll find it under the [docs](./docs) folder.

* [Our CHANGELOG](CHANGELOG.md)
* [Our software license](LICENSE.md)
* [All contributors to date](AUTHORS.md)