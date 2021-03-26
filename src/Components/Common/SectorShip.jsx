import React from "react";
import s from "./Sector.module.css"


const ReturnSector = (props) => {

    const clickSector = () => {
        if (props.toClick){
            if(props.firstDesk){
                if(props.sector.unlock) {props.returnToClick(props.sector)}
            }
            else {props.returnToClick(props.sector)}
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