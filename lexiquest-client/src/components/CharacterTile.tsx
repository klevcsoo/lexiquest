import {LetterCorrectness} from "../types/LetterCorrectness";
import {useMemo} from "react";

export function CharacterTile(props: {
    value: string
    correctness: LetterCorrectness
    focus: boolean
}) {
    const bgColour = useMemo<string>(() => {
        switch (props.correctness) {
            case "unknown":
                return "bg-white";
            case "correct":
                return "bg-green-100";
            case "incorrect":
                return "bg-red-100";
            case "wrong-place":
                return "bg-yellow-100";
            default:
                return "bg-white";
        }
    }, [props.correctness]);

    return (
        <div className={`${bgColour} ${props.focus ? "border-blue-100" : "border-transparent"}
         w-32 h-32 shadow-xl rounded-xl border-8 grid place-content-center`}>
            <b className="text-7xl text-center font-mono uppercase">{props.value}</b>
        </div>
    );
}
