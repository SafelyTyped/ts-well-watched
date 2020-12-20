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

## Documentation

Looking for more detailed documentation? You'll find it under the [docs](./docs) folder.

* [Our CHANGELOG](CHANGELOG.md)
* [Our software license](LICENSE.md)
* [All contributors to date](AUTHORS.md)