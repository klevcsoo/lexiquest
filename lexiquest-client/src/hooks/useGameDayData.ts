import {GameDayData} from "../types/GameDayData";
import {useEffect, useState} from "react";
import {mockGetGameDay} from "../lib/mockApi";

export function useGameDayData(): [GameDayData | undefined, boolean] {
    const [dayData, setDayData] = useState<GameDayData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        mockGetGameDay().then(setDayData).catch(console.error).finally(() => {
            setLoading(false);
        });
    }, []);

    return [dayData, loading];
}
