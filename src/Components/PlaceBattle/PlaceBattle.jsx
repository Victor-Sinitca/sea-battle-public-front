import React, {useEffect} from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./PlaceBattle.module.css"
import DeskUser from "../DeskUser/DeskUser";
import {checkForShipFireComp, checkForShipInputComp} from "../Common/CheckForShipInput/CheckForSingleShipInput";
import {getRandomInt} from "../Common/getRandom/getRandom";
import {
    initializeTheMap,
    setHorizon, setShipFirstUser, setShipSecondUser,
    setWhatSetShip,
    toggleGameWithComp,
    unlockForSetShip
} from "../../redux/battleMap-reduсer";
import {useSelector} from "react-redux";


let PlaceBattle = (props) => {
    const firstUserMap = useSelector(state => state.battleMap.FUMap);
    const secondUserMap = useSelector(state => state.battleMap.SUMap);
    const comp = useSelector(state => state.battleMap.comp);
    const settingShipUser = useSelector(state => state.battleMap.settingShipUser);
    const FUTurn = useSelector(state => state.battleMap.FUTurn);
    const FUShips = useSelector(state => state.battleMap.FUShips);


    useEffect(() => {
        if (!firstUserMap || !secondUserMap) {
            let userMap1 = [], userMap2 = [], i, j
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
        if (comp.game && !settingShipUser.firstUser && settingShipUser.secondUser) { // заполнение поля компьютером
            props.setShipsRandom(false, props.secondUserMap)
            props.startGame(false) //true - start game first user, false - start game second user
        }
    }, [settingShipUser.firstUser]);



    useEffect(() => { //стрельба компьютера
        if (comp.game && !FUTurn.turn && !settingShipUser.secondUser) { //ход компьютера
            if (comp.damaged) {
                let IndexElemMass = 0
                if (comp.sectorFire.length > 0) {
                    IndexElemMass = getRandomInt(comp.sectorFire.length)
                    props.setShotSecondUser(props.comp.sectorFire[IndexElemMass])
                } else {
                    props.setShotSecondUser(props.comp.sectorFire[IndexElemMass])
                }
                if (!comp.hit) {
                    props.increaseSectorFire(IndexElemMass)
                }
            } else {
                let shipFireState = checkForShipFireComp(firstUserMap,)
                props.setShotSecondUser(shipFireState[getRandomInt(shipFireState.length)])
            }
            if (FUShips.numberShips1 === 0 && FUShips.numberShips2 === 0 &&
                FUShips.numberShips3 === 0 && FUShips.numberShips4 === 0) {
                props.setCompGame(false)
            }
        }
    });

    if (!firstUserMap || !secondUserMap) return <Preloader/>


    return <div className={s.displayMapBattle}>
        <DeskUser toggleSettingShip={props.toggleSettingShip}
                  setShipUser={props.deleteShipFU ? props.deleteShipFUonMap : props.setShipFirstUser}
                  setShotUser={props.setShotFirstUser}
                  deleteShipUser={props.deleteShipFU}


                  firstUser={true} firstUserMap={props.firstUserMap} secondUserMap={props.secondUserMap}
                  SUShips={props.SUShips}
                  FUShips={props.FUShips}
                  whatSetShip={props.whatSetShipFU}


                  unlockForSetShip={props.unlockForSetShip}
                  lockAllMap={props.lockAllMap}
                  setWhatSetShip={props.setWhatSetShip}
                  setHorizon={props.setHorizon}
                  toggleDeleteShip={props.toggleDeleteShip}
                  startGame={props.startGame}


                  settingShipUser={props.settingShipUser}


                  UserTurn={props.FUTurn}
                  toggleLookSecondUser={props.toggleLookSecondUser} setShipsRandom={props.setShipsRandom}
                  initializeTheMap={props.initializeTheMap} toggleGameWithComp={props.toggleGameWithComp}
                  comp={props.comp} />
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
                      comp={props.comp} />
            :null

        }
    </div>
}

export default PlaceBattle