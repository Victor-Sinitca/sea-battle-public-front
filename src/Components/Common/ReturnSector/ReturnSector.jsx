import React from "react";
import s from "./ReturnSector.module.css"
import ship1 from "../../../assets/img/1.png"


const ReturnSector = (props) => {
    const clickSector = () => {
        if (props.toClick) {
            if (props.firstDesk) {
                if (props.sector.unlock) {
                    props.returnToClick(props.sector)
                }else if (props.deleteShipUser){
                    props.returnToClick(props.sector)}
            } else {
                props.returnToClick(props.sector)
            }
        }
    }
    return (
        props.firstDesk ?
            <button onClick={clickSector} className={props.sector.shot
                ? props.sector.ship
                    ? s.shotToShip
                    : s.shotMiss
                : props.sector.ship
                    ? s.ship
                    : s.noneShot}>
                {props.sector.img === 1 ? <img src={ship1} className={s.ship1} alt="no img"/> : null}
            </button>
            :
            <button onClick={clickSector} className={props.sector.shot
                ? props.sector.ship
                    ? s.shotToShip
                    : s.shotMiss
                : props.sector.ship
                    ? s.noneShot
                    : s.noneShot}>
            </button>
    )
}
export default ReturnSector