import {v4 as uuidv4} from "uuid";

const UUID_REGEX = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$");
const LS_KEY_DEVICE_ID = "device_id";

export function getDeviceID(): string {
    const savedId = window.localStorage.getItem(LS_KEY_DEVICE_ID);

    if (!savedId || !savedId.match(UUID_REGEX)) {
        const newId = uuidv4();
        window.localStorage.setItem(LS_KEY_DEVICE_ID, newId);
        return newId;
    }

    return savedId;
}
