import './App.css';
import React, {useEffect} from "react";
import {Redirect, Route} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import PlaceBattle from "./Components/PlaceBattle/PlaceBattle";
import {Header} from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";



import {ChatPage} from "./Components/pages/Chat/ChatPage";
import BattleRoom from "./Components/BattleRoom/BattleRoom";
import {BattleList} from "./Components/BattleLIst/BattleList";
import {getIsAuthorization} from "./redux/authHttp-selectors";
import {authMe} from "./redux/authHttp-reducer";
import {Authorization} from "./Components/Authorization/Authorization";
import {Registration} from "./Components/Registration/Registration";
import {Profile} from "./Components/Profile/Profile";
import {DragDrop} from "./Components/Grag&Drop/Drag&Drop";
import {Game} from "./Components/Game/Game";


function App() {
    const isAuthorization = useSelector(getIsAuthorization)
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
                <Route path='/placeBattleMan' render={() => <PlaceBattle/>}/>
                <Route path='/dragDrop' render={() => <DragDrop/>}/>
                <Route path='/game' render={() => <Game/>}/>
                {isAuthorization && <Route path='/profile/:userID?' render={() => <Profile/>}/>}
                {/*{isAuthorization && <Route path='/battle' render={() => <Battle/>}/>}*/}
                {isAuthorization && <Route path='/battleRoom' render={() => <BattleRoom/>}/>}
                {isAuthorization && <Route path='/chat' render={() => <ChatPage/>}/>}
                {isAuthorization && <Route path='/battleList' render={() => <BattleList/>}/>}
                <Route path='/authorization' render={() => <Authorization/>}/>
                <Route path='/registration' render={() => <Registration/>}/>
            </div>
        </div>
    );
}

export default App;
