import React from "react";
import s from "./DownBar.module.css";
import ship1 from "../../../assets/img/1.png"
import ship2 from "../../../assets/img/20.png"
import ship3 from "../../../assets/img/3.png"
import ship4 from "../../../assets/img/40.png"
import fireShip from "../../../assets/img/fireShip.png"
import shield from "../../../assets/img/shield.png"

const DownBar = (props) => {
    return (
        <div className={s.displayBar}>
            <div className={s.header}> Enemy ships</div>
            <div className={s.displayDownBar}>
                <div className={s.displayString}>
                    <div><img className={s.ship} src={ship1} alt="no img"/></div>
                    <div><img className={s.ship} src={ship2} alt="no img"/></div>
                    <div><img className={s.ship} src={ship3} alt="no img"/></div>
                    <div><img className={s.ship} src={ship4} alt="no img"/></div>
                </div>
                <div className={s.displayString}>
                    <div>{props.userShips.numberShips1}</div>
                    <div>{props.userShips.numberShips2}</div>
                    <div>{props.userShips.numberShips3}</div>
                    <div>{props.userShips.numberShips4}</div>
                </div>
            </div>
            {props.UserTurn ?
                <div > <img className={s.fireShip} src={fireShip}/> </div>
                :
                <div> <img className={s.fireShip} src={shield}/></div>
            }
        </div>

    )
}
export default DownBar