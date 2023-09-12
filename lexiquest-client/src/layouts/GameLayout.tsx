import {WordInput} from "../components/WordInput";
import {useState} from "react";
import {AttemptHistoryEntry} from "../types/AttemptHistoryEntry";
import {AttemptHistory} from "../components/AttemptHistory";
import {MAX_DAILY_ATTEMPTS} from "../lib/config";

export function GameLayout() {
    const [history, setHistory] = useState<AttemptHistoryEntry[]>([]);
    const [attempt, setAttempt] = useState(1);

    return (
        <div className="w-full p-12 flex flex-col gap-8">
            <p className="text-xl">
                <b>{attempt}</b> / {MAX_DAILY_ATTEMPTS}
            </p>
            <WordInput onValidation={result => {
                if (result.correctness.every(value => value === "correct")) {
                    console.log("done");
                    return;
                }

                setAttempt(prevState => prevState + 1);
                setHistory(prevState => {
                    if (!prevState.find(value => value.timestamp === result.timestamp)) {
                        prevState.push(result);
                    }
                    return prevState;
                });
            }}/>
            <AttemptHistory history={history}/>
        </div>
    );
}
