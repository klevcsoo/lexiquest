import {useCallback, useState} from "react";
import {ValidationFunction} from "../types/ValidationFunction";
import {apiValidation} from "../lib/api";

export function useValidation(): [ValidationFunction, boolean] {
    const [loading, setLoading] = useState(false);

    const validate = useCallback<ValidationFunction>(async (word: string) => {
        setLoading(true);
        return {
            correctness: await apiValidation(word).finally(() => setLoading(false))
        };
    }, []);

    return [validate, loading];
}
