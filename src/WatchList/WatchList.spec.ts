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

import { HashMap } from "@safelytyped/core-types";
import { expect } from "chai";
import { describe } from "mocha";
import { WatchList } from "@safelytyped/well-watched";

describe("WatchList", () => {
    describe(".constructor()", () => {
        it("accepts an empty list", () => {
            const unit = new WatchList({});

            expect(unit).to.be.instanceOf(WatchList);
            expect(unit.length).to.equal(0);
        });

        it("accepts an initial list of topics", () => {
            const unit = new WatchList({
                topic1: [ "watcher1" ],
                topic2: [ "watcher2" ]
            });

            expect(unit.length).to.equal(2);
        });
    });

    describe(".add()", () => {
        it("adds a watcher to the given list of topics", () => {
            // tslint:disable-next-line: no-empty
            const watcher1 = (): void => {
            }

            const unit = new WatchList<() => void>({});
            unit.add(watcher1, "topic1", "topic2", "topic3");

            expect(unit.length).to.equal(3);
            expect(unit.topics()).to.eql(["topic1", "topic2", "topic3"]);
        });

        it("returns a function which will unsubscribe the watcher from all the topics", () => {
            // tslint:disable-next-line: no-empty
            const watcher1 = (): void => {
            }
            // tslint:disable-next-line: no-empty
            const watcher2 = (): void => {
            }

            const unit = new WatchList<() => void>({});
            const unsubWatcher1 = unit.add(watcher1, "topic1", "topic2", "topic3");
            unit.add(watcher2, "topic1", "topic4", "topic5");

            expect(unit.length).to.equal(6);
            expect(unit.topics()).to.eql(["topic1", "topic2", "topic3", "topic4", "topic5"]);

            // unsubscribe watcher1
            //
            // this will also delete all the topics where watcher1
            // was the only remaining watcher
            unsubWatcher1();

            expect(unit.length).to.equal(3);
            expect(unit.topics()).to.eql(["topic1", "topic4", "topic5"]);
        });

        it("the returned unsubscribe function is a no-op when called a second time", () => {
            // tslint:disable-next-line: no-empty
            const watcher1 = (): void => {
            }
            // tslint:disable-next-line: no-empty
            const watcher2 = (): void => {
            }

            const unit = new WatchList<() => void>({});
            const unsubWatcher1 = unit.add(watcher1, "topic1", "topic2", "topic3");
            unit.add(watcher2, "topic1", "topic4", "topic5");

            expect(unit.length).to.equal(6);
            expect(unit.topics()).to.eql(["topic1", "topic2", "topic3", "topic4", "topic5"]);

            // unsubscribe watcher1
            //
            // this will also delete all the topics where watcher1
            // was the only remaining watcher
            unsubWatcher1();
            unsubWatcher1();

            expect(unit.length).to.equal(3);
            expect(unit.topics()).to.eql(["topic1", "topic4", "topic5"]);
        });
    });

    describe(".forEach()", () => {
        it("applies your callback to every watcher in the given list of topics", () => {
            const seenWatchers: HashMap<string[]> = {};

            const unit = new WatchList({
                topic1: [ "watcher1" ]
            });
            unit.add("watcher2", "topic1", "topic2", "topic3");

            unit.forEach((watcher: string, topic: string) => {
                if (!seenWatchers[topic]) {
                    seenWatchers[topic] = [];
                }
                seenWatchers[topic].push(watcher);
            }, "topic1", "topic3");

            expect(seenWatchers).to.eql({
                topic1: [ "watcher1", "watcher2"],
                topic3: [ "watcher2" ],
            });
        });

        it("ignores topics that have no watchers", () => {
            const seenWatchers: HashMap<string[]> = {};

            const unit = new WatchList({
                topic1: [ "watcher1" ]
            });
            unit.add("watcher2", "topic1", "topic2", "topic3");

            unit.forEach((watcher: string, topic: string) => {
                if (!seenWatchers[topic]) {
                    seenWatchers[topic] = [];
                }
                seenWatchers[topic].push(watcher);
            }, "topic1", "topic6");

            expect(seenWatchers).to.eql({
                topic1: [ "watcher1", "watcher2"],
            });
        });
    });

    describe(".length", () => {
        it("returns 0 when there are no watchers registered", () => {
            const unit = new WatchList<string>({});
            const unsubber = unit.add("watcher1", "topic1", "topic2");
            unsubber();

            expect(unit.length).to.equal(0);
        });
        it("returns the number of watchers across all topics", () => {
            const unit = new WatchList({
                topic1: [],
                topic2: [ "watcher1", "watcher2" ],
                topic3: [ "watcher3", "watcher4", "watcher5" ]
            });

            expect(unit.length).to.equal(5);
        });
    });
});