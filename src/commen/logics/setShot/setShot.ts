import {fireAfterHitComp, killShip} from "../killShip/killShip";
import {initialStateBattleMapType, } from "../../../redux/battleMap-reduсer";
import {SectorType} from "../../../../Types/Types";


export const setShot = (state:initialStateBattleMapType,action:{sector: SectorType, firstUser: boolean}):initialStateBattleMapType => {
    let uMap = "FUMap" as "FUMap" | "SUMap",
        uShips = "FUShips" as "FUShips" |"SUShips"
    if (action.firstUser) {
        uMap = "SUMap"
        uShips = "SUShips"
    }
    if (!state[uMap][action.sector.y][action.sector.x].sector.shot) { // если не стреляли по сектору, то среляем и выполняем проверку на убит/не убит
        let stateCopy = {...state}
        stateCopy[uMap] = [...state[uMap]];
        stateCopy[uMap][action.sector.y][action.sector.x].sector.shot = true // установка попадания в сектор
        if (stateCopy[uMap][action.sector.y][action.sector.x].sector.ship) { // если в секторе был корабль
            let stateKillShip = killShip(action.sector, stateCopy[uMap], stateCopy[uShips]) // проверка - убит ли корабль
            if (stateKillShip.kill) { //если корабль убит - отрисовываем секторы вокруг корабля и отнимаем убитый корабль
                stateCopy[uMap] = [...stateKillShip.map]
                stateCopy[uShips] = {...stateKillShip.ships}
            }
            if (state.comp.game && !stateKillShip.kill && stateKillShip.hit && !state.FUTurn.turn) { //если стрелял ИИ, попал, но не убил
                stateCopy.comp.sectorFire = [...fireAfterHitComp(stateCopy[uMap], action.sector)] //запоминание секторов для следующей стрельбы
                stateCopy.comp.damaged = true //стстус - поврежден
                stateCopy.comp.hit = true //статус - попал
            } else if (state.comp.game && stateKillShip.kill && !state.FUTurn.turn) { //если стрелял ИИ, попал, убил
                stateCopy.comp.damaged = false //статус - не поврежден
            }
        } else { // если в секторе нет корабля
            if (state.comp.game && !state.FUTurn.turn) { // если стелял ИИ
                stateCopy.comp.hit = false //статус - промах
            }
            stateCopy.FUTurn = {...state.FUTurn}
            stateCopy.FUTurn.turn = !stateCopy.FUTurn.turn; //передача хода
        }
        return stateCopy
    } else return state //если уже стреляли по сектору - ничего не делаем и продолжаем стрельбу
}
