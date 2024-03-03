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

import { expect } from "chai";
import { describe } from "mocha";
import { makeWatchList } from "@safelytyped/well-watched";
import { WatchList } from "@safelytyped/well-watched";

describe("makeWatchList()", () => {
    it("returns a WatchList", () => {
        const actualValue = makeWatchList<string>({
            key: ["value"]
        });
        expect(actualValue).to.be.instanceof(WatchList);
    });

    it("applies default functional options", () => {
        let fnOpt1Called = false;
        let fnOpt2Called = false;

        const fnOpt1 = (input: WatchList<string>): WatchList<string> => {
            fnOpt1Called = true;
            return input;
        }
        const fnOpt2 = (input: WatchList<string>): WatchList<string> => {
            fnOpt2Called = true;
            return input;
        }

        const actualValue = makeWatchList<string>(
            {
                key: [ "value" ]
            },
            {
                defaultFnOpts: [ fnOpt1, fnOpt2 ]
            }
        );

        expect(actualValue).to.be.instanceOf(WatchList);
        expect(fnOpt1Called).to.equal(true);
        expect(fnOpt2Called).to.equal(true);
    });

    it("does not apply default functional options when extra functional options passed in", () => {
        let fnOpt1Called = false;
        let fnOpt2Called = false;
        let fnOpt3Called = false;
        let fnOpt4Called = false;

        const fnOpt1 = (input: WatchList<string>): WatchList<string> => {
            fnOpt1Called = true;
            return input;
        }
        const fnOpt2 = (input: WatchList<string>): WatchList<string> => {
            fnOpt2Called = true;
            return input;
        }
        const fnOpt3 = (input: WatchList<string>): WatchList<string> => {
            fnOpt3Called = true;
            return input;
        }
        const fnOpt4 = (input: WatchList<string>): WatchList<string> => {
            fnOpt4Called = true;
            return input;
        }

        const actualValue = makeWatchList<string>(
            {
                key: [ "value" ]
            },
            {
                defaultFnOpts: [ fnOpt1, fnOpt2 ]
            },
            fnOpt3,
            fnOpt4
        );

        expect(actualValue).to.be.instanceOf(WatchList);
        expect(fnOpt1Called).to.equal(false);
        expect(fnOpt2Called).to.equal(false);
        expect(fnOpt3Called).to.equal(true);
        expect(fnOpt4Called).to.equal(true);
    });
});