/*

Troll JS
A testing tool I'm making, mostly for practice

Version: 1.0.0

Much like how trolls keep one from moving past a bridge, Troll JS will keep code from moving forward if it's failing tests

Troll JS provides an object - o_o

o_o provides the following interface:
    - riddle(check, expect)
        - Queues a check/expect pair to be examined using shallow equality
    - riddleDeep(check, expect)
        - Queues a check/expect pair to be examined using deep equality
    - readOut(verbose)
        - Prints success/failure numbers, and show details for negative results
        - Shows details for positive results as well if verbose is true

*/

class Troll {
    constructor() {
        this.queue = [];
    }

    riddle(check, expect) {
        this.queue.push({
            check: check,
            expect: expect,
            result: check == expect
        });
    }

    riddleDeep(check, expect) {
        this.queue.push({
            check: check,
            expect: expect,
            result: check === expect
        });
    }

    readOut(verbose) {
        let success = 0;
        let failure = 0;
        let report = "o_o Hello traveler, time to answer some riddles...";

        this.queue.forEach((test, index) => {
            if (test.result) {
                success += 1;
                if (verbose) {
                    report += "\n\nSuccess at test number: " + (index + 1);
                    report += "\nCheck: " + test.check + "(" + typeof(test.check) + ")" + ", Expect: " + test.expect + "(" + typeof(test.expect) + ")";
                }
            } else {
                failure += 1;
                report += "\n\nFailure in test number: " + (index + 1);
                report += "\nCheck: " + test.check + "(" + typeof(test.check) + ")" + ", Expect: " + test.expect + "(" + typeof(test.expect) + ")";
            }
        });

        console.log("Passed " + success + " / " + this.queue.length + " tests.");
        if (failure > 0) {
            console.log(report);
        } else {
            console.log("o_o Move along then...");
        }
    }
}

let o_o = new Troll();

