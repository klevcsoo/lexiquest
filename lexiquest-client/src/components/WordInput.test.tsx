import {fireEvent, render, screen} from "@testing-library/react";
import {WordInput} from "./WordInput";

describe("WordInput rendering", () => {
    test("empty", () => {
        render(<WordInput onValidation={() => {
        }}/>);

        expect(screen.queryAllByText("t").length).toEqual(0);
    });

    test("one character", () => {
        render(<WordInput onValidation={() => {
        }}/>);

        fireEvent.keyDown(document.body, {key: "t", code: "KeyT"});
        expect(screen.getByText("t")).toBeTruthy();
    });

    test("all characters", () => {
        render(<WordInput onValidation={() => {
        }}/>);

        const characters = "tudom".split("");
        characters.forEach(char => {
            fireEvent.keyDown(document.body, {
                key: char, code: `Key${char.toUpperCase()}`
            });
        });

        characters.forEach(char => {
            expect(screen.getByText(char)).toBeTruthy();
        });
    });
});
