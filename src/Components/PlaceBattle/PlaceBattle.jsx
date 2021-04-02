import React, {useEffect} from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./PlaceBattle.module.css"
import DeskUser from "../DeskUser/DeskUser";
import {checkForShipFireComp, checkForShipInputComp} from "../Common/CheckForShipInput/CheckForSingleShipInput";
import {getRandomInt} from "../Common/getRandom/getRandom";
import {initializeTheMap, toggleGameWithComp} from "../../redux/battleMap-reduсer";





let PlaceBattle = (props) => {
    useEffect(() => {
        if (!props.firstUserMap||!props.secondUserMap) {
            let userMap1 = [], userMap2 = [],i, j
            for (i = 0; i < 10; i++) {
                userMap1[i] = []
                userMap2[i] = []
                for (j = 0; j < 10; j++) {
                    userMap1[i][j] = {
                        sector: {
                            ship: false,
                            shot: false,
                            x: j,
                            y: i,
                            unlock: false,
                            img: null
                        }
                    }
                    userMap2[i][j] = {
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
            props.setFirstUserMap(userMap1)
            props.setSecondUserMap(userMap2)
        }
    });


    useEffect(() => { //расстановка кораблей компьютером
        if (props.comp.game && !props.settingShipUser.firstUser && props.settingShipUser.secondUser) { // заполнение поля компьютером
            props.setShipsRandom(false,props.secondUserMap)
            props.startGame(false) //true - start game first user, false - start game second user
        }
    },[props.settingShipUser.firstUser]);

    useEffect(() => { //стрельба компьютера
        if (props.comp.game && !props.FUTurn && !props.settingShipUser.secondUser) { //ход компьютера
            if (props.comp.damaged) {
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
                  toggleLookSecondUser={props.toggleLookSecondUser} setShipsRandom={props.setShipsRandom}
                  initializeTheMap={props.initializeTheMap} toggleGameWithComp={props.toggleGameWithComp}
                  comp={props.comp}/>
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
                      toggleLookSecondUser={props.toggleLookSecondUser} setShipsRandom={props.setShipsRandom}
                      initializeTheMap={props.initializeTheMap} toggleGameWithComp={props.toggleGameWithComp}
                      comp={props.comp}/>
            :
            <div> Place for second User </div>
        }
    </div>
}

export default PlaceBattle