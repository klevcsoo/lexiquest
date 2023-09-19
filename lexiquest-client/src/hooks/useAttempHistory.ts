import {useCallback, useEffect, useState} from "react";
import {mockRetriveAttempts} from "../lib/mockApi";
import {AttemptHistoryData} from "../types/AttemptHistoryData";

export function useAttempHistory(): [AttemptHistoryData | undefined, () => void, boolean] {
    const [attemptHistory, setAttemptHistory] = useState<AttemptHistoryData>();
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(() => {
        mockRetriveAttempts()
            .then(setAttemptHistory)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return [attemptHistory, refresh, loading];
}
