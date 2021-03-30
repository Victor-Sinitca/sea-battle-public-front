import React, {useEffect} from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./PlaceBattle.module.css"
import DeskUser from "../DeskUser/DeskUser";
import {checkForShipFireComp, checkForShipInputComp} from "../Common/CheckForShipInput/CheckForSingleShipInput";


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


let PlaceBattle = (props) => {
    useEffect(() => {
        if (props.comp.game && !props.settingShipUser.firstUser && props.settingShipUser.secondUser) { // заполнение поля компьютером
            props.startGame(false)
            let horizon = true;
            let shipValue = 1;
            let shipInputState;
            for (let i = 0; i < 4; i++) {
                props.setWhatSetShip(shipValue, false)
                props.setHorizon(horizon, false)
                props.unlockForSetShip(shipValue, horizon, false)
                shipInputState = checkForShipInputComp(props.secondUserMap, horizon, shipValue);
                props.setShipSecondUser(shipInputState[getRandomInt(shipInputState.length)], shipValue, horizon);
            }
            shipValue = 2;
            for (let i = 0; i < 3; i++) {
                props.setWhatSetShip(shipValue, false)
                props.setHorizon(horizon, false)
                props.unlockForSetShip(shipValue, horizon, false)
                shipInputState = checkForShipInputComp(props.secondUserMap, horizon, shipValue);
                props.setShipSecondUser(shipInputState[getRandomInt(shipInputState.length)], shipValue, horizon);
            }
            shipValue = 3;
            for (let i = 0; i < 2; i++) {
                props.setWhatSetShip(shipValue, false)
                props.setHorizon(horizon, false)
                props.unlockForSetShip(shipValue, horizon, false)
                shipInputState = checkForShipInputComp(props.secondUserMap, horizon, shipValue);
                props.setShipSecondUser(shipInputState[getRandomInt(shipInputState.length)], shipValue, horizon);
            }
            shipValue = 4;
            for (let i = 0; i < 1; i++) {
                props.setWhatSetShip(shipValue, false)
                props.setHorizon(horizon, false)
                props.unlockForSetShip(shipValue, horizon, false)
                shipInputState = checkForShipInputComp(props.secondUserMap, horizon, shipValue);
                props.setShipSecondUser(shipInputState[getRandomInt(shipInputState.length)], shipValue, horizon);
            }

        }
        if (props.comp.game && !props.FUTurn) { //ход компьютера
            let shipFireState;
            shipFireState = checkForShipFireComp(props.firstUserMap,)
            props.setShotSecondUser(shipFireState[getRandomInt(shipFireState.length)])
        }
    });


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
                        unlock: false,
                        img: null
                    }
                }
            }
        }
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
                        unlock: false,
                        img: null
                    }
                }
            }
            props.setSecondUserMap(userMap)
        }
    }
    if (!props.firstUserMap || !props.secondUserMap) return <Preloader/>




    return <div className={s.displayMapBattle}>
        <DeskUser toggleSettingShip={props.toggleSettingShip} firstUser={true} firstUserMap={props.firstUserMap}
                  secondUserMap={props.secondUserMap}
                  setShipUser={props.deleteShipFU ? props.deleteShipFUonMap : props.setShipFirstUser}
                  setShotUser={props.setShotFirstUser}
                  SUShips={props.SUShips} FUShips={props.FUShips} unlockForSetShip={props.unlockForSetShip}
                  lockAllMap={props.lockAllMap} whatSetShip={props.whatSetShipFU} setWhatSetShip={props.setWhatSetShip}
                  setHorizon={props.setHorizon} toggleDeleteShip={props.toggleDeleteShip}
                  deleteShipUser={props.deleteShipFU}
                  settingShipUser={props.settingShipUser} startGame={props.startGame} UserTurn={props.FUTurn}/>
        <DeskUser toggleSettingShip={props.toggleSettingShip} firstUser={false} firstUserMap={props.secondUserMap}
                  secondUserMap={props.firstUserMap}
                  setShipUser={props.deleteShipSU ? props.deleteShipSUonMap : props.setShipSecondUser}
                  setShotUser={props.setShotSecondUser}
                  SUShips={props.FUShips} FUShips={props.SUShips} unlockForSetShip={props.unlockForSetShip}
                  lockAllMap={props.lockAllMap} whatSetShip={props.whatSetShipSU} setWhatSetShip={props.setWhatSetShip}
                  setHorizon={props.setHorizon} toggleDeleteShip={props.toggleDeleteShip}
                  deleteShipUser={props.deleteShipSU}
                  settingShipUser={props.settingShipUser} startGame={props.startGame} UserTurn={!props.FUTurn}/>
    </div>
}

export default PlaceBattle