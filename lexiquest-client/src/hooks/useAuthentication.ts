import {useEffect, useState} from "react";
import {apiCreateUser} from "../lib/api";

export function useAuthentication(): boolean {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiCreateUser().then(() => {
            console.log("Authenticated.");
        }).catch(console.error).finally(() => {
            setLoading(false);
        });
    }, []);

    return loading;
}
