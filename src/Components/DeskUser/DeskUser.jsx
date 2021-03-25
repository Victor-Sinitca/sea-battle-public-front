import React from "react";
import s from "./DeskUser.module.css";
import Desk from "./Desk/Desk";
import RightBar from "./RightBar/RightBar";
import DownBar from "./DownBar/DownBar";


const DeskUser = (props) => {
    const onSettingShip = () => {
        props.toggleSettingShip(true, props.firstUser)
    }
    const ofSettingShip = () => {
        props.toggleSettingShip(false, props.firstUser)
    }
debugger
    return (
        <div className={s.displayDesk}>
            <div>
                <div>Field one</div>
                <div className={s.displayUser}>
                    <Desk userMap={props.firstUserMap} firstDesk={true}
                          returnToClick={props.setShipUser} toClick={props.settingShip}/>
                    <div className={s.displaySetShip}>
                        <div>
                            <div> <button className={props.SUShips.ship[0].set? s.active:s.deActive}>1</button> </div>
                            <div> <button className={props.SUShips.ship[1].set? s.active:s.deActive}>1</button> </div>
                            <div> <button className={props.SUShips.ship[2].set? s.active:s.deActive}>1</button> </div>
                            <div> <button className={props.SUShips.ship[3].set? s.active:s.deActive}>1</button> </div>
                            <div> <button className={props.SUShips.ship[4].set? s.active:s.deActive}>2</button> </div>
                            <div> <button className={props.SUShips.ship[5].set? s.active:s.deActive}>2</button> </div>
                            <div> <button className={props.SUShips.ship[6].set? s.active:s.deActive}>2</button> </div>
                            <div> <button className={props.SUShips.ship[7].set? s.active:s.deActive}>3</button> </div>
                            <div> <button className={props.SUShips.ship[8].set? s.active:s.deActive}>3</button> </div>
                            <div> <button className={props.SUShips.ship[9].set? s.active:s.deActive}>4</button> </div>

                        </div>
                        <div>
                            <button>set</button>
                            <button>set</button>
                            <button>set</button>
                            <button>set</button>
                            <button>set</button>
                            <button>set</button>
                            <button>set</button>
                            <button>set</button>
                            <button>set</button>
                            <button>set</button>
                        </div>
                        <div>
                            <button>reset</button>
                            <button>reset</button>
                            <button>reset</button>
                            <button>reset</button>
                            <button>reset</button>
                            <button>reset</button>
                            <button>reset</button>
                            <button>reset</button>
                            <button>reset</button>
                            <button>reset</button>
                        </div>
                    </div>
                    <DownBar userShips={props.FUShips}/>
                </div>
            </div>
            <div>
                <div>Field two</div>
                <div className={s.displayUser}>
                    <Desk userMap={props.secondUserMap} firstDesk={false}
                          returnToClick={props.setShotUser} toClick={true}/>
                    <RightBar settingShip={props.settingShip} onSettingShip={onSettingShip} ofSettingShip={ofSettingShip} />
                    <DownBar userShips={props.SUShips}/>
                </div>
            </div>


        </div>

    )
}
export default DeskUser