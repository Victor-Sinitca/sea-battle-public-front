import React from "react";
import s from "./SetShipBar.module.css";
import SetShip from "../../Common/SetShip/SetShip1";




const SetShipBar=(props)=>{
    const SetShip1 =()=>{
        props.lockAllMap(props.firstUser)
        props.setWhatSetShip(1,props.firstUser)}
    const SetShip2 =()=>{
        props.lockAllMap(props.firstUser)
        props.setWhatSetShip(2,props.firstUser)}
    const SetShip3 =()=>{
        props.lockAllMap(props.firstUser)
        props.setWhatSetShip(3,props.firstUser)}
    const SetShip4 =()=>{
        props.lockAllMap(props.firstUser)
        props.setWhatSetShip(4,props.firstUser)}



    return<div className={s.displaySetShip}>
        <div className={s.displayShipButton}>
            <div className={s.ship1}>
                <span>
                    <button disabled={!props.FUShips.ship1} onClick={SetShip1} className={props.whatSetShip===1 ? s.active:s.deActive} >
                        <div className={s.displayShip1}>
                            <div className={s.partShip}> </div>
                        </div>
                    </button>
                </span>
                <div> </div>
                <div> {props.FUShips.ship1} </div>
            </div>
            <div className={s.ship2}>
                <div>
                    <button disabled={!props.FUShips.ship2} onClick={SetShip2} className={props.whatSetShip===2? s.active:s.deActive}>
                        <div className={s.displayShip2}>
                            <div className={s.partShip}> </div>
                            <div className={s.partShip}> </div>
                        </div>
                    </button>
                </div>
                <div> </div>
                <div> { props.FUShips.ship2} </div>
            </div>
            <div className={s.ship3}>
                <div>
                    <button disabled={!props.FUShips.ship3} onClick={SetShip3} className={props.whatSetShip===3? s.active:s.deActive}>
                        <div className={s.displayShip3}>
                            <div className={s.partShip}> </div>
                            <div className={s.partShip}> </div>
                            <div className={s.partShip}> </div>
                        </div>
                    </button>
                </div>
                <div> </div>
                <div> {props.FUShips.ship3} </div>
            </div>
            <div className={s.ship4}>
                <div>
                    <button disabled={!props.FUShips.ship4} onClick={SetShip4} className={props.whatSetShip===4? s.active:s.deActive}>
                        <div className={s.displayShip4}>
                            <div className={s.partShip}> </div>
                            <div className={s.partShip}> </div>
                            <div className={s.partShip}> </div>
                            <div className={s.partShip}> </div>
                        </div>
                    </button>
                </div>
                <div> </div>
                <div> {props.FUShips.ship4} </div>
            </div>
        </div>
        <div>
            <SetShip ship={props.whatSetShip} firstUserMap={props.firstUserMap}
                     unlockForSetShip={props.unlockForSetShip} firstUser={props.firstUser}
                     setHorizon={props.setHorizon}/>
        </div>
    </div>
}
export default SetShipBar;