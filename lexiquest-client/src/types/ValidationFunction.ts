import {ValidationResult} from "./ValidationResult";

export type ValidationFunction = (word: string) => Promise<ValidationResult>
