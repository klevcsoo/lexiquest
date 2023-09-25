import {getDeviceID, getUserID} from "./identification";
import {LS_KEY_USER_ID, USE_MOCK_API} from "./config";
import {LetterCorrectness} from "../types/LetterCorrectness";
import {
    mockGetAttempHistory,
    mockGetGameDay,
    mockGetSolutionOfTheDay,
    mockValidation
} from "./mockApi";
import {AttemptHistoryData} from "../types/AttemptHistoryData";
import {GameDayData} from "../types/GameDayData";

const API_ORIGIN = "localhost:8000";

export async function apiCreateUser() {
    if (USE_MOCK_API) return;

    const query = new URLSearchParams({
        "user_name": getDeviceID()
    });

    const response = await fetch(`http://${API_ORIGIN}/create-user?${query}`, {
        method: "POST"
    });

    if (!response.ok) {
        throw new Error(`Authentication Error: ${JSON.stringify(await response.json())}`);
    }

    const uid = await response.text();
    window.localStorage.setItem(LS_KEY_USER_ID, uid);
}

export async function apiValidation(guess: string): Promise<LetterCorrectness[]> {
    if (USE_MOCK_API) {
        return mockValidation("tudom", guess);
    }

    const uid = getUserID();
    if (!uid) {
        throw new Error("Authentication Error: User ID missing");
    }

    const response = await fetch(`http://${API_ORIGIN}/validate/`, {
        method: "POST",
        body: JSON.stringify({
            uid: uid,
            word: guess
        }),
        headers: {"Content-Type": "application/json"}
    });

    if (!response.ok) {
        throw new Error(`Validation Error: ${JSON.stringify(await response.json())}`);
    }

    return validationFromResponse(await response.text());
}

export async function apiGetAttemptHistory(): Promise<AttemptHistoryData> {
    if (USE_MOCK_API) {
        return mockGetAttempHistory();
    }

    const uid = getUserID();
    if (!uid) {
        throw new Error("Authentication Error: User ID missing");
    }
    const query = new URLSearchParams({
        "uid": String(uid)
    });

    const response = await fetch(`http://${API_ORIGIN}/get-current-day?${query}`, {
        method: "GET"
    });

    if (!response.ok) {
        throw new Error(`Validation Error: ${JSON.stringify(await response.json())}`);
    }

    const data: AttemptHistoryData = {entries: []};
    Array.from(await response.json()).forEach((entry: any) => {
        data.entries.push({
            word: entry["guess"],
            timestamp: new Date(entry["date"]),
            correctness: validationFromResponse(entry["result"])
        });
    });

    return data;
}

export async function apiGetWordOfTheDay(): Promise<string | undefined> {
    if (USE_MOCK_API) {
        return mockGetSolutionOfTheDay();
    }

    const uid = getUserID();
    if (!uid) {
        throw new Error("Authentication Error: User ID missing");
    }
    const query = new URLSearchParams({
        "uid": String(uid)
    });

    const response = await fetch(`http://${API_ORIGIN}/get-daily-word?${query}`, {
        method: "GET"
    });

    if (!response.ok) {
        return undefined;
    }

    return await response.text();
}

export async function apiGetGameDay(): Promise<GameDayData> {
    if (USE_MOCK_API) {
        return mockGetGameDay();
    }

    const response = await fetch(`http://${API_ORIGIN}/get-current-day`, {
        method: "GET"
    });

    return {
        day: parseInt(await response.text()),
        date: new Date()
    };
}

function validationFromResponse(text: string): LetterCorrectness[] {
    return text.split(";").map<LetterCorrectness>(value => {
        switch (value) {
            case "1":
                return "correct";
            case "0":
                return "wrong-place";
            case "-1":
                return "incorrect";
            default:
                return "unknown";
        }
    });
}
