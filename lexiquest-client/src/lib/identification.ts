import {v4 as uuidv4} from "uuid";
import {LS_KEY_DEVICE_ID, LS_KEY_USER_ID} from "./config";

const UUID_REGEX = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$");

export function getDeviceID(): string {
    const savedId = window.localStorage.getItem(LS_KEY_DEVICE_ID);

    if (!savedId || !savedId.match(UUID_REGEX)) {
        const newId = uuidv4();
        window.localStorage.setItem(LS_KEY_DEVICE_ID, newId);
        return newId;
    }

    return savedId;
}

export function getUserID(): number | undefined {
    const savedUid = window.localStorage.getItem(LS_KEY_USER_ID);
    if (!savedUid) return undefined;

    const convertedUid = parseInt(savedUid);
    if (!convertedUid) return undefined;

    return convertedUid;
}
