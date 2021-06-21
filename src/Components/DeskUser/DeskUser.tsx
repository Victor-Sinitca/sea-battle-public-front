import React, {FC, useState} from "react";
import s from "./DeskUser.module.css";
import Desk from "./Desk/Desk";
import ShipBar from "./ShipBar/ShipBar";
import SetShipBar from "./SetShipBar/SetShipBar";
import user from "../../assets/img/human-head.png";
import user1 from "../../assets/img/human-head1.png";
import compPhoto from "../../assets/img/intelligence-brain.png";
import {useDispatch} from "react-redux";
import {actionBattleMap, setShipsRandom,} from "../../redux/battleMap-reduсer";
import {compType, MapsType, SectorType, settingShipUserType, ShipsType} from "../../../Types/Types";
import {startGameUserOnWS} from "../../redux/chat-reducer";

type PropsType = {
    firstUser: boolean
    firstMap: MapsType
    secondMap: MapsType
    SUShips: ShipsType
    FUShips: ShipsType
    whatSetShip: number
    UserTurn: boolean
    deleteShipUser: boolean
    comp: compType
    isCompGame: boolean
    settingShipUser: settingShipUserType
}
const DeskUser: FC<PropsType> = ({
                                     firstUser, firstMap, secondMap, SUShips, FUShips,
                                     UserTurn, comp, settingShipUser, isCompGame
                                 }) => {
    const dispatch = useDispatch()
    const shipOpponent = SUShips.numberShips1 > 0 || SUShips.numberShips2 > 0 ||
        SUShips.numberShips3 > 0 || SUShips.numberShips4 > 0;
    const yourShips = FUShips.numberShips1 > 0 || FUShips.numberShips2 > 0 ||
        FUShips.numberShips3 > 0 || FUShips.numberShips4 > 0;
    const [deleteShipUser,setDeleteShipUser] =useState(false)
    const [whatSetShip,setWhatSetShip] =useState(0)
    const [horizonSetShip,setHorizonSetShip] =useState(false)

    const toggleDeleteShipDispatch = (): void => {
        setDeleteShipUser(!deleteShipUser)
    }

    const handlerSetHorizonShip=(horizon: boolean)=>{
        setHorizonSetShip(horizon)
    }
    const handlerSetWhatSetShip=(ship: number)=>{
        setWhatSetShip(ship)
    }



    const returnToClick = (sector: SectorType): void => {
        deleteShipUser ?
            dispatch(actionBattleMap.deleteShipOnMap(sector, firstUser))
            :
            dispatch(actionBattleMap.setShipUser(sector, firstUser,horizonSetShip,whatSetShip))
    }
    const setShotUserDispatch = (sector: SectorType): void => {
        dispatch(actionBattleMap.setShotUser(sector, firstUser))
    }
    const lookSecondUserDispatch = (): void => {
        dispatch(actionBattleMap.toggleLookSecondUser())
    }
    const setShipsRandomDispatch = (): void => {
        dispatch(setShipsRandom(firstUser, firstMap))
        /* dispatch(RandomSaga(props.firstUser, props.firstMap))*/
    }
    const clearMapDispatch = (): void => {
        dispatch(actionBattleMap.clearTheMap(firstUser))
    }
    const compGameDispatch = (): void => {
        dispatch(actionBattleMap.toggleGameWithComp())
    }
    const startNewGameDispatch = (): void => {
        dispatch(actionBattleMap.startNewGame());
    }
    const startGameDispatch = (firstUser: boolean): void => {
        dispatch(actionBattleMap.startGame(firstUser))
    }

    return (
        <div className={yourShips ? !shipOpponent ? s.displayDeskWinn : s.displayDesk : s.displayDeskLoss}>
            <div className={s.displayDesk1}>
                <div className={s.header}>Field one</div>
                <div className={s.displayUser}>
                    <Desk userMap={firstMap} firstDesk={true} shipOpponent={shipOpponent}
                          yourShips={yourShips}
                          returnToClick={returnToClick} toClick={true}
                          deleteShipUser={deleteShipUser} UserTurn={UserTurn}/>
                    {((firstUser && settingShipUser.firstUser) || (!firstUser && settingShipUser.secondUser))
                        ? <SetShipBar FUShips={FUShips} whatSetShip={whatSetShip}
                                      firstUser={firstUser}
                                      lockAllMap={actionBattleMap.lockAllMap}
                                      setWhatSetShip={handlerSetWhatSetShip}
                                      startGame={startGameDispatch}
                                      setHorizon={handlerSetHorizonShip}
                                      unlockForSetShip={actionBattleMap.unlockForSetShip}
                        />
                        : <ShipBar userShips={SUShips} UserTurn={UserTurn}/>
                    }
                    {isCompGame&&
                    <div>
                        <button className={s.toggleLook} onClick={lookSecondUserDispatch}>show second user</button>
                    </div>
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
                        <div className={s.header}>Field two</div>
                        <div className={s.displayUser}>
                            <Desk userMap={secondMap} firstDesk={false} shipOpponent={shipOpponent}
                                  yourShips={yourShips}
                                  returnToClick={setShotUserDispatch} toClick={shipOpponent ? UserTurn : false}
                                  deleteShipUser={deleteShipUser} UserTurn={UserTurn}/>
                        </div>
                        <div>
                            {comp.game && <button onClick={startNewGameDispatch}>reset the game</button>}
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
                            {isCompGame &&
                                <div className={s.button1}>
                                    {comp.game ?
                                        <button className={s.button1} onClick={compGameDispatch}>
                                            <img className={s.userImg} src={user} alt="no img"/>
                                            VS
                                            <img className={s.userImg} src={compPhoto} alt="no img"/>
                                        </button>
                                        :
                                        <button className={s.button1} onClick={compGameDispatch}>
                                            <img className={s.userImg} src={user} alt="no img"/>
                                            VS
                                            <img className={s.userImg} src={user1} alt="no img"/>
                                        </button>
                                    }
                                </div>
                            }
                        </div>
                        :
                        <div className={s.header}> Waiting for the second user</div>
                }
            </div>
        </div>
    )
}
export default DeskUser
