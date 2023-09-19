import {LetterCorrectness} from "../types/LetterCorrectness";
import {GameDayData} from "../types/GameDayData";

import {AttemptHistoryData} from "../types/AttemptHistoryData";

const MOCK_START_DATE = new Date("2023-08-25");
const MOCK_LOCAL_STORAGE_KEY = "attempt_history";

/**
 * Ez csak egy mock függvény ami imitálja a validációs API választ.
 * @param secret a titkos szó
 * @param guess a felhasználó tipp szava
 */
export async function mockValidation(secret: string, guess: string): Promise<LetterCorrectness[]> {
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

    const attemptHistory = await mockRetriveAttempts();
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
    const today = new Date();
    const diff = (today.getTime() - MOCK_START_DATE.getTime()) / 86400000;

    await sleep(200);
    return {day: Math.ceil(diff), date: today};
}

/**
 * Mock függvény, amin visszaadja a jelenlegi próbálkozásokat.
 */
export async function mockRetriveAttempts(): Promise<AttemptHistoryData> {
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

;(window as any)["clearAttemptHistory"] = () => {
    window.localStorage.removeItem(MOCK_LOCAL_STORAGE_KEY);
};

async function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
