import React from "react";
import s from "./Sector.module.css"


const ReturnSectorFire = (props) => {
    const clickSector = () => {
        props.userShot(props.b)
    }
    return (
            <button onClick={clickSector} className={props.b.sector.shot
                ? props.b.sector.ship
                    ? s.shotToShip
                    : s.shotMiss
                : props.b.sector.ship
                    ? s.ship
                    : s.noneShot}>
            </button>
    )
}
export default ReturnSectorFire