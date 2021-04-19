import {initializeTheMapFunction} from "../initializeTheMapFunction/initializeTheMapFunction";

export const initialUserState=(state)=>{
    let stateCopy = {...state}
    stateCopy.FUMap = [...state.FUMap];
    stateCopy.SUMap = [...state.SUMap];
    stateCopy.FUTurn = {...state.FUTurn};
    stateCopy.comp = {...state.comp};
    stateCopy.settingShipUser = {...state.settingShipUser};
    stateCopy.FUShips = {...state.FUShips};
    stateCopy.SUShips = {...state.SUShips};
    stateCopy.FUMap = initializeTheMapFunction(stateCopy.FUMap)
    stateCopy.SUMap = initializeTheMapFunction(stateCopy.SUMap)
    stateCopy.FUShips.ship1 = 4
    stateCopy.FUShips.ship2 = 3
    stateCopy.FUShips.ship3 = 2
    stateCopy.FUShips.ship4 = 1
    stateCopy.FUShips.numberShips1 = 4
    stateCopy.FUShips.numberShips2 = 3
    stateCopy.FUShips.numberShips3 = 2
    stateCopy.FUShips.numberShips4 = 1
    stateCopy.SUShips.ship1 = 4
    stateCopy.SUShips.ship2 = 3
    stateCopy.SUShips.ship3 = 2
    stateCopy.SUShips.ship4 = 1
    stateCopy.SUShips.numberShips1 = 4
    stateCopy.SUShips.numberShips2 = 3
    stateCopy.SUShips.numberShips3 = 2
    stateCopy.SUShips.numberShips4 = 1
    stateCopy.comp.game = true
    stateCopy.comp.damaged = false
    stateCopy.comp.hit = false
    stateCopy.comp.sectorFire = []
    stateCopy.FUTurn.turn = true
    stateCopy.lookSecondUser = false
    stateCopy.whatSetShipFU = null
    stateCopy.whatSetShipSU = null
    stateCopy.horizonSetShipFU = null
    stateCopy.horizonSetShipSU = null
    stateCopy.deleteShipFU = false
    stateCopy.deleteShipSU = false
    stateCopy.settingShipUser.secondUser = true
    stateCopy.settingShipUser.firstUser = true
    return stateCopy
}