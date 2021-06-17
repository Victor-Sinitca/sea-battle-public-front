import React, {FC} from "react";
import s from "./DeskUser.module.css";
import Desk from "./Desk/Desk";
import ShipBar from "./ShipBar/ShipBar";
import SetShipBar from "./SetShipBar/SetShipBar";
import {useDispatch} from "react-redux";
import {actionBattleMap, setShipsRandom,} from "../../redux/battleWithMan-reduсer";
import {compType, MapsType, SectorType, settingShipUserType, ShipsType} from "../../../Types/Types";

type PropsType = {
    firstUser: boolean
    firstMap: MapsType
    secondMap: MapsType
    SUShips: ShipsType
    FUShips: ShipsType
    whatSetShip: number
    UserTurn: boolean
    deleteShipUser: boolean

    settingShipUser: settingShipUserType
}
const DeskUserWithMan: FC<PropsType> = ({
                                     firstUser, firstMap, secondMap, SUShips, FUShips, whatSetShip,
                                     UserTurn, deleteShipUser,  settingShipUser,
                                 }) => {
    const dispatch = useDispatch()
    const shipOpponent = SUShips.numberShips1 > 0 || SUShips.numberShips2 > 0 ||
        SUShips.numberShips3 > 0 || SUShips.numberShips4 > 0;
    const yourShips = FUShips.numberShips1 > 0 || FUShips.numberShips2 > 0 ||
        FUShips.numberShips3 > 0 || FUShips.numberShips4 > 0;

    const returnToClick = (sector: SectorType): void => {
        deleteShipUser ?
            dispatch(actionBattleMap.deleteShipOnMap(sector, firstUser))
            :
            dispatch(actionBattleMap.setShipUser(sector, firstUser))
    }
    const setShotUserDispatch = (sector: SectorType): void => {
        dispatch(actionBattleMap.setShotUser(sector, firstUser))
    }
    const toggleDeleteShipDispatch = (): void => {
        dispatch(actionBattleMap.toggleDeleteShip(firstUser))
    }

    const setShipsRandomDispatch = (): void => {
        dispatch(setShipsRandom(firstUser, firstMap))
        /* dispatch(RandomSaga(props.firstUser, props.firstMap))*/
    }
    const clearMapDispatch = (): void => {
        dispatch(actionBattleMap.clearTheMap(firstUser))
    }
    const startNewGameDispatch = (): void => {
        dispatch(actionBattleMap.startNewGame());
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
                                      setWhatSetShip={actionBattleMap.setWhatSetShip}
                                      startGame={actionBattleMap.startGame}
                                      setHorizon={actionBattleMap.setHorizon}
                                      unlockForSetShip={actionBattleMap.unlockForSetShip}/>
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
                        <div className={s.header}>Field two</div>
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