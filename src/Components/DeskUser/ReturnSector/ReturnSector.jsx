import React  from "react";
import s from "./ReturnSector.module.css"
import ship1 from "../../../assets/img/1.png"
import ship21 from "../../../assets/img/21.png"
import ship22 from "../../../assets/img/22.png"
import ship211 from "../../../assets/img/211.png"
import ship221 from "../../../assets/img/221.png"
import ship31 from "../../../assets/img/31.png"
import ship32 from "../../../assets/img/32.png"
import ship33 from "../../../assets/img/33.png"
import ship311 from "../../../assets/img/311.png"
import ship321 from "../../../assets/img/321.png"
import ship331 from "../../../assets/img/331.png"
import ship41 from "../../../assets/img/41.png"
import ship42 from "../../../assets/img/42.png"
import ship43 from "../../../assets/img/43.png"
import ship44 from "../../../assets/img/44.png"
import ship411 from "../../../assets/img/411.png"
import ship421 from "../../../assets/img/421.png"
import ship431 from "../../../assets/img/431.png"
import ship441 from "../../../assets/img/441.png"
import fire1 from "../../../assets/img/fire1.png"




const ReturnSector = (props) => {
    let shipState={ // creating a list of parts with images of ships
        1:ship1,
        21:ship21,22:ship22,211:ship211,221:ship221,
        31:ship31,32:ship32,33:ship33, 311:ship311,321:ship321,331:ship331,
        41:ship41,42:ship42,43:ship43, 44:ship44,411:ship411,421:ship421,431:ship431,441:ship441,
    }


    const clickSector = () => { // click action
        if (props.toClick) { // if  unblock click
            if (props.firstDesk) {
                if (props.sector.unlock || props.deleteShipUser) {
                    props.returnToClick(props.sector)
                }
            } else {
                props.returnToClick(props.sector)
            }
        }
    }
    return (
        props.firstDesk ?
            <div onClick={clickSector} className={props.sector.shot
                ? props.sector.ship
                    ? s.shotToShip
                    : s.shotMiss
                : props.sector.ship
                    ? s.ship
                    : s.noneShot}>
                {props.sector.img? <img src={shipState[props.sector.img]} className={s.ship1} alt="no img"/> : null}
                {props.sector.shot&&!props.sector.ship? <img className={s.fire} src={fire1} alt="no img" />:null}
            </div>
            :
            <div onClick={clickSector} className={props.sector.shot
                ? props.sector.ship
                    ? s.shotToShip
                    : s.shotMiss
                : props.sector.ship
                    ? s.noneShot
                    : s.noneShot}>
                {props.sector.shot?
                <img className={s.fire} src={fire1} alt="no img" />:null}
            </div>
    )
}
export default ReturnSector