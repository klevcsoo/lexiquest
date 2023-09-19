import {useCallback, useEffect, useState} from "react";
import {useValidation} from "../hooks/useValidation";
import {ACCEPTABLE_CHARACTERS, CHARACTER_COUNT} from "../lib/config";
import {LetterCorrectness} from "../types/LetterCorrectness";
import {CharacterTile} from "./CharacterTile";
import {isCorrect} from "../lib/utils";
import {useSolutionOfTheDay} from "../hooks/useSolutionOfTheDay";

export interface WordInputProps {
    onValidation(isCorrect: boolean): void;
}

export function WordInput(props: WordInputProps) {
    const [validate, loadingValidation] = useValidation();
    const [solution, loadingSolution] = useSolutionOfTheDay();

    const [word, setWord] = useState("");
    const [correctness, setCorrectness] = useState<LetterCorrectness[]>([]);
    const [disabled, setDisabled] = useState(false);

    const runValidation = useCallback(() => {
        validate(word).then(result => {
            const allCorrect = isCorrect(result.correctness);
            props.onValidation(allCorrect);

            setCorrectness(allCorrect ? result.correctness : []);
            setWord(prevState => allCorrect ? prevState : "");
        }).catch(console.error);
    }, [props, validate, word]);

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (loadingValidation || disabled) return;

            if (event.key === "Enter" && word.length === CHARACTER_COUNT) {
                runValidation();
                return;
            }

            if ([...ACCEPTABLE_CHARACTERS.split(""), "Backspace"].includes(event.key)) {
                setWord(prevState => {
                    if (event.key === "Backspace") {
                        return prevState.slice(0, prevState.length - 1);
                    }

                    if (prevState.length < CHARACTER_COUNT) {
                        return prevState + event.key;
                    }

                    return prevState;
                });
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [loadingValidation, runValidation, disabled, word]);

    useEffect(() => {
        if (!!solution) {
            setWord(solution);
            setCorrectness(new Array<LetterCorrectness>(solution.length).fill("correct"));
            setDisabled(true);
        } else {
            setWord("");
            setCorrectness([]);
            setDisabled(false);
        }
    }, [solution]);

    return (
        <div className={`flex flex-row gap-4 justify-center 
        ${loadingValidation || loadingSolution || disabled ?
            "opacity-50 animate-pulse" : "opacity-100 animate-none"
        }`}>
            {(new Array(CHARACTER_COUNT).fill(null)).map((_, index) => (
                <CharacterTile key={index} value={word[index] ?? ""}
                               correctness={correctness[index]}
                               focus={word.length === index}/>
            ))}
        </div>
    );
}
