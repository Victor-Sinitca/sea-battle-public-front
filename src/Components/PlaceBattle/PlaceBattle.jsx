import React from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./PlaceBattle.module.css"
import DeskUser from "../DeskUser/DeskUser";



let PlaceBattle = (props) => {
    if (!props.firstUserMap) {
        let userMap = [], i, j
        for (i = 0; i < 10; i++) {
            userMap[i] = []
            for (j = 0; j < 10; j++) {
                userMap[i][j] = {
                    sector: {
                        ship: false,
                        shot: false,
                        x: j,
                        y: i,
                        unlock:false,
                        img:null
                    }}}}
        props.setFirstUserMap(userMap)
    }
    if (!props.secondUserMap) {
        let userMap = [[]], i, j
        for (i = 0; i < 10; i++) {
            userMap[i] = []
            for (j = 0; j < 10; j++) {
                userMap[i][j] = {
                    sector: {
                        ship: false,
                        shot: false,
                        x: j,
                        y: i,
                        unlock:false,
                        img:null
                    }}}
            props.setSecondUserMap(userMap)
        }
    }
    if (!props.secondUserMap || !props.secondUserMap) return <Preloader/>

    const settingShipFU=(props)=>{props.settingShipFU(props)}
    const settingShipSU=(props)=>{props.settingShipSU(props)}


    return <div className={s.displayMapBattle}>
        <DeskUser toggleSettingShip={props.toggleSettingShip}  firstUser={true} firstUserMap={props.firstUserMap}
                  secondUserMap={props.secondUserMap} setShipUser={props.setShipFirstUser}
                  setShotUser={props.setShotFirstUser} settingShip={settingShipFU}
                  SUShips={props.SUShips} FUShips={props.FUShips} unlockForSetShip={props.unlockForSetShip}
                  lockAllMap={props.lockAllMap} whatSetShip={props.whatSetShipFU} setWhatSetShip={props.setWhatSetShip}
                  setHorizon={props.setHorizon}/>
        <DeskUser toggleSettingShip={props.toggleSettingShip}  firstUser={false} firstUserMap={props.secondUserMap}
                  secondUserMap={props.firstUserMap} setShipUser={props.setShipSecondUser}
                  setShotUser={props.setShotSecondUser} settingShip={settingShipSU}
                  SUShips={props.FUShips} FUShips={props.SUShips} unlockForSetShip={props.unlockForSetShip}
                  lockAllMap={props.lockAllMap} whatSetShip={props.whatSetShipSU} setWhatSetShip={props.setWhatSetShip}
                  setHorizon={props.setHorizon}/>
    </div>
}

export default PlaceBattle