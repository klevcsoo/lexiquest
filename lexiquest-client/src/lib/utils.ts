import {LetterCorrectness} from "../types/LetterCorrectness";

export function isCorrect(result: LetterCorrectness[]): boolean {
    return result.every(value => value === "correct");
}
