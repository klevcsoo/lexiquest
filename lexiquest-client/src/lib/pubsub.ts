import {AttemptHistoryData} from "../types/AttemptHistoryData";
import {apiGetAttemptHistory, apiGetWordOfTheDay} from "./api";

type AttemptHistoryListener = (attemptHistory: AttemptHistoryData) => void
const attemptHistoryListeners: AttemptHistoryListener[] = [];
let attemptHistory: AttemptHistoryData = {
    entries: []
};

export function onAttemptHistory(callback: AttemptHistoryListener) {
    attemptHistoryListeners.push(callback);
    callback(attemptHistory);
}

export function offAttemptHistory(callback: AttemptHistoryListener) {
    const i = attemptHistoryListeners.indexOf(callback);
    attemptHistoryListeners.splice(i, 1);
}

export function updateAttemptHistory() {
    apiGetAttemptHistory().then(value => {
        attemptHistory = value;
        attemptHistoryListeners.forEach(callback => callback(attemptHistory));
    }).catch(console.error);
}

updateAttemptHistory();

type SolutionListener = (solution: string | undefined) => void
const solutionListeners: SolutionListener[] = [];
let solution: string | undefined = undefined;

export function onSolution(callback: SolutionListener) {
    solutionListeners.push(callback);
    callback(solution);
}

export function offSolution(callback: SolutionListener) {
    const i = solutionListeners.indexOf(callback);
    solutionListeners.splice(i, 1);
}

export function updateSolution() {
    apiGetWordOfTheDay().then(value => {
        solution = value;
        solutionListeners.forEach(callback => callback(solution));
    }).catch(console.error);
}

updateSolution();
