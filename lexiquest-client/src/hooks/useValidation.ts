import {useCallback, useState} from "react";
import {LetterCorrectness} from "../types/LetterCorrectness";
import {mockValidation} from "../lib/mockValidation";
import {useSearchParams} from "react-router-dom";

export function useValidation() {
    const [params] = useSearchParams();
    const [loading, setLoading] = useState(false);

    const validate = useCallback(async (word: string) => {
        setLoading(true);

        const len = parseInt(params.get("length") ?? "5");
        return await validateGuess(len, word).finally(() => {
            setLoading(false);
        });
    }, [params]);

    return [validate, loading];
}

async function validateGuess(length: number, word: string): Promise<LetterCorrectness[]> {
    return await mockValidation("tudomány".slice(0, length), word);
}
