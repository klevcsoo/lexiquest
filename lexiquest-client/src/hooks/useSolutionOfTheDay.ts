import {useCallback, useEffect, useState} from "react";
import {mockGetSolutionOfTheDay} from "../lib/mockApi";

export function useSolutionOfTheDay(): [string | undefined, () => void, boolean] {
    const [solution, setSolution] = useState<string>();
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(() => {
        mockGetSolutionOfTheDay()
            .then(setSolution)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return [solution, refresh, loading];
}
