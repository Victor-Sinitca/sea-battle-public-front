import React from "react";
import s from "./RightBar.module.css"


const RightBar = (props) => {
    return (
        <div>
            <button className={(props.settingShip ? s.buttonActive : s.buttonDisable)} onClick={props.onSettingShip}>
                Set ship
            </button>
            <button className={(!props.settingShip ? s.buttonActive : s.buttonDisable)} onClick={props.ofSettingShip}>
                Set fire
            </button>
        </div>
    )
}
export default RightBar