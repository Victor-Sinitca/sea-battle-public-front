import React from "react";
import s from "./DeskUser.module.css";
import Desk from "./Desk/Desk";
import RightBar from "./RightBar/RightBar";
import DownBar from "./DownBar/DownBar";

import SetShipBar from "./SetShip/SetShipBar";


const DeskUser = (props) => {
    const onSettingShip = () => {
        props.toggleSettingShip(true, props.firstUser)}
    const ofSettingShip = () => {
        props.toggleSettingShip(false, props.firstUser)}
    const toggleDeleteShip = () => {
        props.toggleDeleteShip(props.firstUser)
    }
    return (
        <div className={s.displayDesk}>
            <div>
                <div>Field one</div>
                <div className={s.displayUser}>
                    <Desk userMap={props.firstUserMap} firstDesk={true}
                          returnToClick={props.setShipUser} toClick={props.settingShip} deleteShipUser={props.deleteShipUser}/>
                    <SetShipBar FUShips={props.FUShips}  whatSetShip={props.whatSetShip} firstUserMap={props.firstUserMap}
                                unlockForSetShip={props.unlockForSetShip} firstUser={props.firstUser} setHorizon={props.setHorizon}
                                lockAllMap={props.lockAllMap} setWhatSetShip={props.setWhatSetShip}/>
                    <DownBar userShips={props.FUShips}/>
                    <div>
                        <button onClick={toggleDeleteShip} className={props.deleteShipUser?
                            s.deleteShipButtonActive :
                            s.deleteShipButtonDizActive}>delete ship</button>
                    </div>
                </div>
            </div>
            <div>
                <div>Field two</div>
                <div className={s.displayUser}>
                    <Desk userMap={props.secondUserMap} firstDesk={false}
                          returnToClick={props.setShotUser} toClick={true}/>
                    <RightBar settingShip={props.settingShip} onSettingShip={onSettingShip}
                              ofSettingShip={ofSettingShip} lockAllMap={props.lockAllMap}
                              firstUser={props.firstUser} />
                    <DownBar userShips={props.SUShips}/>
                </div>
            </div>
        </div>

    )
}
export default DeskUser