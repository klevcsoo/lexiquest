import {LetterCorrectness} from "../types/LetterCorrectness";
import {mockValidation} from "./mockValidation";

describe("mock API validation", () => {
    // noinspection SpellCheckingInspection
    const cases: [[string, string], LetterCorrectness[]][] = [
        [["szár", "sáár"], ["correct", "incorrect", "correct", "correct"]],
        [["atya", "aaya"], ["correct", "incorrect", "correct", "correct"]],
        [["atya", "tyaa"], ["wrong-place", "wrong-place", "wrong-place", "correct"]],
        [["gőző", "őőző"], ["incorrect", "correct", "correct", "correct"]],
        [["önző", "őnző"], ["incorrect", "correct", "correct", "correct"]]
    ];

    for (const pair of cases) {
        // eslint-disable-next-line jest/valid-title
        test(pair[0].join(" <-> "), async () => {
            expect(await mockValidation(...pair[0])).toEqual(pair[1]);
        });
    }
});
