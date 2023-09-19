import {useEffect, useState} from "react";
import {AttemptHistoryData} from "../types/AttemptHistoryData";
import {offAttemptHistory, onAttemptHistory} from "../lib/pubsub";

export function useAttempHistory(): [AttemptHistoryData | undefined, boolean] {
    const [attemptHistory, setAttemptHistory] = useState<AttemptHistoryData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handler = (data: AttemptHistoryData) => {
            setAttemptHistory(data);
            setLoading(false);
        };

        onAttemptHistory(handler);
        return () => offAttemptHistory(handler);
    }, []);

    return [attemptHistory, loading];
}
