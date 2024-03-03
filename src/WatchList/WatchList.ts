//
// Copyright (c) 2020-present Ganbaro Digital Ltd
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
//   * Re-distributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//
//   * Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in
//     the documentation and/or other materials provided with the
//     distribution.
//
//   * Neither the names of the copyright holders nor the names of his
//     contributors may be used to endorse or promote products derived
//     from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
// ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
import { HashMap, type NonEmptyArray } from "@safelytyped/core-types";

import type { WatchListUnsubscriber } from "./WatchListUnsubscriber";

/**
 * `WatchList` manages a list of topics and the items that are
 * watching each of these topics.
 *
 * @template T
 * the data type that can watch topics in this watchlist
 */
export class WatchList<T>
{
    /**
     * `_topicsAndWatchers` holds a list of topics, and the items that are
     * watching each of these topics.
     */
    protected _topicsAndWatchers: HashMap<T[]>;

    /**
     * `constructor()` creates a new `WatchList` object.
     *
     * @param initialList
     * the initial list of topics and their watchers
     */
    public constructor(initialList: HashMap<T[]> = {})
    {
        this._topicsAndWatchers = initialList;
    }

    /**
     * `add()` adds your watcher to our list.
     *
     * We send back a function that you can call if you ever need to
     * unsubscribe your `watcher`.
     *
     * NOTE:
     * - you can call the unsubscribe function at any time
     *
     * @param watcher
     * the item that wants to watch one or more topics
     * @param topics
     * the list of topics that the `watcher` wants to sign-up for
     * @returns
     * call this function if you ever need to unsubscribe your callback
     */
    public add(
        watcher: T,
        ...topics: NonEmptyArray<string>
    ): WatchListUnsubscriber
    {
        // keep track of our unsubscribe functions
        const unsubs: WatchListUnsubscriber[] = [];

        // which topics is the watcher interested in?
        topics.forEach((topicName) => {
            unsubs.push(this._registerWatcherForTopic(topicName, watcher));
        });

        // make it easy to unsubscribe in the future
        return () => {
            unsubs.forEach((unsub) => unsub());
        };
    }

    /**
     * `_registerWatcherForTopic()` associates your `watcher` with
     * a single `topicName`.
     *
     * We send back a function that you can call if you never need to
     * unsubscribe your `watcher`.
     *
     * @param topicName
     * the topic name that your `watcher` wants to sign-up for
     * @param watcher
     * the item that wants to watch `topicName`
     * @returns
     * a function that you can call when you want to unsubscribe your
     * `watcher`
     */
    private _registerWatcherForTopic(
        topicName: string,
        watcher: T
    ): WatchListUnsubscriber {
        // make sure we have somewhere to add it to
        if (!this._topicsAndWatchers[topicName]) {
            this._topicsAndWatchers[topicName] = [];
        }

        // add it to the list
        this._topicsAndWatchers[topicName].push(watcher);

        // we need to tell the caller how to unsubscribe
        return( () => {
            // if we have been called a second time, the topic
            // may not exist any longer
            if (!this._topicsAndWatchers[topicName]) {
                return;
            }

            // if we have been called a second time, we may no longer
            // be subscribed to this topic
            const index = this._topicsAndWatchers[topicName].indexOf(watcher);
            if (index < 0) {
                return;
            }

            // remove this watcher from the topic
            this._topicsAndWatchers[topicName].splice(index, 1);

            // was this the last watcher for this topic?
            if (this._topicsAndWatchers[topicName].length === 0) {
                // yes, so let's tidy up after ourselves
                delete this._topicsAndWatchers[topicName];
            }
        });
    }

    /**
     * `forEach()` will call your `callback` for each watcher that is
     * registered against the given `topics`.
     *
     * Callbacks happen in the order of topics that you provide, and in
     * the order that watchers were registered against each topic.
     *
     * @param callback
     * We will call this callback every time we find an interest that has
     * registered for any of the given `topics`.
     * @param topics
     * Which topics do we want to find watchers for?
     */
    public forEach(
        callback: (watcher: T, topic: string) => void,
        ...topics: NonEmptyArray<string>
    ): void
    {
        topics.forEach((topic) => {
            // shorthand
            const watchers = this._topicsAndWatchers[topic] ?? [];

            watchers.forEach((interest) => {
                callback(interest, topic);
            });
        });

        // all done
    }

    /**
     * `topics()` returns the list of topics known to this WatchList.
     *
     * The order of the returned list is undefined.
     */
    public topics(): string[] {
        return Object.keys(this._topicsAndWatchers);
    }

    /**
     * `.length` tells you how many watchers are currently registered.
     *
     * If (for example) the same watcher is registered against two topics, it
     * gets counted twice.
     */
    public get length(): number {
        let retval = 0;

        HashMap.forEach(this._topicsAndWatchers, (watchers) => {
            retval = retval + watchers.length;
        });

        // all done
        return retval;
    }
}