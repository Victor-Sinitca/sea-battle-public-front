import React, {FC, useState} from "react";
import s from "./DeskUser.module.css";
import Desk from "./Desk/Desk";
import ShipBar from "./ShipBar/ShipBar";
import SetShipBar from "./SetShipBar/SetShipBar";
import {useDispatch} from "react-redux";

import {MapsType, SectorType, ShipsType} from "../../../Types/Types";
import {
    actionChat, clearMapOnWS,
    deleteShipOnMapOnWS, setShipsRandomOnWS,
    setShipUserOnWS,
    setShotUserOnWS,
    startGameUserOnWS,
} from "../../redux/chat-reducer";

type PropsType = {
    firstUser: boolean
    firstMap: MapsType
    secondMap: MapsType
    SUShips: ShipsType
    FUShips: ShipsType
    UserTurn: boolean
    settingShipUser:{
        firstUser: boolean,
        secondUser: boolean,
    }
    gameId:string,
    firstUserState: {id: string, name: string}
    secondUserState: {id: string, name: string}
}
const DeskUserWithMan: FC<PropsType> = ({
                                     firstUser, firstMap, secondMap, SUShips, FUShips,
                                     UserTurn,settingShipUser,gameId,firstUserState,secondUserState
                                 }) => {
    const [deleteShipUser,setDeleteShipUser] =useState(false)
    const [whatSetShip,setWhatSetShip] =useState(0)
    const [horizonSetShip,setHorizonSetShip] =useState(false)


    const dispatch = useDispatch()
    const shipOpponent = SUShips.numberShips1 > 0 || SUShips.numberShips2 > 0 ||
        SUShips.numberShips3 > 0 || SUShips.numberShips4 > 0;
    const yourShips = FUShips.numberShips1 > 0 || FUShips.numberShips2 > 0 ||
        FUShips.numberShips3 > 0 || FUShips.numberShips4 > 0;

    const handlerSetHorizonShip=(horizon: boolean)=>{
        setHorizonSetShip(horizon)
    }
    const handlerSetWhatSetShip=(ship: number)=>{
        setWhatSetShip(ship)
    }

    const returnToClick = (sector: SectorType): void => {
        deleteShipUser ?
            dispatch(deleteShipOnMapOnWS(sector, gameId,firstUserState.id))
            :
            dispatch(setShipUserOnWS(sector, gameId,firstUserState.id,horizonSetShip,whatSetShip))
    }
    const setShotUserDispatch = (sector: SectorType): void => {
        dispatch(setShotUserOnWS(sector, gameId,firstUserState.id))
    }
    const toggleDeleteShipDispatch = (): void => {
        setDeleteShipUser(!deleteShipUser)
    }

    const setShipsRandomDispatch = (): void => {
        dispatch(setShipsRandomOnWS(gameId, firstUserState.id))
    }
    const clearMapDispatch = (): void => {
        dispatch(clearMapOnWS(gameId, firstUserState.id))
    }
    const startNewGameDispatch = (): void => {
        /*dispatch(deleteShipOnMapOnWS(sector, gameId,userState.id))*/
    }
    const startGameDispatch = (firstUser: boolean): void => {
        dispatch(startGameUserOnWS(gameId, firstUserState.id))
    }
    return (
        <div className={yourShips ? !shipOpponent ? s.displayDeskWinn : s.displayDesk : s.displayDeskLoss}>
            <div className={s.displayDesk1}>
                <div className={s.header}>{firstUserState.name}</div>
                <div className={s.displayUser}>
                    <Desk userMap={firstMap} firstDesk={true} shipOpponent={shipOpponent}
                          yourShips={yourShips}
                          returnToClick={returnToClick} toClick={true}
                          deleteShipUser={deleteShipUser} UserTurn={UserTurn}/>
                    {((firstUser && settingShipUser.firstUser) || (!firstUser && settingShipUser.secondUser))
                        ? <SetShipBar FUShips={FUShips} whatSetShip={whatSetShip}
                                      firstUser={firstUser}
                                      lockAllMap={actionChat.lockAllMap}
                                      setWhatSetShip={handlerSetWhatSetShip}
                                      startGame={startGameDispatch}
                                      setHorizon={handlerSetHorizonShip}
                                      unlockForSetShip={actionChat.unlockForSetShip}/>
                        : <ShipBar userShips={SUShips} UserTurn={UserTurn}/>
                    }
                    {((firstUser && settingShipUser.firstUser) || (!firstUser && settingShipUser.secondUser))
                        ? <div>
                            {deleteShipUser ?
                                <button onClick={toggleDeleteShipDispatch} className={s.deleteShipButtonActive}>click to
                                    ship</button>
                                :
                                <button onClick={toggleDeleteShipDispatch}
                                        className={s.deleteShipButtonDizActive}>delete ship</button>
                            }
                        </div>
                        : <div>
                            {!shipOpponent &&
                            <button onClick={startNewGameDispatch} className={s.endGameWin}> you WIN start new
                                game </button>}
                            {!yourShips &&
                            <button onClick={startNewGameDispatch} className={s.endGameLose}> you are lose start new
                                game </button>}
                        </div>
                    }
                </div>
            </div>
            <div className={s.displayDesk2}>
                {(!settingShipUser.firstUser && !settingShipUser.secondUser) ?
                    <div>
                        <div className={s.header}>{secondUserState.name}</div>
                        <div className={s.displayUser}>
                            <Desk userMap={secondMap} firstDesk={false} shipOpponent={shipOpponent}
                                  yourShips={yourShips}
                                  returnToClick={setShotUserDispatch} toClick={shipOpponent ? UserTurn : false}
                                  deleteShipUser={deleteShipUser} UserTurn={UserTurn}/>
                        </div>
                    </div>
                    :
                    ((firstUser && settingShipUser.firstUser) || (!firstUser && settingShipUser.secondUser))
                        ? <div className={s.buttonHeader}>
                            <div className={s.button1}>
                                <button onClick={setShipsRandomDispatch}>set ships random</button>
                            </div>
                            <div className={s.button1}>
                                <button onClick={clearMapDispatch}>clear map</button>
                            </div>
                        </div>
                        :
                        <div className={s.header}> Waiting for the second user</div>
                }
            </div>
        </div>
    )
}
export default DeskUserWithMan
