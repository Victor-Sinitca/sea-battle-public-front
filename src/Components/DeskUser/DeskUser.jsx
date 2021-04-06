import React from "react";
import s from "./DeskUser.module.css";
import Desk from "./Desk/Desk";
import DownBar from "./DownBar/DownBar";
import SetShipBar from "./SetShip/SetShipBar";


const DeskUser = (props) => {
    let shipOpponent = props.SUShips.numberShips1 > 0 || props.SUShips.numberShips2 > 0 ||
        props.SUShips.numberShips3 > 0 || props.SUShips.numberShips4 > 0;
    let yourShips = props.FUShips.numberShips1 > 0 || props.FUShips.numberShips2 > 0 ||
        props.FUShips.numberShips3 > 0 || props.FUShips.numberShips4 > 0;


    const toggleDeleteShip = () => {
        props.toggleDeleteShip(props.firstUser)
    }
    const lookSecondUser = () => {
        props.toggleLookSecondUser()
    }
    const setShipsRandom = () => {
        props.setShipsRandom(props.firstUser, props.firstUserMap)
    }
    const clearMap = () => {
        props.initializeTheMap(props.firstUser)
    }
    const compGame = () => {
        props.toggleGameWithComp()
    }

    return (
        <div className={yourShips ? !shipOpponent ? s.displayDeskWinn : s.displayDesk : s.displayDeskLoss}>
            <div className={s.displayDesk1}>
                <div className={s.header}>Field one</div>
                <div className={s.displayUser}>
                    <Desk userMap={props.firstUserMap} firstDesk={true} shipOpponent={shipOpponent}
                          yourShips={yourShips}
                          returnToClick={props.setShipUser} toClick={true}
                          deleteShipUser={props.deleteShipUser} UserTurn={props.UserTurn}/>
                    {((props.firstUser && props.settingShipUser.firstUser) || (!props.firstUser && props.settingShipUser.secondUser))
                        ? <SetShipBar FUShips={props.FUShips} whatSetShip={props.whatSetShip}
                                      firstUserMap={props.firstUserMap}
                                      unlockForSetShip={props.unlockForSetShip} firstUser={props.firstUser}
                                      setHorizon={props.setHorizon}
                                      lockAllMap={props.lockAllMap} setWhatSetShip={props.setWhatSetShip}
                                      startGame={props.startGame}/>
                        : <DownBar userShips={props.SUShips} firstUser={props.firstUser} UserTurn={props.UserTurn}/>
                    }
                    <div>
                        <button className={s.toggleLook} onClick={lookSecondUser}>toggle look second user</button>
                    </div>
                    {((props.firstUser && props.settingShipUser.firstUser) || (!props.firstUser && props.settingShipUser.secondUser))
                        ? <div>
                            <button onClick={toggleDeleteShip} className={props.deleteShipUser ?
                                s.deleteShipButtonActive :
                                s.deleteShipButtonDizActive}>delete ship
                            </button>
                        </div>
                        : <div>
                            {!shipOpponent ? <div className={s.endGameWin}> you WIN </div> : null}
                            {!yourShips ? <div className={s.endGameLose}> you are lose </div> : null}
                        </div>
                    }
                </div>
            </div>
            <div className={s.displayDesk2}>
                {(!props.settingShipUser.firstUser && !props.settingShipUser.secondUser) ?
                    <div>
                        <div className={s.header}>Field two</div>
                        <div className={s.displayUser}>
                            <Desk userMap={props.secondUserMap} firstDesk={false} UserTurn={props.UserTurn}
                                  returnToClick={props.setShotUser} toClick={shipOpponent ? props.UserTurn : false}
                                  shipOpponent={shipOpponent} yourShips={yourShips}/>
                        </div>
                    </div>
                    :
                    <div className={s.buttonHeader}>
                        <div className={s.button1}>
                            <button  onClick={setShipsRandom}>set ships random</button>
                        </div>
                        <div className={s.button1}>
                            <button  onClick={clearMap}>clear map</button>
                        </div >
                        {}
                        <div className={s.button1}>
                            {props.comp.game ?
                                <button className={s.button1} onClick={compGame}>click to game to man</button>
                                :
                                <button className={s.button1} onClick={compGame}>click to game to comp</button>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default DeskUser