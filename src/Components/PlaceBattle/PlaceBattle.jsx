import React, {useEffect} from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./PlaceBattle.module.css"
import DeskUser from "../DeskUser/DeskUser";
import {checkForShipFireComp} from "../../commen/logics/CheckForShipInput/CheckForSingleShipInput";
import {getRandomInt} from "../../commen/logics/getRandom/getRandom";
import {useDispatch, useSelector} from "react-redux";
import {
    increaseSectorFire, setCompGame,
    setFirstUserMap,
    setSecondUserMap,
    setShipsRandom, setShotSecondUser,
    startGame,
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
    const dispatch = useDispatch()


    useEffect(() => { //инициализация карт первого и второго игрока
        if (!firstUserMap || !secondUserMap) {
            const setSector=(i,j)=>{
                return{sector: {
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
                    userMap1[i][j] =setSector(i,j)
                    userMap2[i][j] =setSector(i,j)
                }
            }
            dispatch(setFirstUserMap(userMap1))
            dispatch(setSecondUserMap(userMap2))
        }
    });
    useEffect(() => { //расстановка кораблей компьютером
        if (comp.game && !settingShipUser.firstUser && settingShipUser.secondUser) { // заполнение поля компьютером
            dispatch(setShipsRandom(false, secondUserMap))
            dispatch(startGame(false)) //true - start game first user, false - start game second user
        }
    });
    useEffect(() => { //стрельба компьютера
        if (comp.game && !FUTurn && !settingShipUser.secondUser) { //ход компьютера
                if (comp.damaged) { // если был поврежден корабль
                    let IndexElemMass = 0
                    if (comp.sectorFire.length > 0) {
                        IndexElemMass = getRandomInt(comp.sectorFire.length)
                        dispatch(setShotSecondUser(comp.sectorFire[IndexElemMass]))
                    } else {
                        dispatch(setShotSecondUser(comp.sectorFire[IndexElemMass]))
                    }
                    if (!comp.hit) {
                        dispatch(increaseSectorFire(IndexElemMass))
                    }
                } else { //если нет поврежденных кораблей - стельба по карте
                    let shipFireState = checkForShipFireComp(firstUserMap,) //поиск секторов для стрельбы
                    dispatch(setShotSecondUser(shipFireState[getRandomInt(shipFireState.length)])) //стрельба в случайный сектор из найденных
                }
                if (FUShips.numberShips1 === 0 && FUShips.numberShips2 === 0 && // если у первого игроканет все корабли убиты - прекращается стрельба
                    FUShips.numberShips3 === 0 && FUShips.numberShips4 === 0) {
                    dispatch(setCompGame(false))
                }
        }
    },);



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
                      deleteShipUser={deleteShipSU} />
        }
    </div>
}
export default PlaceBattle