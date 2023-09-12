import {AttemptHistoryEntry} from "../types/AttemptHistoryEntry";
import {MAX_DAILY_ATTEMPTS} from "../lib/config";
import {CharacterTile} from "./CharacterTile";
import {Fragment} from "react";

export interface AttemptHistoryProps {
    history: AttemptHistoryEntry[];
}

export function AttemptHistory(props: AttemptHistoryProps) {
    console.log(props.history);
    return (
        <Fragment>
            {props.history.sort((a, b) => {
                return b.timestamp.getTime() - a.timestamp.getTime();
            }).map((entry, attemptIndex, array) => (
                <div key={attemptIndex} className="flex flex-row gap-4 justify-center ">
                    <p className="text-xl">
                        <b>{array.length - attemptIndex}</b> / {MAX_DAILY_ATTEMPTS}
                    </p>
                    {entry.word.split("").map((char, characterIndex) => (
                        <CharacterTile key={`${attemptIndex}-${characterIndex}`} value={char}
                                       correctness={entry.correctness[characterIndex]}/>
                    ))}
                </div>
            ))}
        </Fragment>
    );
}
