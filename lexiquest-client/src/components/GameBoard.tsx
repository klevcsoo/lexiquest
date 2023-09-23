import {WordInput} from "./WordInput";
import {AttemptHistory} from "./AttemptHistory";
import {useAttempHistory} from "../hooks/useAttempHistory";
import {useMemo} from "react";
import {MAX_DAILY_ATTEMPTS} from "../lib/config";

export function GameBoard() {
    const [attemptHistory, loadingAttemptHistory] = useAttempHistory();
    const remaningAttempts = useMemo<number | undefined>(() => {
        return !!attemptHistory ? MAX_DAILY_ATTEMPTS - attemptHistory.entries.length : undefined;
    }, [attemptHistory]);

    return loadingAttemptHistory || !attemptHistory ? (
        <div className="w-screen h-screen grid place-content-center">
            <h1 className="text-3xl animate-pulse">Betöltés...</h1>
        </div>
    ) : (
        <div className="w-full p-12 flex flex-col gap-8">
            <p className="text-3xl text-center">
                {!remaningAttempts ? (
                    <span>a helyes szó volt:</span>
                ) : (
                    <span>még <b>{remaningAttempts}</b> próbálkozás</span>
                )}
            </p>
            <WordInput onValidation={() => {
            }}/>
            <AttemptHistory attemptHistory={attemptHistory}/>
        </div>
    );
}
