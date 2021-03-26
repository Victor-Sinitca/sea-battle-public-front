import React from "react";
import s from "./DeskUser.module.css";
import Desk from "./Desk/Desk";
import RightBar from "./RightBar/RightBar";
import DownBar from "./DownBar/DownBar";


const DeskUser = (props) => {
    const onSettingShip = () => {
        props.toggleSettingShip(true, props.firstUser)}
    const ofSettingShip = () => {
        props.toggleSettingShip(false, props.firstUser)}

    const unlockForSetShip11 =()=>{
        debugger
        props.unlockForSetShip(11,props.firstUser)}
    const unlockForSetShip12 =()=>{props.unlockForSetShip(12,props.firstUser)}
    const unlockForSetShip13 =()=>{props.unlockForSetShip(13,props.firstUser)}
    const unlockForSetShip14 =()=>{props.unlockForSetShip(14,props.firstUser)}
    const unlockForSetShip21 =()=>{props.unlockForSetShip(21,props.firstUser)}
    const unlockForSetShip22 =()=>{props.unlockForSetShip(22,props.firstUser)}
    const unlockForSetShip23 =()=>{props.unlockForSetShip(23,props.firstUser)}
    const unlockForSetShip31 =()=>{props.unlockForSetShip(31,props.firstUser)}
    const unlockForSetShip32 =()=>{props.unlockForSetShip(32,props.firstUser)}
    const unlockForSetShip41 =()=>{props.unlockForSetShip(41,props.firstUser)}

    const unlockForAddPartShip =()=>{
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
                            <div> <button  className={props.SUShips.ship[0].set? s.active:s.deActive}>11</button> </div>
                            <div> <button  className={props.SUShips.ship[1].set? s.active:s.deActive}>12</button> </div>
                            <div> <button  className={props.SUShips.ship[2].set? s.active:s.deActive}>13</button> </div>
                            <div> <button  className={props.SUShips.ship[3].set? s.active:s.deActive}>14</button> </div>
                            <div> <button  className={props.SUShips.ship[4].set? s.active:s.deActive}>21</button> </div>
                            <div> <button  className={props.SUShips.ship[5].set? s.active:s.deActive}>22</button> </div>
                            <div> <button  className={props.SUShips.ship[6].set? s.active:s.deActive}>23</button> </div>
                            <div> <button  className={props.SUShips.ship[7].set? s.active:s.deActive}>31</button> </div>
                            <div> <button  className={props.SUShips.ship[8].set? s.active:s.deActive}>32</button> </div>
                            <div> <button  className={props.SUShips.ship[9].set? s.active:s.deActive}>41</button> </div>
                        </div>
                        <div>
                            <button  onClick={unlockForSetShip11}>set</button>
                            <button  onClick={unlockForSetShip12}>set</button>
                            <button  onClick={unlockForSetShip13}>set</button>
                            <button  onClick={unlockForSetShip14}>set</button>
                            <button  onClick={unlockForSetShip21}>set</button>
                            <button  onClick={unlockForSetShip22}>set</button>
                            <button  onClick={unlockForSetShip23}>set</button>
                            <button  onClick={unlockForSetShip31}>set</button>
                            <button  onClick={unlockForSetShip32}>set</button>
                            <button  onClick={unlockForSetShip41}>set</button>
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