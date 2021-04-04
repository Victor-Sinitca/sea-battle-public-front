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
            <div onClick={clickSector} className={props.sector.shot
                ? props.sector.ship
                    ? s.shotToShip
                    : s.shotMiss
                : props.sector.ship
                    ? s.ship
                    : s.noneShot}>
                {props.sector.img === 1 ? <img src={ship1} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 21 ? <img src={ship21} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 22 ? <img src={ship22} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 211 ? <img src={ship211} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 221 ? <img src={ship221} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 31 ? <img src={ship31} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 32 ? <img src={ship32} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 33 ? <img src={ship33} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 311 ? <img src={ship311} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 321 ? <img src={ship321} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 331 ? <img src={ship331} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 41 ? <img src={ship41} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 42 ? <img src={ship42} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 43 ? <img src={ship43} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 44 ? <img src={ship44} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 411 ? <img src={ship411} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 421 ? <img src={ship421} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 431 ? <img src={ship431} className={s.ship1} alt="no img"/> : null}
                {props.sector.img === 441 ? <img src={ship441} className={s.ship1} alt="no img"/> : null}
            </div>
            :
            <div onClick={clickSector} className={props.sector.shot
                ? props.sector.ship
                    ? s.shotToShip
                    : s.shotMiss
                : props.sector.ship
                    ? s.noneShot
                    : s.noneShot}>
            </div>
    )
}
export default ReturnSector