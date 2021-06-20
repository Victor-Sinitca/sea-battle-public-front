import React, {FC, useEffect} from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./Battle.module.css"
import {useDispatch, useSelector} from "react-redux";
import {actionBattleMap} from "../../redux/battleWithMan-reduсer";
import {initializeTheMapFunction} from "../../commen/logics/initializeTheMapFunction/initializeTheMapFunction";
import DeskUserWithMan from "../DeskUser/DeskUserWithMan";
import {getStartGame} from "../../redux/chat-selectors";


const Battle:FC = ()  => {
    const startGame= useSelector(getStartGame)

    const firstUserMap = startGame.gameData.FUMap;
    const secondUserMap = startGame.gameData.SUMap;
    const FUTurn = startGame.gameData.FUTurn.turn;
    const FUShips = startGame.gameData.FUShips;
    const SUShips = startGame.gameData.SUShips;


    const dispatch = useDispatch()




    return <div className={s.displayMapBattle}>
        <DeskUserWithMan firstUser={true} firstMap={firstUserMap} secondMap={secondUserMap}
                  SUShips={SUShips} FUShips={FUShips} UserTurn={FUTurn}/>

    </div>
}
export default Battle
