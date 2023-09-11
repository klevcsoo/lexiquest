import {Button} from "../components/Button";
import {Link} from "react-router-dom";

export function MenuLayout() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        flex flex-col items-center justify-center gap-4">
            <h1 className="font-thin text-6xl text-center mb-12 select-none">
                LexiQuest
            </h1>
            <Link to="/game" className="w-full">
                <Button text="Játék indítása"/>
            </Link>
        </div>
    );
}
