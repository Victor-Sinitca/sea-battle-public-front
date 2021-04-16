import React from "react";
import s from "./SetShipBar.module.css";
import SetShip from "./SetShip/SetShip1";
import ship1 from "../../../assets/img/1.png"
import ship2 from "../../../assets/img/20.png"
import ship3 from "../../../assets/img/3.png"
import ship4 from "../../../assets/img/40.png"
import {useDispatch} from "react-redux";
import {lockAllMap, setWhatSetShip, startGame} from "../../../redux/battleMap-reduсer";



const SetShipBar = (props) => {
    const dispatch = useDispatch()

    const SetShip1 = () => {
        dispatch(lockAllMap(props.firstUser))
        dispatch(setWhatSetShip(1, props.firstUser))
    }
    const SetShip2 = () => {
        dispatch(lockAllMap(props.firstUser))
        dispatch(setWhatSetShip(2, props.firstUser))
    }
    const SetShip3 = () => {
        dispatch(lockAllMap(props.firstUser))
        dispatch(setWhatSetShip(3, props.firstUser))
    }
    const SetShip4 = () => {
        dispatch(lockAllMap(props.firstUser))
        dispatch(setWhatSetShip(4, props.firstUser))
    }

    const startGameDispatch = () => {
        dispatch(startGame(props.firstUser))
    }



    return <div className={s.displaySetShip}>
        <div >
            <div className={s.ship1}>
                <div>
                    <button disabled={!props.FUShips.ship1} onClick={SetShip1}
                            className={props.whatSetShip === 1 ? s.active : s.deActive}>
                        <img className={s.ship}  src={ship1} alt="no img"/>
                    </button>
                </div>
                <div className={s.number}> {props.FUShips.ship1} </div>
            </div>
            <div className={s.ship2}>
                <div>
                    <button disabled={!props.FUShips.ship2} onClick={SetShip2}
                            className={props.whatSetShip === 2 ? s.active : s.deActive}>
                        <img className={s.ship}  src={ship2} alt="no img"/>
                    </button>
                </div>
                <div className={s.number}> {props.FUShips.ship2} </div>
            </div>
            <div className={s.ship3}>
                <div>
                    <button disabled={!props.FUShips.ship3} onClick={SetShip3}
                            className={props.whatSetShip === 3 ? s.active : s.deActive}>
                        <img className={s.ship}  src={ship3} alt="no img"/>
                    </button>
                </div>
                <div className={s.number}> {props.FUShips.ship3} </div>
            </div>
            <div className={s.ship4}>
                <div>
                    <button disabled={!props.FUShips.ship4} onClick={SetShip4}
                            className={props.whatSetShip === 4 ? s.active : s.deActive}>
                        <img className={s.ship}  src={ship4} alt="no img"/>
                    </button>
                </div>
                <div className={s.number}> {props.FUShips.ship4} </div>
            </div>
        </div>
        {(props.FUShips.ship1 || props.FUShips.ship2 || props.FUShips.ship3 || props.FUShips.ship4)
            ? <div>
                <SetShip ship={props.whatSetShip} firstUserMap={props.firstUserMap}
                         firstUser={props.firstUser}/>
            </div>
            :
            <div className={s.startGameButton}>
                <button  onClick={startGameDispatch}> Start game</button>
            </div>
        }
    </div>
}
export default SetShipBar;