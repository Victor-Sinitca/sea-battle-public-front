import React, {FC, useEffect, useLayoutEffect, useState} from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./PlaceBattle.module.css"
import DeskUser from "../DeskUser/DeskUser";
import {checkForShipFireComp} from "../../commen/logics/checkForShipInput/checkForSingleShipInput";
import {getRandomInt} from "../../commen/logics/getRandom/getRandom";
import {useDispatch, useSelector} from "react-redux";
import {actionBattleMap, RandomSaga} from "../../redux/battleMap-reduсer";
import {getSaveList} from "../../redux/saveBattleMap-selectors";
import {
    getComp, getDeleteShipFU, getDeleteShipSU,
    getFirstUserMap, getFUShips,
    getFUTurn, getIdTurn, getLookSecondUser,
    getSecondUserMap,
    getSettingShipUser, getStateBattleMap, getSUShips, getWhatSetShipFU, getWhatSetShipSU
} from "../../redux/battleMap-selectors";
import {saveBattleMap} from "../../redux/saveBattleMap-reduсer";
import {initializeTheMapFunction} from "../../commen/logics/initializeTheMapFunction/initializeTheMapFunction";


const PlaceBattle:FC = ()  => {
    const stateBattleMap = useSelector(getStateBattleMap);
    const firstUserMap = useSelector(getFirstUserMap);
    const secondUserMap = useSelector(getSecondUserMap);
    const comp = useSelector(getComp);
    const settingShipUser = useSelector(getSettingShipUser);
    const FUTurn = useSelector(getFUTurn);
    const FUShips = useSelector(getFUShips);
    const SUShips = useSelector(getSUShips);
    const whatSetShipFU = useSelector(getWhatSetShipFU);
    const whatSetShipSU = useSelector(getWhatSetShipSU);
    const deleteShipFU = useSelector(getDeleteShipFU);
    const deleteShipSU = useSelector(getDeleteShipSU);
    const lookSecondUser = useSelector(getLookSecondUser);
    const saveList = useSelector(getSaveList);
    const IdTurn = useSelector(getIdTurn);

    const dispatch = useDispatch()
    const [start, setStart]= useState(true)


    const buttonHistory = saveList.map(S =>
            <button className={S.idTurn=== IdTurn-1?  s.historyButton1 :s.historyButton}  key={S.idTurn} onClick={() => dispatch(actionBattleMap.loadState(S))}>
                {/*{S.idTurn ? S.idTurn : "to start"}*/}{S.idTurn+1}
            </button>
    )

    useEffect(() => { //инициализация карт первого и второго игрока
        if (!firstUserMap.length || !secondUserMap.length) {
            dispatch(actionBattleMap.setFirstUserMap(initializeTheMapFunction(null)))
            dispatch(actionBattleMap.setSecondUserMap(initializeTheMapFunction(null)))
        }
        setStart(false)
    },[]);
    useEffect(() => { //расстановка кораблей компьютером
        if (comp.game && !settingShipUser.firstUser && settingShipUser.secondUser) { // заполнение поля компьютером
            dispatch(RandomSaga(false, secondUserMap)) //установка кораблей через сагу
            /* dispatch(setShipsRandom(false, secondUserMap)) //установка кораблей через санку  */
            dispatch(actionBattleMap.startGames(false)) //true - start game first user, false - start game second user
        }
    },[settingShipUser.firstUser]);
    useEffect(() => { //стрельба компьютера
        if (comp.game && !FUTurn && !settingShipUser.secondUser) { //ход компьютера
            if (comp.damaged) { // если был поврежден корабль
                let IndexElemMass = 0
                if (comp.sectorFire.length > 0) {
                    IndexElemMass = getRandomInt(comp.sectorFire.length)
                    dispatch(actionBattleMap.setShotUser(comp.sectorFire[IndexElemMass], false))
                } else {
                    dispatch(actionBattleMap.setShotUser(comp.sectorFire[IndexElemMass], false))
                }
                if (!comp.hit) {
                    dispatch(actionBattleMap.reduceSectorFire(IndexElemMass))
                }
            } else { //если нет поврежденных кораблей - стельба по карте
                let shipFireState = checkForShipFireComp(firstUserMap,) //поиск секторов для стрельбы
                dispatch(actionBattleMap.setShotUser(shipFireState[getRandomInt(shipFireState.length)], false))
            } //стрельба в случайный сектор из найденных
            if (FUShips.numberShips1 === 0 && FUShips.numberShips2 === 0 && // если у первого игроканет все корабли убиты - прекращается стрельба
                FUShips.numberShips3 === 0 && FUShips.numberShips4 === 0) {
                dispatch(actionBattleMap.setCompGame(false))
            }
        }
    },);

    useEffect(()=>{

    },[FUTurn])


    useLayoutEffect(() => {
        // сохранение хода перед выстрелом
        if (FUTurn && !start ) { //ход 1 игрока
            dispatch(actionBattleMap.increaseIdTurn())
            dispatch(saveBattleMap(stateBattleMap))
        }
    }, [FUTurn]);


    if (!firstUserMap.length || !secondUserMap.length) return <Preloader/>
    return <div className={s.displayMapBattle}>
        <DeskUser firstUser={true} firstMap={firstUserMap} secondMap={secondUserMap}
                  SUShips={SUShips} FUShips={FUShips}
                  whatSetShip={whatSetShipFU} UserTurn={FUTurn}
                  deleteShipUser={deleteShipFU} comp={comp} settingShipUser={settingShipUser} isCompGame={true}/>
        {lookSecondUser &&
        <DeskUser firstUser={false} firstMap={secondUserMap} secondMap={firstUserMap}
                  SUShips={FUShips} FUShips={SUShips}
                  whatSetShip={whatSetShipSU} UserTurn={!FUTurn}
                  deleteShipUser={deleteShipSU} comp={comp} settingShipUser={settingShipUser} isCompGame={true}/>
        }
         <div>
            ход: {saveList.length>1 &&buttonHistory}
        </div>
    </div>
}
export default PlaceBattle
