import React from "react";
import s from "./DeskUser.module.css";
import Desk from "./Desk/Desk";
import DownBar from "./DownBar/DownBar";
import SetShipBar from "./SetShip/SetShipBar";


const DeskUser = (props) => {
    let shipOpponent
    if(props.SUShips.numberShips1>0||props.SUShips.numberShips2>0||
        props.SUShips.numberShips3>0||props.SUShips.numberShips4>0)
    {shipOpponent=true} else shipOpponent=false


    const toggleDeleteShip = () => {
        props.toggleDeleteShip(props.firstUser)
    }
    const lookSecondUser =()=>{
        props.toggleLookSecondUser()
    }


    return (
        <div className={s.displayDesk}>
            <div>
                <div>Field one</div>
                <div className={s.displayUser}>
                    <Desk userMap={props.firstUserMap} firstDesk={true}
                          returnToClick={props.setShipUser} toClick={true}
                          deleteShipUser={props.deleteShipUser}/>
                    {((props.firstUser&&props.settingShipUser.firstUser)||(!props.firstUser&&props.settingShipUser.secondUser))
                        ? <SetShipBar FUShips={props.FUShips} whatSetShip={props.whatSetShip}
                                      firstUserMap={props.firstUserMap}
                                      unlockForSetShip={props.unlockForSetShip} firstUser={props.firstUser}
                                      setHorizon={props.setHorizon}
                                      lockAllMap={props.lockAllMap} setWhatSetShip={props.setWhatSetShip}
                                      startGame={props.startGame}/>
                        : <DownBar userShips={props.SUShips} firstUser={props.firstUser} UserTurn ={props.UserTurn}/>
                    }
                    <div> <button onClick={lookSecondUser}>toggle look second user</button></div>
                    {((props.firstUser&&props.settingShipUser.firstUser)||(!props.firstUser&&props.settingShipUser.secondUser))
                        ? <div>
                            <button onClick={toggleDeleteShip} className={props.deleteShipUser ?
                                s.deleteShipButtonActive :
                                s.deleteShipButtonDizActive}>delete ship
                            </button>

                        </div>
                        : null
                    }

                </div>
            </div>
            <div>
                {(!props.settingShipUser.firstUser && !props.settingShipUser.secondUser) ?
                    <div>
                        <div>Field two</div>
                        <div className={s.displayUser}>
                            <Desk userMap={props.secondUserMap} firstDesk={false}
                                  returnToClick={props.setShotUser} toClick={shipOpponent? props.UserTurn :false }/>
                        </div>
                        {!shipOpponent?
                            <div> WIIIIIIN  </div>
                            :null
                        }
                    </div>
                    :
                    <div>
                        This place is for the second player's map
                    </div>
                }
            </div>
        </div>
    )
}
export default DeskUser