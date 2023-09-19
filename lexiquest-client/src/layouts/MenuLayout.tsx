import {Button} from "../components/Button";
import {Link} from "react-router-dom";
import {CharCountInput} from "../components/CharCountInput";
import {useState} from "react";
import {CHAR_COUNT_URL_PARAM} from "../lib/config";

export function MenuLayout() {
    const [charCount, setCharCount] = useState(5);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        flex flex-col items-center justify-center gap-4">
            <h1 className="font-thin text-6xl text-center mb-12 select-none">
                LexiQuest
            </h1>
            <p className={"text-center"}>Betűk száma</p>
            <CharCountInput value={charCount} onAdd={addition => {
                setCharCount(prevState => Math.max(Math.min(prevState + addition, 24), 3));
            }}/>
            <Link to={`/game?${CHAR_COUNT_URL_PARAM}=${charCount}`} className="w-full">
                <Button text="Játék indítása"/>
            </Link>
        </div>
    );
}
