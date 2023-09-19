import {LetterCorrectness} from "./LetterCorrectness";

export type ValidationFunction = (word: string) => Promise<LetterCorrectness[]>
