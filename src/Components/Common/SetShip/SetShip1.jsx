import React from "react";
import s from "./SetShip1.module.css"

const SetShip = (props) => {
    const setShipVertical = () => {
        props.setHorizon(false, props.firstUser)
        props.unlockForSetShip(props.ship, true, props.firstUser)
    }
    const setShipHorizontal = () => {
        props.setHorizon(true, props.firstUser)
        props.unlockForSetShip(props.ship, false, props.firstUser)
    }


    return <div className={s.displaySetShip}>
        {props.ship ?
            props.ship === 1
                ? <div className={s.displayVert}>
                    <div>
                        <button onClick={setShipVertical}  >
                            <div className={s.partShipFirst}></div>
                        </button>
                    </div>
                </div>
                :
                <div className={s.displayShip}>
                    <div className={s.displayVert}>
                        <div>
                            <button onClick={setShipVertical}>
                                <div>
                                    {props.ship > 0 ? <div className={s.partShipFirst}></div> : null}
                                    {props.ship > 1 ? <div className={s.partShip}></div> : null}
                                    {props.ship > 2 ? <div className={s.partShip}></div> : null}
                                    {props.ship > 3 ? <div className={s.partShip}></div> : null}
                                </div>
                            </button>
                        </div>

                    </div>
                    <div className={s.displayHor}>
                        <div>
                            <button onClick={setShipHorizontal}>
                                <div className={s.horiz}>
                                    {props.ship > 0 ? <div className={s.partShipFirst}></div> : null}
                                    {props.ship > 1 ? <div className={s.partShipFirst}></div> : null}
                                    {props.ship > 2 ? <div className={s.partShipFirst}></div> : null}
                                    {props.ship > 3 ? <div className={s.partShipFirst}></div> : null}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            : <div></div>
        }


    </div>
}
export default SetShip