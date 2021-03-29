import './App.css';
import React from "react";
import {Route} from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import PlaceBattleContainer from "./Components/PlaceBattle/PlaceBattleContainer";


function App() {
    return (
        <div className="displayApp">
            <div className="displayHeader"> Header</div>
            <NavBar/>
            <div className="displayPlace">
                <Route path='/placeBattleComputer' render={()=><PlaceBattleContainer/>}/>
                <Route path='/placeBattleMan' render={()=><PlaceBattleContainer/>}/>

            </div>
        </div>
    );
}

export default App;
