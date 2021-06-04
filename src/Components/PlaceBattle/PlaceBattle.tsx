import React, {FC, useEffect} from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./PlaceBattle.module.css"
import DeskUser from "../DeskUser/DeskUser";
import {checkForShipFireComp} from "../../commen/logics/checkForShipInput/checkForSingleShipInput";
import {getRandomInt} from "../../commen/logics/getRandom/getRandom";
import {useDispatch, useSelector} from "react-redux";
import {
    reduceSectorFire, RandomSaga, setCompGame,
    setFirstUserMap,
    setSecondUserMap,
    startGame, setShotUser, loadState, increaseIdTurn,
} from "../../redux/battleMap-reduсer";
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


let PlaceBattle:FC = ()  => {
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


    const buttonHistory = saveList.map(S =>
            <button className={S.idTurn=== IdTurn-1?  s.historyButton1 :s.historyButton}  key={S.idTurn} onClick={() => dispatch(loadState(S))}>
                {S.idTurn ? S.idTurn : "to start"}
            </button>
    )

    useEffect(() => { //инициализация карт первого и второго игрока
        if (!firstUserMap.length || !secondUserMap.length) {
            dispatch(setFirstUserMap(initializeTheMapFunction(null)))
            dispatch(setSecondUserMap(initializeTheMapFunction(null)))
        }
    });
    useEffect(() => { //расстановка кораблей компьютером
        if (comp.game && !settingShipUser.firstUser && settingShipUser.secondUser) { // заполнение поля компьютером
            dispatch(RandomSaga(false, secondUserMap)) //установка кораблей через сагу
            /* dispatch(setShipsRandom(false, secondUserMap)) //установка кораблей через санку  */
            dispatch(startGame(false)) //true - start game first user, false - start game second user
        }
    });
    useEffect(() => { //стрельба компьютера
        if (comp.game && !FUTurn && !settingShipUser.secondUser) { //ход компьютера
            if (comp.damaged) { // если был поврежден корабль
                let IndexElemMass = 0
                if (comp.sectorFire.length > 0) {
                    IndexElemMass = getRandomInt(comp.sectorFire.length)
                    dispatch(setShotUser(comp.sectorFire[IndexElemMass], false))
                } else {
                    dispatch(setShotUser(comp.sectorFire[IndexElemMass], false))
                }
                if (!comp.hit) {
                    dispatch(reduceSectorFire(IndexElemMass))
                }
            } else { //если нет поврежденных кораблей - стельба по карте
                let shipFireState = checkForShipFireComp(firstUserMap,) //поиск секторов для стрельбы
                dispatch(setShotUser(shipFireState[getRandomInt(shipFireState.length)], false))
            } //стрельба в случайный сектор из найденных
            if (FUShips.numberShips1 === 0 && FUShips.numberShips2 === 0 && // если у первого игроканет все корабли убиты - прекращается стрельба
                FUShips.numberShips3 === 0 && FUShips.numberShips4 === 0) {
                dispatch(setCompGame(false))
            }
        }
    },);
    useEffect(() => { // сохранение хода перед выстрелом
        if (FUTurn) { //ход 1 игрока
            dispatch(increaseIdTurn())
            dispatch(saveBattleMap(stateBattleMap))
        }
    }, [FUTurn]);


    if (!firstUserMap.length || !secondUserMap.length) return <Preloader/>
    return <div className={s.displayMapBattle}>
        <DeskUser firstUser={true} firstMap={firstUserMap} secondMap={secondUserMap}
                  SUShips={SUShips} FUShips={FUShips}
                  whatSetShip={whatSetShipFU} UserTurn={FUTurn}
                  deleteShipUser={deleteShipFU} comp={comp} settingShipUser={settingShipUser}/>
        {lookSecondUser &&
        <DeskUser firstUser={false} firstMap={secondUserMap} secondMap={firstUserMap}
                  SUShips={FUShips} FUShips={SUShips}
                  whatSetShip={whatSetShipSU} UserTurn={!FUTurn}
                  deleteShipUser={deleteShipSU} comp={comp} settingShipUser={settingShipUser}/>
        }
        <div>
            {saveList.length>1? buttonHistory :null}
        </div>
    </div>
}
export default PlaceBattle
