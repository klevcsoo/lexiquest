import {useCallback, useState} from "react";
import {LetterCorrectness} from "../types/LetterCorrectness";
import {mockValidation} from "../lib/mockApi";
import {ValidationFunction} from "../types/ValidationFunction";
import {CHARACTER_COUNT} from "../lib/config";

export function useValidation(): [ValidationFunction, boolean] {
    const [loading, setLoading] = useState(false);

    const validate = useCallback(async (word: string) => {
        setLoading(true);

        return await validateGuess(CHARACTER_COUNT, word).finally(() => {
            setLoading(false);
        });
    }, []);

    return [validate, loading];
}

async function validateGuess(charCount: number, word: string): Promise<LetterCorrectness[]> {
    const secret = "tudomány".slice(0, charCount);
    console.log("secret:", secret);
    return await mockValidation(secret, word);
}
