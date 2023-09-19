import {useCallback, useState} from "react";
import {LetterCorrectness} from "../types/LetterCorrectness";
import {mockValidation} from "../lib/mockApi";
import {useSearchParams} from "react-router-dom";
import {CHAR_COUNT_URL_PARAM} from "../lib/config";
import {ValidationFunction} from "../types/ValidationFunction";

export function useValidation(): [ValidationFunction, boolean] {
    const [params] = useSearchParams();
    const [loading, setLoading] = useState(false);

    const validate = useCallback(async (word: string) => {
        setLoading(true);

        const len = parseInt(params.get(CHAR_COUNT_URL_PARAM) ?? "5");
        return await validateGuess(len, word).finally(() => {
            setLoading(false);
        });
    }, [params]);

    return [validate, loading];
}

async function validateGuess(charCount: number, word: string): Promise<LetterCorrectness[]> {
    const secret = "tudomány".slice(0, charCount);
    console.log("secret:", secret);
    return await mockValidation(secret, word);
}
