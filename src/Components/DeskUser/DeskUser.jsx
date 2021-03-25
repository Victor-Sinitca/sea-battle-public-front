import React from "react";
import s from "../PlaceBattle/PlaceBattle.module.css";
import Desk from "./Desk/Desk";


const DeskUser = (props) => {
    const settingShip = () => {
        props.toggleSettingShip(true, props.firstUser)
    }
    const noSettingShip = () => {
        props.toggleSettingShip(false, props.firstUser)
    }

    return (
        <div className={s.displayDeskUser}>
            <div>
                <div>11111</div>
                <div className={s.displayUserFire}>
                    <Desk userMap={props.firstUserMap} firstDesk={true}
                          returnToClick={props.setShipUser} toClick={true}/>
                    <div>
                        <button className={(props.settingShip ? s.buttonActive : null)} onClick={settingShip}>Set ship
                        </button>
                        <button className={(!props.settingShip ? s.buttonActive : null)} onClick={noSettingShip}>Set fire
                        </button>
                    </div>
                    <div className={s.displayDownBar}>
                        <div>
                            <div>Ships with one cage</div>
                            <div>Ships with two cage</div>
                            <div>Ships with three cage</div>
                            <div>Ships with four cage</div>
                        </div>
                        <div>
                            <div>{props.firstUserShips.numberShips1}</div>
                            <div>{props.firstUserShips.numberShips2}</div>
                            <div>{props.firstUserShips.numberShips3}</div>
                            <div>{props.firstUserShips.numberShips4}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>22222222</div>
                <div className={s.displayUserShip}>
                    <Desk userMap={props.secondUserMap} firstDesk={false}
                          returnToClick={props.setShotUser} toClick={true}/>
                    <div></div>
                    <div className={s.displayDownBar}>
                        <div>
                            <div>Ships with one cage</div>
                            <div>Ships with two cage</div>
                            <div>Ships with three cage</div>
                            <div>Ships with four cage</div>
                        </div>
                        <div>
                            <div>{props.secondUserShips.numberShips1}</div>
                            <div>{props.secondUserShips.numberShips2}</div>
                            <div>{props.secondUserShips.numberShips3}</div>
                            <div>{props.secondUserShips.numberShips4}</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}
export default DeskUser