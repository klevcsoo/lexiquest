import {LetterCorrectness} from "../types/LetterCorrectness";
import {GameDayData} from "../types/GameDayData";

import {AttemptHistoryData} from "../types/AttemptHistoryData";
import {MAX_DAILY_ATTEMPTS} from "./config";
import {isCorrect} from "./utils";

const MOCK_START_DATE = new Date("2023-08-25");
const MOCK_LOCAL_STORAGE_KEY = "attempt_history";

/**
 * Ez csak egy mock függvény ami imitálja a validációs API választ.
 * @param secret a titkos szó
 * @param guess a felhasználó tipp szava
 */
export async function mockValidation(secret: string, guess: string): Promise<LetterCorrectness[]> {
    console.log(`MOCK API CALL: validation`);

    if (secret.length !== guess.length) {
        throw new Error("Failed to compare words: lengths differ");
    }

    const secretArray: (string | null)[] = secret.split("");
    const guessArray: (string | null)[] = guess.split("");

    const result = new Array(guessArray.length).fill("unknown");

    for (let i = 0; i < result.length; i++) {
        if (secretArray[i] === guessArray[i]) {
            result[i] = "correct";
            secretArray[i] = null;
            guessArray[i] = null;
        }
    }

    for (let i = 0; i < result.length; i++) {
        if (result[i] === "unknown") {
            if (secretArray.includes(guessArray[i])) {
                result[i] = "wrong-place";
            } else {
                result[i] = "incorrect";
            }
        }
    }

    const attemptHistory = await mockGetAttempHistory();
    attemptHistory.entries.push({
        word: guess,
        correctness: result,
        timestamp: new Date()
    });
    window.localStorage.setItem(MOCK_LOCAL_STORAGE_KEY, JSON.stringify(attemptHistory));

    await sleep(200);
    return result;
}

/**
 * Mock függvény amely visszaadja a jelenlegi nap számát és
 * dátumát a szerver szerint.
 */
export async function mockGetGameDay(): Promise<GameDayData> {
    console.log(`MOCK API CALL: game day info`);

    const today = new Date();
    const diff = (today.getTime() - MOCK_START_DATE.getTime()) / 86400000;

    await sleep(200);
    return {day: Math.ceil(diff), date: today};
}

/**
 * Mock függvény, amin visszaadja a jelenlegi próbálkozásokat.
 */
export async function mockGetAttempHistory(): Promise<AttemptHistoryData> {
    console.log(`MOCK API CALL: attempt history`);

    const saved = window.localStorage.getItem(MOCK_LOCAL_STORAGE_KEY);
    if (!saved) {
        return {entries: []};
    }

    const entries = (JSON.parse(saved) as AttemptHistoryData).entries.map(value => {
        value.timestamp = new Date(value.timestamp);
        return value;
    });

    await sleep(200);
    return {entries: entries};
}

export async function mockGetSolutionOfTheDay(): Promise<string | undefined> {
    console.log(`MOCK API CALL: solution of the day`);
    return await canAccessSolution() ? "tudom" : undefined;
}

;(window as any)["clearAttemptHistory"] = () => {
    window.localStorage.removeItem(MOCK_LOCAL_STORAGE_KEY);
};

async function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function canAccessSolution(): Promise<boolean> {
    const history = (await mockGetAttempHistory());
    const noLuck = history.entries.length >= MAX_DAILY_ATTEMPTS;
    const guessedRight = !!history.entries.find(value => isCorrect(value.correctness));

    console.log("can access solution: ", noLuck || guessedRight);
    return noLuck || guessedRight;
}
