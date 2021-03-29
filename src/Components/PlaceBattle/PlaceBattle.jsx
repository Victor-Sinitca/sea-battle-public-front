import React from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./PlaceBattle.module.css"
import DeskUser from "../DeskUser/DeskUser";
import {checkForShipInputComp} from "../Common/CheckForShipInput/CheckForSingleShipInput";


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

    if (props.gameComp && !props.FUTurn){ //ход компьютера

    }

    if (props.gameComp &&!props.settingShipUser.firstUser && props.settingShipUser.secondUser){ // заполнение поля компьютером
        let horizon=false
        let shipValue=1
        let shipInputState=checkForShipInputComp(props.secondUserMap,horizon,shipValue)




        props.toggleSettingShip(false,false)
    }







    return <div className={s.displayMapBattle}>
        <DeskUser toggleSettingShip={props.toggleSettingShip}  firstUser={true} firstUserMap={props.firstUserMap}
                  secondUserMap={props.secondUserMap}
                  setShipUser={props.deleteShipFU? props.deleteShipFUonMap :props.setShipFirstUser}
                  setShotUser={props.setShotFirstUser}
                  SUShips={props.SUShips} FUShips={props.FUShips} unlockForSetShip={props.unlockForSetShip}
                  lockAllMap={props.lockAllMap} whatSetShip={props.whatSetShipFU} setWhatSetShip={props.setWhatSetShip}
                  setHorizon={props.setHorizon} toggleDeleteShip={props.toggleDeleteShip} deleteShipUser={props.deleteShipFU}
                  settingShipUser ={props.settingShipUser} startGame ={props.startGame} UserTurn ={props.FUTurn} />
        <DeskUser toggleSettingShip={props.toggleSettingShip}  firstUser={false} firstUserMap={props.secondUserMap}
                  secondUserMap={props.firstUserMap} 
                  setShipUser={props.deleteShipSU? props.deleteShipSUonMap :props.setShipSecondUser}
                  setShotUser={props.setShotSecondUser}
                  SUShips={props.FUShips} FUShips={props.SUShips} unlockForSetShip={props.unlockForSetShip}
                  lockAllMap={props.lockAllMap} whatSetShip={props.whatSetShipSU} setWhatSetShip={props.setWhatSetShip}
                  setHorizon={props.setHorizon} toggleDeleteShip={props.toggleDeleteShip} deleteShipUser={props.deleteShipSU}
                  settingShipUser ={props.settingShipUser} startGame ={props.startGame} UserTurn ={!props.FUTurn}/>
    </div>
}

export default PlaceBattle