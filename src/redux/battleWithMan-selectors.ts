import {AppStateType} from "./redux-store";
import {compType, SectorType, settingShipUserType, ShipsType} from "../../Types/Types";
import {initialStateBattleMapType} from "./battleMap-reduсer";

export const getStateBattleMap = (state:AppStateType):initialStateBattleMapType =>{
    return state.battleMapWithMan
}
export const getFirstUserMap = (state:AppStateType):Array<Array<{sector:SectorType}>> =>{
    return state.battleMapWithMan.FUMap
}
export const getSecondUserMap =(state:AppStateType):Array<Array<{sector:SectorType}>> =>{
    return state.battleMapWithMan.SUMap
}
export const getComp =(state:AppStateType):compType=>{
    return state.battleMapWithMan.comp
}
export const getSettingShipUser =(state:AppStateType):settingShipUserType=>{
    return state.battleMapWithMan.settingShipUser
}
export const getFUTurn =(state:AppStateType):boolean=>{
    return state.battleMapWithMan.FUTurn.turn
}
export const getFUShips =(state:AppStateType):ShipsType=>{
    return state.battleMapWithMan.FUShips
}
export const getSUShips =(state:AppStateType):ShipsType=>{
    return state.battleMapWithMan.SUShips
}
export const getWhatSetShipFU =(state:AppStateType):number=>{
    return state.battleMapWithMan.whatSetShipFU
}
export const getDeleteShipFU =(state:AppStateType):boolean=>{
    return state.battleMapWithMan.deleteShipFU
}




