import {getDeviceID, getUserID} from "./identification";
import {LS_KEY_USER_ID} from "./config";
import {LetterCorrectness} from "../types/LetterCorrectness";

const API_ORIGIN = "localhost:8000";

export async function apiCreateUser() {
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

    return (await response.text()).split(";").map<LetterCorrectness>(value => {
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
