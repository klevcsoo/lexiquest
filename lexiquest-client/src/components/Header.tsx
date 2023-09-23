import {useGameDayData} from "../hooks/useGameDayData";
import {Link} from "react-router-dom";

export function Header() {
    const [dayData, loadingDayData] = useGameDayData();

    return (
        <div className="sticky top-0 m-4 p-4 bg-white rounded-lg shadow-md
        flex flex-row justify-between items-center">
            <Link to="/">
                <h1 className="font-thin text-4xl text-center select-none">
                    LexiQuest
                </h1>
            </Link>
            {loadingDayData || !dayData ? (
                <h3 className="animate-pulse">Betöltés...</h3>
            ) : (
                <div className="flex flex-col justify-center items-end">
                    <p><b>{dayData.day}. nap</b></p>
                    <p>{dayData.date.toLocaleDateString()}</p>
                </div>
            )}
        </div>
    );
}
