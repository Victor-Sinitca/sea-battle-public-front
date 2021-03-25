import React from "react";
import s from "./DownBar.module.css";

const DownBar = (props) => {
    return (
        <div className={s.displayDownBar}>
            <div>
                <div>Ships with one cage</div>
                <div>Ships with two cage</div>
                <div>Ships with three cage</div>
                <div>Ships with four cage</div>
            </div>
            <div>
                <div>{props.userShips.numberShips1.count}</div>
                <div>{props.userShips.numberShips2.count}</div>
                <div>{props.userShips.numberShips3.count}</div>
                <div>{props.userShips.numberShips4.count}</div>
            </div>
        </div>
    )
}
export default DownBar