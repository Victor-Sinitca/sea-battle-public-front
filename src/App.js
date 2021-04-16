import './App.css';
import React from "react";
import {Route} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import PlaceBattle from "./Components/PlaceBattle/PlaceBattle";

function App() {
    return (
        <div className="displayApp">
            <div className="displayHeader"> Header</div>
            <NavBar/>
            <div className="displayPlace">
                <Route path='/placeBattleMan' render={()=><PlaceBattle/>}/>
            </div>
        </div>
    );
}

export default App;
