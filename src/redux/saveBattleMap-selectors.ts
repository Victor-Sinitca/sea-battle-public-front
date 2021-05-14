import {AppStateType} from "./redux-store";
import {initialStateBattleMapType} from "./battleMap-reduсer";


export const getSaveList = (state:AppStateType):Array<initialStateBattleMapType>=>{
    return state.saveBattleMap.saveList
}




