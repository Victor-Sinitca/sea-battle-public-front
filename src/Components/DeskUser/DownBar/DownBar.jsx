import React from "react";
import s from "./DownBar.module.css";
import ship1 from "../../../assets/img/1.png"
import ship2 from "../../../assets/img/20.png"
import ship3 from "../../../assets/img/3.png"
import ship4 from "../../../assets/img/40.png"

const DownBar = (props) => {
    return (<div>
            <div>List of enemy ships</div>
            <div className={s.displayDownBar}>
                <div className={s.displayString}>
                    <div><img className={s.ship}  src={ship1} alt="no img"/></div>
                    <div><img className={s.ship}  src={ship2} alt="no img"/></div>
                    <div><img className={s.ship}  src={ship3} alt="no img"/></div>
                    <div><img className={s.ship}  src={ship4} alt="no img"/></div>
                </div>
                <div className={s.displayString}>
                    <div>{props.userShips.numberShips1}</div>
                    <div>{props.userShips.numberShips2}</div>
                    <div>{props.userShips.numberShips3}</div>
                    <div>{props.userShips.numberShips4}</div>
                </div>
            </div>
            {props.UserTurn?
                <div> your turn </div>
                :
                <div> second player's turn</div>
            }
        </div>

    )
}
export default DownBar