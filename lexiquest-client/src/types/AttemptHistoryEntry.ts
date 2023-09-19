import {LetterCorrectness} from "./LetterCorrectness";

export interface AttemptHistoryEntry {
    word: string;
    correctness: LetterCorrectness[];
    timestamp: Date;
}
