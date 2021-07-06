import {initialStateBattleMapType} from "./battleMap-reduсer";

const SAVE_BATTLE_MAP = "SAVE_BATTLE_MAP"
const DELETE_SAVE_BATTLE_MAP = "DELETE_SAVE_BATTLE_MAP"


const initialState = {
    saveList: [] as Array<initialStateBattleMapType>
}

type initialStateType = typeof initialState
const saveBattleMapReducer = (state = initialState as initialStateType, action: ActionType) => {
    let stateCopy: initialStateType
    switch (action.type) {
        case SAVE_BATTLE_MAP:
            stateCopy = {...state}
            stateCopy.saveList=[...state.saveList]
            if (stateCopy.saveList.length > action.battleMap.idTurn){
                stateCopy.saveList.length=action.battleMap.idTurn
            }else{
            }
            stateCopy.saveList.push(JSON.parse(JSON.stringify(action.battleMap)))
            return stateCopy
        case DELETE_SAVE_BATTLE_MAP:
            return {
                ...state,
                saveList:[]
            }
        default:
            return state
    }
}
type ActionType = SaveBattleMapType | DeleteSaveBattleMapType
type SaveBattleMapType = {
    type: typeof SAVE_BATTLE_MAP
    battleMap: initialStateBattleMapType
}
export const saveBattleMap = (battleMap: initialStateBattleMapType): SaveBattleMapType => {
    return ({type: SAVE_BATTLE_MAP, battleMap})
};
type DeleteSaveBattleMapType = {
    type: typeof DELETE_SAVE_BATTLE_MAP
}
export const deleteSaveBattleMap = (): DeleteSaveBattleMapType => {
    return ({type: DELETE_SAVE_BATTLE_MAP})
};
export default saveBattleMapReducer;
