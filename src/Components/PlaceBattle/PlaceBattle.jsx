import React, {useEffect} from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./PlaceBattle.module.css"
import DeskUser from "../DeskUser/DeskUser";
import {checkForShipFireComp, checkForShipInputComp} from "../Common/CheckForShipInput/CheckForSingleShipInput";
import {getRandomInt} from "../Common/getRandom/getRandom";





let PlaceBattle = (props) => {
    useEffect(() => {
        if (props.comp.game && !props.settingShipUser.firstUser && props.settingShipUser.secondUser) { // заполнение поля компьютером
            props.startGame(false) //true - start game first user, false - start game second user
            props.setShipsRandom(false,props.firstUserMap)


            /*let horizon = true;
            let shipInputState;
            for (let shipValue = 4; shipValue >= 1; shipValue--) {
                for (let numberOfShips = shipValue; numberOfShips <= 4; numberOfShips++) {
                    horizon = getRandomInt(2)
                    props.setWhatSetShip(shipValue, false)
                    props.setHorizon(horizon, false)
                    props.unlockForSetShip(shipValue, horizon, false)
                    shipInputState = checkForShipInputComp(props.secondUserMap, horizon, shipValue);
                    props.setShipSecondUser(shipInputState[getRandomInt(shipInputState.length)], shipValue, horizon);
                }
            }*/
        }


        if (props.comp.game && !props.FUTurn) { //ход компьютера
            if (props.comp.damaged) {
                debugger
                let IndexElemMass = 0
                if (props.comp.sectorFire.length > 0) {
                    IndexElemMass = getRandomInt(props.comp.sectorFire.length)
                    props.setShotSecondUser(props.comp.sectorFire[IndexElemMass])
                } else {
                    props.setShotSecondUser(props.comp.sectorFire[IndexElemMass])
                }
                if (!props.comp.hit) {
                    props.increaseSectorFire(IndexElemMass)
                }
            } else {
                let shipFireState = checkForShipFireComp(props.firstUserMap,)
                props.setShotSecondUser(shipFireState[getRandomInt(shipFireState.length)])
            }
            if (props.FUShips.numberShips1 === 0 && props.FUShips.numberShips2 === 0 &&
                props.FUShips.numberShips3 === 0 && props.FUShips.numberShips4 === 0) {
                props.setCompGame(false)
            }
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
                  settingShipUser={props.settingShipUser} startGame={props.startGame} UserTurn={props.FUTurn}
                  toggleLookSecondUser={props.toggleLookSecondUser} setShipsRandom={props.setShipsRandom} />
        {props.lookSecondUser ?
            <DeskUser toggleSettingShip={props.toggleSettingShip} firstUser={false} firstUserMap={props.secondUserMap}
                      secondUserMap={props.firstUserMap}
                      setShipUser={props.deleteShipSU ? props.deleteShipSUonMap : props.setShipSecondUser}
                      setShotUser={props.setShotSecondUser}
                      SUShips={props.FUShips} FUShips={props.SUShips} unlockForSetShip={props.unlockForSetShip}
                      lockAllMap={props.lockAllMap} whatSetShip={props.whatSetShipSU}
                      setWhatSetShip={props.setWhatSetShip}
                      setHorizon={props.setHorizon} toggleDeleteShip={props.toggleDeleteShip}
                      deleteShipUser={props.deleteShipSU}
                      settingShipUser={props.settingShipUser} startGame={props.startGame} UserTurn={!props.FUTurn}
                      toggleLookSecondUser={props.toggleLookSecondUser} setShipsRandom={props.setShipsRandom}/>
            :
            <div> Place for second User </div>
        }
    </div>
}

export default PlaceBattle