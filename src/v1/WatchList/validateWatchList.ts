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
    AppErrorOr,
    DataPath,
    getClassNames,
    UnsupportedTypeError,
    validate,
    validateObject,
} from "@safelytyped/core-types";

import { WatchList } from "./WatchList";

/**
 * `validateWatchList<T>()` is a {@link DataValidator}. Use it to prove that
 * your `input` is a valid {@link WatchList}.
 *
 * NOTE: we currently do not prove that the {@link WatchList} contains
 * type `T`. We just don't have a way to achieve that yet.
 *
 * @param path
 * where are we in the data structure that you are validating?
 * @param input
 * the value to validate
 * @returns
 * - `input` if validation succeeds, or
 * - an {@link AppError} explaining why validation failed
 */
export function validateWatchList<T>(
    path: DataPath,
    input: unknown,
): AppErrorOr<WatchList<T>>
{
    return validate(input)
        .next((x) => validateObject(path, x))
        .next((x) => validateIsWatchList<T>(path, x))
        .value();
}

/**
 * `validateIsWatchList<T>()` is a helper function for
 * {@link validateWatchList}. We use it to prove that the given input object
 * actually is a {@link WatchList}.
 *
 * @param path
 * where are we in the data structure that you are validating?
 * @param input
 * the value to validate
 * @returns
 * - `input` (typecast to a `WatchList`) if validation succeeds, or
 * - an {@link AppError} explaining why validation failed
 */
function validateIsWatchList<T>(path: DataPath, input: object): AppErrorOr<WatchList<T>>
{
    // is it a WatchList at all?
    if (!(input instanceof WatchList)) {
        return new UnsupportedTypeError({
            public: {
                dataPath: path,
                expected: "WatchList",
                actual: getClassNames(input)[0]
            }
        });
    }

    // all done
    return input as WatchList<T>;
}