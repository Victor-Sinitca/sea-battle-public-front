import './App.css';
import React from "react";
import {Redirect, Route} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import PlaceBattle from "./Components/PlaceBattle/PlaceBattle";
import {Authorization} from "./Components/Authorization/Authorization";

function App() {
    return (
        <div className="displayApp">
            <div className="displayHeader"> Header</div>
            <NavBar/>
            <div className="displayPlace">
                <Route path='/' render={()=><Redirect to={"/placeBattleMan"}/>}/>
                <Route path='/placeBattleMan' render={()=><PlaceBattle/>}/>
                <Route path='/authorization' render={()=><Authorization/>}/>
            </div>
        </div>
    );
}

export default App;
