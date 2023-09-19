import {useCallback, useEffect, useState} from "react";
import {useValidation} from "../hooks/useValidation";
import {ACCEPTABLE_CHARACTERS, CHARACTER_COUNT} from "../lib/config";
import {LetterCorrectness} from "../types/LetterCorrectness";
import {CharacterTile} from "./CharacterTile";
import {AttemptHistoryEntry} from "../types/AttemptHistoryEntry";
import {isCorrect} from "../lib/utils";

export interface WordInputProps {
    onValidation(result: AttemptHistoryEntry): void;
}

export function WordInput(props: WordInputProps) {
    const [validate, loadingValidation] = useValidation();
    const [word, setWord] = useState("");
    const [correctness, setCorrectness] = useState(
        new Array<LetterCorrectness>(CHARACTER_COUNT).fill("unknown")
    );

    const runValidation = useCallback(() => {
        validate(word).then(result => {
            props.onValidation({
                word: word,
                correctness: result,
                timestamp: new Date()
            });

            if (isCorrect(result)) {
                setCorrectness(new Array<LetterCorrectness>(word.length).fill("correct"));
            } else {
                setWord("");
                setCorrectness([]);
            }
        }).catch(console.error);
    }, [props, validate, word]);

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (loadingValidation) return;

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
    }, [loadingValidation, runValidation, word]);

    return (
        <div className={`flex flex-row gap-4 justify-center 
        ${loadingValidation ? "opacity-50 animate-pulse" : "opacity-100 animate-none"}`}>
            {(new Array(CHARACTER_COUNT).fill(null)).map((_, index) => (
                <CharacterTile key={index} value={word[index] ?? ""}
                               correctness={correctness[index]}
                               focus={word.length === index}/>
            ))}
        </div>
    );
}
