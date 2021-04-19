import React from "react";
import s from "./DeskUser.module.css";
import Desk from "./Desk/Desk";
import ShipBar from "./ShipBar/ShipBar";
import SetShipBar from "./SetShipBar/SetShipBar";
import user from "../../assets/img/human-head.png";
import user1 from "../../assets/img/human-head1.png";
import compPhoto from "../../assets/img/intelligence-brain.png";
import {useDispatch, useSelector} from "react-redux";
import {
    clearTheMap,
    deleteShipOnMap,
    setShipsRandom, setShipUser,setShotUser, startNewGame,
    toggleDeleteShip, toggleGameWithComp,
    toggleLookSecondUser
} from "../../redux/battleMap-reduсer";


const DeskUser = (props) => {
    const comp = useSelector(state => state.battleMap.comp);
    const settingShipUser = useSelector(state => state.battleMap.settingShipUser);
    const dispatch = useDispatch()
    const shipOpponent = props.SUShips.numberShips1 > 0 || props.FUShips.numberShips2 > 0 ||
        props.SUShips.numberShips3 > 0 || props.SUShips.numberShips4 > 0;
    const yourShips = props.FUShips.numberShips1 > 0 || props.FUShips.numberShips2 > 0 ||
        props.FUShips.numberShips3 > 0 || props.FUShips.numberShips4 > 0;

    const returnToClick = (sector) => {
        props.deleteShipUser?
            dispatch(deleteShipOnMap(sector,props.firstUser))
            :
            dispatch(setShipUser(sector,props.firstUser))
    }
    const setShotUserDispatch = (sector) => {dispatch(setShotUser(sector,props.firstUser))}
    const toggleDeleteShipDispatch = () => {
        dispatch(toggleDeleteShip(props.firstUser))
    }
    const lookSecondUserDispatch = () => {
        dispatch(toggleLookSecondUser())
    }
    const setShipsRandomDispatch = () => {
        dispatch(setShipsRandom(props.firstUser, props.firstMap))
       /* dispatch(RandomSaga(props.firstUser, props.firstMap))*/
    }
    const clearMapDispatch = () => {
        dispatch(clearTheMap(props.firstUser))
    }
    const compGameDispatch = () => {
        dispatch(toggleGameWithComp())
    }
    const startNewGameDispatch = () => {
        dispatch(startNewGame());
    }

    return (
        <div className={yourShips ? !shipOpponent ? s.displayDeskWinn : s.displayDesk : s.displayDeskLoss}>
            <div className={s.displayDesk1}>
                <div className={s.header}>Field one</div>
                <div className={s.displayUser}>
                    <Desk userMap={props.firstMap} firstDesk={true} shipOpponent={shipOpponent}
                          yourShips={yourShips}
                          returnToClick={returnToClick} toClick={true}
                          deleteShipUser={props.deleteShipUser} UserTurn={props.UserTurn}/>
                    {((props.firstUser && settingShipUser.firstUser) || (!props.firstUser && settingShipUser.secondUser))
                        ? <SetShipBar FUShips={props.FUShips} whatSetShip={props.whatSetShip} firstUser={props.firstUser}/>
                        : <ShipBar userShips={props.SUShips} firstUser={props.firstUser} UserTurn={props.UserTurn}/>
                    }
                    <div>
                        <button className={s.toggleLook} onClick={lookSecondUserDispatch}>show second user</button>
                    </div>
                    {((props.firstUser && settingShipUser.firstUser) || (!props.firstUser && settingShipUser.secondUser))
                        ? <div>
                            {props.deleteShipUser ?
                                <button onClick={toggleDeleteShipDispatch} className={s.deleteShipButtonActive}>click to ship</button>
                                :
                                <button onClick={toggleDeleteShipDispatch} className={s.deleteShipButtonDizActive}>delete ship</button>
                            }
                          </div>
                        : <div>
                            {!shipOpponent &&
                                <button onClick={startNewGameDispatch} className={s.endGameWin}> you WIN start new  game </button>}
                            {!yourShips &&
                                <button onClick={startNewGameDispatch}className={s.endGameLose}> you are lose start new game </button>}
                        </div>
                    }
                </div>
            </div>
            <div className={s.displayDesk2}>
                {(!settingShipUser.firstUser && !settingShipUser.secondUser) ?
                    <div>
                        <div className={s.header}>Field two</div>
                        <div className={s.displayUser}>
                            <Desk userMap={props.secondMap} firstDesk={false} UserTurn={props.UserTurn}
                                  returnToClick={setShotUserDispatch} toClick={shipOpponent ? props.UserTurn : false}
                                  shipOpponent={shipOpponent} yourShips={yourShips}/>
                        </div>
                        <div>
                            <button onClick={startNewGameDispatch} >reset the game</button>
                        </div>
                    </div>
                    :
                    ((props.firstUser && settingShipUser.firstUser) || (!props.firstUser && settingShipUser.secondUser))
                        ? <div className={s.buttonHeader}>
                            <div className={s.button1}>
                                <button onClick={setShipsRandomDispatch}>set ships random</button>
                            </div>
                            <div className={s.button1}>
                                <button onClick={clearMapDispatch}>clear map</button>
                            </div>
                            {}
                            <div className={s.button1}>
                                {comp.game ?
                                    <button className={s.button1} onClick={compGameDispatch}>
                                        <img className={s.userImg}  src={user} alt="no img"/>
                                        VS
                                        <img className={s.userImg}  src={compPhoto} alt="no img"/>
                                    </button>
                                    :
                                    <button className={s.button1} onClick={compGameDispatch}>
                                        <img className={s.userImg}  src={user} alt="no img"/>
                                        VS
                                        <img className={s.userImg}  src={user1} alt="no img"/>
                                    </button>
                                }
                            </div>
                        </div>
                        :
                        <div className={s.header}> Waiting for the second user</div>
                }
            </div>
        </div>
    )
}
export default DeskUser