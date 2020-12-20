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
import { AppError, DataPath, DEFAULT_DATA_PATH } from "@safelytyped/core-types";

import { validateWatchList } from "./validateWatchList";
import { WatchList } from "./WatchList";

/**
 * `isWatchList<T>()` is a {@link TypeGuard}. Use it to prove to the
 * compiler that your `input` is a valid {@link WatchList}.
 *
 * NOTE: we currently do not prove that the {@link WatchList} contains
 * type `T`. We just don't have a way to achieve that yet.
 *
 * @param input
 * the value to validate
 * @param dataPath
 * where are you in the data structure that you are validating?
 *
 * @template T
 * the data type that can be added to the WatchList
 */
export function isWatchList<T>(
    input: unknown,
    {
        dataPath = DEFAULT_DATA_PATH
    }: {
        dataPath?: DataPath
    } = {}
): input is WatchList<T>
{
    return !(validateWatchList<T>(dataPath, input) instanceof AppError);
}