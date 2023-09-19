import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MenuLayout} from "./layouts/MenuLayout";
import {GameLayout} from "./layouts/GameLayout";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<MenuLayout/>}/>
                <Route path={"/game"} element={<GameLayout/>}/>
            </Routes>
        </BrowserRouter>
    );
}
