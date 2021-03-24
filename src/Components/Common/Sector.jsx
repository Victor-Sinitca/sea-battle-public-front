import React from "react";
import s from "./Sector.module.css"


const ReturnSector = (props) => {
    const clickSector = () => {
        props.userShot(props.b)
    }
    return (
        <button onClick={clickSector} className={props.b.shot
            ? props.b.ship
                ? s.shotToShip
                : s.noneShot
            : props.b.ship
                ? s.ship : s.noneShot}>
        </button>
    )
}
export default ReturnSector