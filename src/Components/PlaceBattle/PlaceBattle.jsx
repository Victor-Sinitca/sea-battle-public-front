import React, {useEffect} from "react";
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
    startGame, setShotUser, saveState, loadState,
} from "../../redux/battleMap-reduсer";


let PlaceBattle = () => {
    const firstUserMap = useSelector(state => state.battleMap.FUMap);
    const secondUserMap = useSelector(state => state.battleMap.SUMap);
    const comp = useSelector(state => state.battleMap.comp);
    const settingShipUser = useSelector(state => state.battleMap.settingShipUser);
    const FUTurn = useSelector(state => state.battleMap.FUTurn.turn);
    const FUShips = useSelector(state => state.battleMap.FUShips);
    const SUShips = useSelector(state => state.battleMap.SUShips);
    const whatSetShipFU = useSelector(state => state.battleMap.whatSetShipFU);
    const whatSetShipSU = useSelector(state => state.battleMap.whatSetShipSU);
    const deleteShipFU = useSelector(state => state.battleMap.deleteShipFU);
    const deleteShipSU = useSelector(state => state.battleMap.deleteShipSU);
    const lookSecondUser = useSelector(state => state.battleMap.lookSecondUser);
    const history = useSelector(state => state.battleMap.history);

    const dispatch = useDispatch()


    const buttonHistory=history.savedState.map(h=>
        <button className={s.historyButton} key={history.savedState.indexOf(h)} onClick={()=>dispatch(loadState(history.savedState.indexOf(h)))}>
            {history.savedState.indexOf(h)===0? "Начало игры"
                :history.savedState.indexOf(h)=== history.savedState.length-1 ? "Текущий ход"
                    : history.savedState.indexOf(h) === history.savedState.length-2 ? "Прошлый ход"
                        :"Позапрошлый ход"
            }
        </button>
    )

    useEffect(() => { //инициализация карт первого и второго игрока
        if (!firstUserMap || !secondUserMap) {
            const setSector = (i, j) => {
                return {
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
            let userMap1 = [], userMap2 = [], i, j
            for (i = 0; i < 10; i++) {
                userMap1[i] = []
                userMap2[i] = []
                for (j = 0; j < 10; j++) {
                    userMap1[i][j] = setSector(i, j)
                    userMap2[i][j] = setSector(i, j)
                }
            }
            dispatch(setFirstUserMap(userMap1))
            dispatch(setSecondUserMap(userMap2))
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
    useEffect(() => { //стрельба компьютера
        if (FUTurn) { //ход 1 игрока
            dispatch(saveState(history.idTurn))
        }
    },[FUTurn]);


    if (!firstUserMap || !secondUserMap) return <Preloader/>
    return <div className={s.displayMapBattle}>
        <DeskUser firstUser={true} firstMap={firstUserMap} secondMap={secondUserMap}
                  SUShips={SUShips} FUShips={FUShips}
                  whatSetShip={whatSetShipFU} UserTurn={FUTurn}
                  deleteShipUser={deleteShipFU}/>
        {lookSecondUser &&
        <DeskUser firstUser={false} firstMap={secondUserMap} secondMap={firstUserMap}
                  SUShips={FUShips} FUShips={SUShips}
                  whatSetShip={whatSetShipSU} UserTurn={!FUTurn}
                  deleteShipUser={deleteShipSU}/>
        }
        <div className={s.displayHistory}>
            {comp.game && buttonHistory}
        </div>
    </div>
}
export default PlaceBattle