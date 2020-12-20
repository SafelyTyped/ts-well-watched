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
import {
    applyFunctionalOptions,
    FunctionalOption,
    HashMap,
    OnError,
    OnErrorOptions,
    THROW_THE_ERROR,
} from "@safelytyped/core-types";

import { DEFAULT_WATCHLIST_FN_OPTS } from "./defaults/DEFAULT_WATCHLIST_FN_OPTS";
import { WatchList } from "./WatchList";

/**
 * `makeWatchList()` is a smart constructor. It creates a new
 * {@link WatchList}, seeds it with an (optional) initial list of
 * topics and watchers, and then applies any user-defined functional
 * options that you provide.
 *
 * @param input
 * the initial list of topics and watchers. Use {@link DEFAULT_WATCHLIST_SEED}
 * if you don't have any topics and watchers to begin with.
 * @param onError
 * We will call your `onError` handler if something goes wrong.
 * @param defaultFnOpts
 * If you don't pass in any `fnOpts` of your own, we will run these
 * functional options against the newly-built watchlist.
 * @param fnOpts
 * A list of functional options that you want to us to run against the
 * newly-built watchlist.
 *
 * @returns
 * The newly-built {@link WatchList}.
 *
 * @template T
 * the data type that can watch topics in this watchlist
 */
export function makeWatchList<T>(
    input: HashMap<T[]>,
    {
        onError = THROW_THE_ERROR,
        defaultFnOpts = DEFAULT_WATCHLIST_FN_OPTS,
    }: {
        onError?: OnError,
        defaultFnOpts?: FunctionalOption<WatchList<T>, OnErrorOptions>[]
    } = {},
    ...fnOpts: FunctionalOption<WatchList<T>, OnErrorOptions>[]
): WatchList<T> {
    // do we need to apply the default functional options?
    if (fnOpts.length === 0) {
        fnOpts = defaultFnOpts;
    }

    // build it, then let the functional opts do their thing
    return applyFunctionalOptions(
        new WatchList(input),
        {onError},
        ...fnOpts
    );
}