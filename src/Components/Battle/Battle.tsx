import React, {FC} from "react";
import s from "./Battle.module.css"
import {useDispatch, useSelector} from "react-redux";
import DeskUserWithMan from "../DeskUser/DeskUserWithMan";
import {getStartGame} from "../../redux/chat-selectors";
import {getAuthUserId} from "../../redux/auth-selectors";


const Battle:FC = ()  => {
    const startGame= useSelector(getStartGame)
    const authUserId= useSelector(getAuthUserId)

    const dispatch = useDispatch()

    if(startGame === null){
        return <div></div>
    } else {
        if(authUserId===startGame.firstUser.id){
            const firstUserMap = startGame.gameData.FUMap;
            const secondUserMap = startGame.gameData.SUMap;
            const FUTurn = startGame.gameData.FUTurn.turn;
            const FUShips = startGame.gameData.FUShips;
            const SUShips = startGame.gameData.SUShips;
            const settingShipUser = startGame.gameData.settingShipUser;
            const gameId = startGame.gameId;
            const firstUserState = startGame.firstUser;
            const secondUserState = startGame.secondUser;
            return <div className={s.displayMapBattle}>
                <DeskUserWithMan firstUser={true} firstMap={firstUserMap} secondMap={secondUserMap}
                                 SUShips={SUShips} FUShips={FUShips} UserTurn={FUTurn} settingShipUser={settingShipUser}
                                 gameId={gameId} firstUserState={firstUserState} secondUserState={secondUserState} />

            </div>

        }else{
            const firstUserMap = startGame.gameData.FUMap;
            const secondUserMap = startGame.gameData.SUMap;
            const FUTurn = startGame.gameData.FUTurn.turn;
            const FUShips = startGame.gameData.FUShips;
            const SUShips = startGame.gameData.SUShips;
            const settingShipUser = startGame.gameData.settingShipUser;
            const gameId = startGame.gameId;
            const firstUserState = startGame.firstUser;
            const secondUserState = startGame.secondUser;
            return <div className={s.displayMapBattle}>
                <DeskUserWithMan firstUser={false} firstMap={secondUserMap} secondMap={firstUserMap}
                                 SUShips={FUShips} FUShips={SUShips} UserTurn={!FUTurn} settingShipUser={settingShipUser}
                                 gameId={gameId} firstUserState={secondUserState} secondUserState={firstUserState} />

            </div>


        }





    }


}
export default Battle
