import './App.css';
import React, {useEffect} from "react";
import {Redirect, Route} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import PlaceBattle from "./Components/PlaceBattle/PlaceBattle";
import {Authorization} from "./Components/Authorization/Authorization";
import {Header} from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {authMe} from "./redux/auth-reducer";
import {FirstAuthorization} from "./Components/FirstAuthorization/FirstAuthorization";
import {getAuthorization} from "./redux/auth-selectors";

function App() {
    const authorization = useSelector(getAuthorization)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMe())
    }, [])


    return (
        <div className="displayApp">
            <div className="displayHeader"><Header/></div>
            <NavBar/>
            <div className="displayPlace">
                <Route path='/' render={() => <Redirect to={"/placeBattleMan"}/>}/>
                {authorization && <Route path='/placeBattleMan' render={() => <PlaceBattle/>}/>}
                <Route path='/authorization' render={() => <Authorization/>}/>
                <Route path='/firstAuthorization' render={() => <FirstAuthorization/>}/>
            </div>
        </div>
    );
}

export default App;
