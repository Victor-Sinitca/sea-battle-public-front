import {lockMap} from "../checkForShipInput/checkForSingleShipInput";
import { initialStateBattleMapType, setShipUserType} from "../../../redux/battleMap-reduсer";



export const setShip=(state:initialStateBattleMapType, action:setShipUserType):initialStateBattleMapType=>{
    let stateCopy:initialStateBattleMapType
    let map="SUMap" as "SUMap"|"FUMap", horizonSetShip= "horizonSetShipSU" as "horizonSetShipSU"|"horizonSetShipFU",
        whatSetShip="whatSetShipSU" as "whatSetShipSU" | "whatSetShipFU" ,
        ships= "SUShips" as "SUShips" | "FUShips"

    if (action.firstUser) {
        map = "FUMap"
        horizonSetShip = "horizonSetShipFU"
        whatSetShip = "whatSetShipFU"
        ships = "FUShips"
    }

    stateCopy = {...state};
    stateCopy[map] = [...state[map]];
    if (state[horizonSetShip]) {
        stateCopy[map][action.sector.y][action.sector.x].sector.ship = true
        if (state[whatSetShip] === 1) {
            stateCopy[map][action.sector.y][action.sector.x].sector.img = 1
        }
        if (state[whatSetShip] > 1) {
            stateCopy[map][action.sector.y][action.sector.x].sector.img = 21
            stateCopy[map][action.sector.y][action.sector.x + 1].sector.img = 22
            stateCopy[map][action.sector.y][action.sector.x + 1].sector.ship = true
        }
        if (state[whatSetShip] > 2) {
            stateCopy[map][action.sector.y][action.sector.x].sector.img = 31
            stateCopy[map][action.sector.y][action.sector.x + 1].sector.img = 32
            stateCopy[map][action.sector.y][action.sector.x + 2].sector.img = 33
            stateCopy[map][action.sector.y][action.sector.x + 2].sector.ship = true
        }
        if (state[whatSetShip] > 3) {
            stateCopy[map][action.sector.y][action.sector.x].sector.img = 41
            stateCopy[map][action.sector.y][action.sector.x + 1].sector.img = 42
            stateCopy[map][action.sector.y][action.sector.x + 2].sector.img = 43
            stateCopy[map][action.sector.y][action.sector.x + 3].sector.img = 44
            stateCopy[map][action.sector.y][action.sector.x + 3].sector.ship = true
        }
    } else {
        stateCopy[map][action.sector.y][action.sector.x].sector.ship = true
        if (state[whatSetShip] === 1) {
            stateCopy[map][action.sector.y][action.sector.x].sector.img = 1
        }
        if (state[whatSetShip] > 1) {
            stateCopy[map][action.sector.y][action.sector.x].sector.img = 221
            stateCopy[map][action.sector.y + 1][action.sector.x].sector.img = 211
            stateCopy[map][action.sector.y + 1][action.sector.x].sector.ship = true
        }
        if (state[whatSetShip] > 2) {
            stateCopy[map][action.sector.y][action.sector.x].sector.img = 331
            stateCopy[map][action.sector.y + 1][action.sector.x].sector.img = 321
            stateCopy[map][action.sector.y + 2][action.sector.x].sector.img = 311
            stateCopy[map][action.sector.y + 2][action.sector.x].sector.ship = true
        }
        if (state[whatSetShip] > 3) {
            stateCopy[map][action.sector.y][action.sector.x].sector.img = 441
            stateCopy[map][action.sector.y + 1][action.sector.x].sector.img = 431
            stateCopy[map][action.sector.y + 2][action.sector.x].sector.img = 421
            stateCopy[map][action.sector.y + 3][action.sector.x].sector.img = 411
            stateCopy[map][action.sector.y + 3][action.sector.x].sector.ship = true
        }
    }
    stateCopy[horizonSetShip] = null
    stateCopy[map] = lockMap(stateCopy[map])
    if (state[whatSetShip] === 1) {
        stateCopy[ships].ship1 -= 1
    }
    if (state[whatSetShip] === 2) {
        stateCopy[ships].ship2 -= 1
    }
    if (state[whatSetShip] === 3) {
        stateCopy[ships].ship3 -= 1
    }
    if (state[whatSetShip] === 4) {
        stateCopy[ships].ship4 -= 1
    }
    stateCopy[whatSetShip] = 0
    return stateCopy

}