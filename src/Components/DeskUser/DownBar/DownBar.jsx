import React from "react";
import s from "./DownBar.module.css";

const DownBar = (props) => {
    return (<div>
            <div>List of enemy ships</div>
            <div className={s.displayDownBar}>
                <div className={s.displayString}>
                    <div>Ships one</div>
                    <div>Ships two</div>
                    <div>Ships three</div>
                    <div>Ships four</div>
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