import {getDeviceID, getUserID} from "./identification";
import {LS_KEY_DEVICE_ID, LS_KEY_USER_ID} from "./config";

describe("ID saving & loading", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    test("device ID", () => {
        const id = getDeviceID();
        expect(window.localStorage.getItem(LS_KEY_DEVICE_ID)).toEqual(id);
    });

    test("no user ID", () => {
        expect(getUserID()).toBeUndefined();
    });

    test("invalid user ID", () => {
        window.localStorage.setItem(LS_KEY_USER_ID, "é");
        expect(getUserID()).toBeUndefined();
    });

    test("valid user ID", () => {
        window.localStorage.setItem(LS_KEY_USER_ID, "52");
        expect(getUserID()).toEqual(52);
    });
});
