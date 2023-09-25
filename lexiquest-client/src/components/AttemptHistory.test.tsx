import {render, screen} from "@testing-library/react";
import {AttemptHistory} from "./AttemptHistory";
import {AttemptHistoryData} from "../types/AttemptHistoryData";

describe("AttemptHistory rendering", () => {
    test("no history", () => {
        const history: AttemptHistoryData = {
            entries: []
        };

        render(<AttemptHistory attemptHistory={history}/>);
        const elements = screen.queryAllByText("");
        expect(elements[1]).toBeEmptyDOMElement();
    });

    test("one history entry", () => {
        const history: AttemptHistoryData = {
            entries: [{
                correctness: ["correct", "incorrect", "wrong-place"],
                word: "jós",
                timestamp: new Date()
            }]
        };

        render(<AttemptHistory attemptHistory={history}/>);
        expect(screen.getByText("j")).toBeTruthy();
        expect(screen.getByText("ó")).toBeTruthy();
        expect(screen.getByText("s")).toBeTruthy();
    });

    test("multiple history entries", () => {
        const history: AttemptHistoryData = {
            entries: [
                {
                    correctness: ["correct", "incorrect", "correct"],
                    word: "hős",
                    timestamp: new Date()
                },
                {
                    correctness: ["correct", "incorrect", "correct"],
                    word: "has",
                    timestamp: new Date()
                }
            ]
        };

        render(<AttemptHistory attemptHistory={history}/>);
        expect(screen.queryAllByText("h").length).toEqual(2);
        expect(screen.queryAllByText("ő").length).toEqual(1);
        expect(screen.queryAllByText("a").length).toEqual(1);
        expect(screen.queryAllByText("s").length).toEqual(2);
    });
});
