import {Button} from "../components/Button";
import {Link} from "react-router-dom";
import {useAuthentication} from "../hooks/useAuthentication";

export function MenuLayout() {
    const loadingAuth = useAuthentication();

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        flex flex-col items-center justify-center gap-8">
            <h1 className="font-thin text-6xl text-center select-none">
                LexiQuest
            </h1>
            {loadingAuth ? (
                <h1 className="text-3xl animate-pulse">Betöltés...</h1>
            ) : (
                <Link to="/game" className="w-full">
                    <Button text="Játék indítása"/>
                </Link>
            )}
        </div>
    );
}
