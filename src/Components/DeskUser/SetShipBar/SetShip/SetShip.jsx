import React from "react";
import s from "./SetShip.module.css"
import ship1 from "../../../../assets/img/1.png"
import ship2 from "../../../../assets/img/20.png"
import ship3 from "../../../../assets/img/3.png"
import ship4 from "../../../../assets/img/40.png"
import ship21 from "../../../../assets/img/201.png"
import ship31 from "../../../../assets/img/301.png"
import ship41 from "../../../../assets/img/401.png"
import {useDispatch} from "react-redux";
import {setHorizon, unlockForSetShip} from "../../../../redux/battleMap-reduсer";

const SetShip = (props) => {
    const dispatch = useDispatch()

    const setShipVertical = () => {
        dispatch(setHorizon(false, props.firstUser))
        dispatch(unlockForSetShip(props.ship, true, props.firstUser))
    }
    const setShipHorizontal = () => {
        dispatch(setHorizon(true, props.firstUser))
        dispatch(unlockForSetShip(props.ship, false, props.firstUser))
    }


    return <div className={s.displaySetShip}>
        {props.ship ?
            props.ship === 1
                ? <div className={s.displayVert}>
                    <div className={s.shipsButton}>
                        <button onClick={setShipVertical}  >
                            <img className={s.ship}  src={ship1} alt="no img"/>
                        </button>
                    </div>
                </div>
                :
                <div className={s.displayShip}>
                    <div className={s.displayVert}>
                        <div className={s.shipsButton}>
                            <button onClick={setShipVertical}>
                                    {props.ship === 2 ? <img className={s.ship}  src={ship21} alt="no img"/> : null}
                                    {props.ship === 3 ? <img className={s.ship}  src={ship31} alt="no img"/> : null}
                                    {props.ship === 4 ? <img className={s.ship}  src={ship41} alt="no img"/> : null}
                            </button>
                        </div>

                    </div>
                    <div className={s.displayHor}>
                        <div className={s.shipsButton}>
                            <button onClick={setShipHorizontal}>
                                    {props.ship === 2 ? <img className={s.ship1}  src={ship2} alt="no img"/> : null}
                                    {props.ship === 3 ? <img className={s.ship1}  src={ship3} alt="no img"/> : null}
                                    {props.ship === 4 ? <img className={s.ship1}  src={ship4} alt="no img"/> : null}
                            </button>
                        </div>
                    </div>
                </div>
            : <div></div>
        }


    </div>
}
export default SetShip