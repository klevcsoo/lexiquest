import {useEffect, useState} from "react";
import {offSolution, onSolution} from "../lib/pubsub";

export function useSolutionOfTheDay(): [string | undefined, boolean] {
    const [solution, setSolution] = useState<string>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handler = (solution: string | undefined) => {
            setSolution(solution);
            setLoading(false);
        };

        onSolution(handler);
        return () => offSolution(handler);
    }, []);

    return [solution, loading];
}
