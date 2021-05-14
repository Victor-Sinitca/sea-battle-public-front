import {initialStateBattleMapType} from "./battleMap-reduсer";

const SAVE_BATTLE_MAP = "SAVE_BATTLE_MAP"


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
        default:
            return state
    }
}
type ActionType = SaveBattleMapType
type SaveBattleMapType = {
    type: typeof SAVE_BATTLE_MAP
    battleMap: initialStateBattleMapType
}
export const saveBattleMap = (battleMap: initialStateBattleMapType): SaveBattleMapType => {
    return ({type: SAVE_BATTLE_MAP, battleMap})
};
export default saveBattleMapReducer;