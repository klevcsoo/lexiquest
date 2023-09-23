import {Fragment} from "react";
import {Header} from "../components/Header";
import {Legend} from "../components/Legend";
import {GameBoard} from "../components/GameBoard";

export function GameLayout() {
    return (
        <Fragment>
            <Header/>
            <div className="grid grid-rows-1 grid-cols-[20rem_auto]">
                <Legend/>
                <GameBoard/>
            </div>
        </Fragment>
    );
}
