import {useEffect, useMemo, useState} from "react";
import {useValidation} from "../hooks/useValidation";
import {useSearchParams} from "react-router-dom";
import {ACCEPTABLE_CHARACTERS, CHAR_COUNT_URL_PARAM} from "../lib/config";
import {LetterCorrectness} from "../types/LetterCorrectness";
import {CharacterTile} from "./CharacterTile";

export function WordInput() {
    const [params] = useSearchParams();
    const characterCount = useMemo(() => {
        return parseInt(params.get(CHAR_COUNT_URL_PARAM) ?? "5");
    }, [params]);

    const [validate, loadingValidation] = useValidation();
    const [word, setWord] = useState("");
    const [correctness, setCorrectness] = useState(
        new Array<LetterCorrectness>(characterCount).fill("unknown")
    );

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (loadingValidation) return;

            if (event.key === "Enter" && word.length === characterCount) {
                validate(word).then(setCorrectness).catch(console.error);
                return;
            }

            if ([...ACCEPTABLE_CHARACTERS.split(""), "Backspace"].includes(event.key)) {
                setWord(prevState => {
                    if (event.key === "Backspace") {
                        return prevState.slice(0, prevState.length - 1);
                    }

                    if (prevState.length < characterCount) {
                        return prevState + event.key;
                    }

                    return prevState;
                });
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [characterCount, loadingValidation, validate, word]);

    return (
        <div className={`flex flex-row gap-4 justify-center 
        ${loadingValidation ? "opacity-50 animate-pulse" : "opacity-100 animate-none"}`}>
            {(new Array(characterCount).fill(null)).map((_, index) => (
                <CharacterTile key={index} value={word[index] ?? ""}
                               correctness={correctness[index]}
                               focus={word.length === index}/>
            ))}
        </div>
    );
}
