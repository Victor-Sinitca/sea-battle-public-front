import {AppStateType} from "./redux-store";
import {compType, SectorType, settingShipUser, ShipsType} from "../../Types/Types";
import {initialStateBattleMapType} from "./battleMap-reduсer";

export const getStateBattleMap = (state:AppStateType):initialStateBattleMapType =>{
    return state.battleMap
}
export const getFirstUserMap = (state:AppStateType):Array<Array<{sector:SectorType}>> =>{
    return state.battleMap.FUMap
}
export const getSecondUserMap =(state:AppStateType):Array<Array<{sector:SectorType}>> =>{
    return state.battleMap.SUMap
}
export const getComp =(state:AppStateType):compType=>{
    return state.battleMap.comp
}
export const getSettingShipUser =(state:AppStateType):settingShipUser=>{
    return state.battleMap.settingShipUser
}
export const getFUTurn =(state:AppStateType):boolean=>{
    return state.battleMap.FUTurn.turn
}
export const getFUShips =(state:AppStateType):ShipsType=>{
    return state.battleMap.FUShips
}
export const getSUShips =(state:AppStateType):ShipsType=>{
    return state.battleMap.SUShips
}
export const getWhatSetShipFU =(state:AppStateType):number=>{
    return state.battleMap.whatSetShipFU
}
export const getWhatSetShipSU =(state:AppStateType):number=>{
    return state.battleMap.whatSetShipSU
}
export const getDeleteShipFU =(state:AppStateType):boolean=>{
    return state.battleMap.deleteShipFU
}
export const getDeleteShipSU =(state:AppStateType):boolean=>{
    return state.battleMap.deleteShipSU
}
export const getLookSecondUser =(state:AppStateType):boolean=>{
    return state.battleMap.lookSecondUser
}
export const getIdTurn = (state:AppStateType):number=>{
    return state.battleMap.idTurn
}



