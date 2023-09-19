import {useCallback, useState} from "react";
import {mockValidation} from "../lib/mockApi";
import {ValidationFunction} from "../types/ValidationFunction";
import {CHARACTER_COUNT} from "../lib/config";
import {ValidationResult} from "../types/ValidationResult";

export function useValidation(): [ValidationFunction, boolean] {
    const [loading, setLoading] = useState(false);

    const validate = useCallback<ValidationFunction>(async (word: string) => {
        setLoading(true);

        return await validateGuess(CHARACTER_COUNT, word).finally(() => {
            setLoading(false);
        });
    }, []);

    return [validate, loading];
}

async function validateGuess(charCount: number, word: string): Promise<ValidationResult> {
    const secret = "tudomány".slice(0, charCount);
    return {
        correctness: await mockValidation(secret, word)
    };
}
