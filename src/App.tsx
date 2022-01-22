import './App.css';
import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import PlaceBattle from "./Components/PlaceBattle/PlaceBattle";
import {Header} from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";

import {ChatPage} from "./Components/pages/Chat/ChatPage";
import BattleRoom from "./Components/BattleRoom/BattleRoom";
import {BattleList} from "./Components/BattleLIst/BattleList";
import {getIsAuthorization, getIsLoading} from "./redux/authHttp-selectors";
import {actionAuth, refreshAPI, setAuth} from "./redux/authHttp-reducer";
import {Authorization} from "./Components/Authorization/Authorization";
import {Registration} from "./Components/Registration/Registration";
import {Profile} from "./Components/Profile/Profile";
import {ThreeInLineContainer} from "./Components/ThreeInLine/ThreeInLineContainer";
import {Users} from "./Components/Users/Users";
import Preloader1 from "./commen/Preloader1/Preloader1";



function App() {
    const isAuthorization = useSelector(getIsAuthorization)
    const isLoading= useSelector(getIsLoading)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setAuth())
    }, [])


    if(isLoading){
        return <Preloader1/>
    }

    return (
        <div className="displayApp">
            <div className="displayHeader"><Header/></div>
            <div className="displayNavBar"><NavBar/></div>
            <div className="displayPlace">
                <Route path='/placeBattleMan' render={() => <PlaceBattle/>}/>
                <Route path='/game' render={() => <ThreeInLineContainer/>}/>
                {isAuthorization && <Route path='/profile/:userID?' render={() => <Profile/>}/>}
                {isAuthorization && <Route path='/battleRoom' render={() => <BattleRoom/>}/>}
                {isAuthorization && <Route path='/chat' render={() => <ChatPage/>}/>}
                {isAuthorization && <Route path='/battleList' render={() => <BattleList/>}/>}
                {isAuthorization && <Route path='/users' render={() => <Users/>}/>}
                <Route path='/authorization' render={() => <Authorization/>}/>
                <Route path='/registration' render={() => <Registration/>}/>
            </div>
        </div>
    );
}

export default App;
