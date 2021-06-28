import {
    checkForShipInput,
    lockMap
} from "../commen/logics/checkForShipInput/checkForSingleShipInput";
import {deleteShipFromTheMap} from "../commen/logics/deleteShipFromTheMap/deleteShipFromTheMap";
import {getRandomInt} from "../commen/logics/getRandom/getRandom";
import {initializeTheMapFunction} from "../commen/logics/initializeTheMapFunction/initializeTheMapFunction";
import {put, takeEvery} from 'redux-saga/effects'
import {setShot} from "../commen/logics/setShot/setShot";
import {initialUserState,} from "../commen/logics/initialState/initialState";
import {setShip} from "../commen/logics/setShip/setShip";
import {compType, SectorType, ShipsType} from "../../Types/Types";
import {Dispatch} from "redux";
import {InferActionsTypes} from "./redux-store";

const RANDOM_SAGA = "RANDOM_SAGA"

const initialState = {
    FUMap: [] as Array<Array<{ sector: SectorType }>>,
    SUMap: [] as Array<Array<{ sector: SectorType }>>,
    FUTurn: {
        turn: true as boolean
    },
    comp: {
        game: true,
        damaged: false,
        hit: false,
        sectorFire: []
    } as compType,
    lookSecondUser: false as boolean,
    whatSetShipFU: 0 as number,
    whatSetShipSU: 0 as number,
    horizonSetShipFU: null as null | boolean,
    horizonSetShipSU: null as null | boolean,
    deleteShipFU: false as boolean,
    deleteShipSU: false as boolean,

    settingShipUser: {
        firstUser: true as boolean,
        secondUser: true as boolean,
    },

    FUShips: {
        ship1: 4,
        ship2: 3,
        ship3: 2,
        ship4: 1,
        numberShips1: 4,
        numberShips2: 3,
        numberShips3: 2,
        numberShips4: 1,
    } as ShipsType,
    SUShips: {
        ship1: 4,
        ship2: 3,
        ship3: 2,
        ship4: 1,
        numberShips1: 4,
        numberShips2: 3,
        numberShips3: 2,
        numberShips4: 1,
    } as ShipsType,
    idTurn: 0 as number,
}

export type initialStateBattleMapType = typeof initialState
const battleMapReducer = (state = initialState as initialStateBattleMapType, action: BattleMapActionType ) => {
    let stateCopy: initialStateBattleMapType
    switch (action.type) {
        case "SET_WHAT_SET_SHIP":
            if (action.firstUser) return {...state, whatSetShipFU: action.ship}
            else return {...state, whatSetShipSU: action.ship}
        case "SET_FIRST_USER_MAP":
            return {...state, FUMap: action.FUMap}
        case "SET_SECOND_USER_MAP":
            return {...state, SUMap: action.SUMap}
        case "DELETE_SHIP" :
            stateCopy = {...state}
            if (action.firstUser && state.FUMap) {
                stateCopy.FUMap = [...state.FUMap];
                stateCopy.FUMap = deleteShipFromTheMap(stateCopy.FUMap, action.sector, state.FUShips)
                stateCopy.deleteShipFU = false
                return stateCopy
            } else if (state.SUMap) {
                stateCopy.SUMap = [...state.SUMap];
                stateCopy.SUMap = deleteShipFromTheMap(stateCopy.SUMap, action.sector, state.SUShips)
                stateCopy.deleteShipSU = false
                return stateCopy
            } else {
                console.log(`Error DELETE_SHIP. First User is ${action.firstUser}`)
                return stateCopy
            }
        case "SET_SHIP_USER":
            return setShip(state, action)
        case "SET_SHOT_USER":
            return setShot(state, action)
        case "TOGGLE_DELETE_SHIP": {
            if (action.firstUser) {
                if (state.deleteShipFU) {
                    return {...state, deleteShipFU: false}
                } else return {...state, deleteShipFU: true}
            } else {
                if (state.deleteShipSU) {
                    return {...state, deleteShipSU: false}
                } else return {...state, deleteShipSU: true}
            }
        }
        case "UNLOCK_FOR_SET_SHIP" : {
            if (action.firstUser && state.FUMap) {
                stateCopy = {...state}
                stateCopy.FUMap = [...state.FUMap];
                stateCopy.FUMap = checkForShipInput(stateCopy.FUMap, action.horizon, action.shipValue, true).userMap
                return stateCopy
            } else if (state.SUMap) {
                stateCopy = {...state}
                stateCopy.SUMap = [...state.SUMap];
                stateCopy.SUMap = checkForShipInput(stateCopy.SUMap, action.horizon, action.shipValue, true).userMap
                return stateCopy
            } else {
                console.log(`Error UNLOCK_FOR_SET_SHIP. First User is ${action.firstUser}`)
                return state
            }
        }
        case "LOCK_ALL_MAP": {
            if (action.firstUser && state.FUMap) {
                stateCopy = {...state}
                stateCopy.FUMap = [...state.FUMap];
                stateCopy.FUMap = lockMap(stateCopy.FUMap)
                return stateCopy
            } else if (state.SUMap) {
                stateCopy = {...state}
                stateCopy.SUMap = [...state.SUMap];
                stateCopy.SUMap = lockMap(stateCopy.SUMap)
                return stateCopy
            } else {
                console.log(`Error LOCK_ALL_MAP. First User is ${action.firstUser}`)
                return state
            }
        }
        case "SET_HORIZON": {
            if (action.firstUser) {
                stateCopy = {...state}
                stateCopy.horizonSetShipFU = action.horizon
                return stateCopy
            } else {
                stateCopy = {...state}
                stateCopy.horizonSetShipSU = action.horizon
                return stateCopy
            }
        }
        case "START_GAME": {
            if (action.firstUser) {
                stateCopy = {...state}
                stateCopy.settingShipUser = {...state.settingShipUser}
                stateCopy.settingShipUser.firstUser = false
                return stateCopy
            } else {
                stateCopy = {...state}
                stateCopy.settingShipUser = {...state.settingShipUser}
                stateCopy.settingShipUser.secondUser = false
                return stateCopy
            }
        }
        case "INCREASE_SECTOR_FIRE" : {
            stateCopy = {...state}
            stateCopy.comp = {...state.comp}
            stateCopy.comp.sectorFire = [...state.comp.sectorFire]
            stateCopy.comp.sectorFire.splice(action.indexElement, 1)
            return stateCopy
        }
        case "SET_COMP_GAME" : {
            stateCopy = {...state}
            stateCopy.comp = {...state.comp}
            stateCopy.comp.game = action.value
            return stateCopy
        }
        case "TOGGLE_LOOK_SECOND_USER": {
            stateCopy = {...state}
            stateCopy.lookSecondUser = !stateCopy.lookSecondUser
            return stateCopy
        }
        case "INITIALIZE_THE_MAP": {
            if (action.firstUser) {
                stateCopy = {...state}
                stateCopy.FUMap = initializeTheMapFunction(stateCopy.FUMap)
                stateCopy.FUShips = {...state.FUShips}
                stateCopy.FUShips.ship1 = 4
                stateCopy.FUShips.ship2 = 3
                stateCopy.FUShips.ship3 = 2
                stateCopy.FUShips.ship4 = 1
                return stateCopy
            } else {
                stateCopy = {...state}
                stateCopy.SUMap = initializeTheMapFunction(stateCopy.SUMap)
                stateCopy.SUShips = {...state.SUShips}
                stateCopy.SUShips.ship1 = 4
                stateCopy.SUShips.ship2 = 3
                stateCopy.SUShips.ship3 = 2
                stateCopy.SUShips.ship4 = 1
                return stateCopy
            }
        }
        case "TOGGLE_GAME_WITH_COMP": {
            stateCopy = {...state}
            stateCopy.comp = {...state.comp}
            if (state.comp.game) {
                stateCopy.comp.game = false
                stateCopy.lookSecondUser = true
                return stateCopy
            } else {
                stateCopy.comp.game = true
                stateCopy.lookSecondUser = false
                return stateCopy
            }
        }
        case "INITIAL_STATE_USERS": {
            return initialUserState(state)
        }
        case "LOAD_STATE": {
            stateCopy = JSON.parse(JSON.stringify(action.state))
            stateCopy.idTurn = action.state.idTurn + 1
            return stateCopy
        }
        case "INCREASE_ID_TURN": {
            return {
                ...state,
                idTurn: state.idTurn + 1
            }
        }
        default:
            return state
    }
}


type DispatchType = Dispatch<BattleMapActionType>
type BattleMapActionType = InferActionsTypes<typeof actionBattleMap>

export const actionBattleMap = {
    setWhatSetShip: (ship: number, firstUser: boolean) => {
        return ({type: "SET_WHAT_SET_SHIP", ship, firstUser} as const)
    },
    setFirstUserMap: (FUMap: Array<Array<{ sector: SectorType }>>) => {
        return ({type: "SET_FIRST_USER_MAP", FUMap} as const)
    },
    setSecondUserMap: (SUMap: Array<Array<{ sector: SectorType }>>) => {
        return ({type: "SET_SECOND_USER_MAP", SUMap} as const)
    },
    setShipUser: (sector: SectorType, firstUser: boolean, horizonSetShip:boolean,whatSetShip:number) => {
        return ({type: "SET_SHIP_USER", sector, firstUser,horizonSetShip,whatSetShip} as const)
    },
    setShotUser: (sector: SectorType, firstUser: boolean) => {
        return ({type: "SET_SHOT_USER", sector, firstUser} as const)
    },
    toggleDeleteShip: (firstUser: boolean) => {
        return ({type: "TOGGLE_DELETE_SHIP", firstUser} as const)
    },
    unlockForSetShip: (shipValue: number, horizon: boolean, firstUser: boolean,) => {
        return ({type: "UNLOCK_FOR_SET_SHIP", shipValue, horizon, firstUser,} as const)
    },
    lockAllMap: (firstUser: boolean) => {
        return ({type: "LOCK_ALL_MAP", firstUser} as const)
    },
    setHorizon: (horizon: boolean, firstUser: boolean) => {
        return ({type: "SET_HORIZON", horizon, firstUser} as const)
    },
    deleteShipOnMap: (sector: SectorType, firstUser: boolean) => {
        return ({type: "DELETE_SHIP", sector, firstUser} as const)
    },
    startGames: (firstUser: boolean) => {
        return ({type: "START_GAME", firstUser} as const)
    },
    reduceSectorFire: (indexElement: number) => {
        return ({type: "INCREASE_SECTOR_FIRE", indexElement} as const)
    },
    setCompGame: (value: boolean) => {
        return ({type: "SET_COMP_GAME", value} as const)
    },
    toggleLookSecondUser: () => {
        return ({type: "TOGGLE_LOOK_SECOND_USER"} as const)
    },
    clearTheMap: (firstUser: boolean) => {
        return ({type: "INITIALIZE_THE_MAP", firstUser} as const)
    },
    toggleGameWithComp: () => {
        return ({type: "TOGGLE_GAME_WITH_COMP"} as const)
    },
    startNewGame: () => {
        return ({type: "INITIAL_STATE_USERS"} as const)
    },
    loadState: (state: initialStateBattleMapType) => {
        return ({type: "LOAD_STATE", state} as const)
    },
    increaseIdTurn: () => { return ({type: "INCREASE_ID_TURN"} as const)},
}




export const setShipsRandom = (firstUser: boolean, userMap: Array<Array<{ sector: SectorType }>>) => { //санка (реализована расстановка кораблей по кнопке)
    return (dispatch: DispatchType) => {
        dispatch(actionBattleMap.clearTheMap(firstUser))
        let horizon = true;
        let shipInputState = [];
        for (let shipValue = 4; shipValue >= 1; shipValue--) {
            for (let numberOfShips = shipValue; numberOfShips <= 4; numberOfShips++) {
                horizon = Boolean(getRandomInt(2))
                shipInputState = checkForShipInput(userMap, horizon, shipValue, false).shipInputState;
                dispatch(actionBattleMap.setWhatSetShip(shipValue, firstUser))
                dispatch(actionBattleMap.setHorizon(horizon, firstUser))
                dispatch(actionBattleMap.unlockForSetShip(shipValue, horizon, firstUser))
                dispatch(actionBattleMap.setShipUser(shipInputState[getRandomInt(shipInputState.length)], firstUser,horizon,shipValue))
            }
        }
    }
}

type RandomSagaType = {
    type: typeof RANDOM_SAGA
    firstUser: boolean
    userMap: Array<Array<{ sector: SectorType }>>
}
export const RandomSaga = (firstUser: boolean, userMap: Array<Array<{ sector: SectorType }>>): RandomSagaType => {
    return ({type: RANDOM_SAGA, firstUser, userMap})
};

export function* watchSetShipsRandomSaga() {
    yield takeEvery(RANDOM_SAGA, fetchSetShipsRandomSaga);
}

function* fetchSetShipsRandomSaga(action: RandomSagaType) {   //сага (реализована расстановка кораблей ИИ в useEffect (для примера))
    try {
        yield put(actionBattleMap.clearTheMap(action.firstUser));
        let horizon = true;
        let shipInputState = [] as [] | Array<SectorType>;
        for (let shipValue = 4; shipValue >= 1; shipValue--) {
            for (let numberOfShips = shipValue; numberOfShips <= 4; numberOfShips++) {
                horizon = Boolean(getRandomInt(2))
                shipInputState = checkForShipInput(action.userMap, horizon, shipValue, false).shipInputState;
                yield put(actionBattleMap.setWhatSetShip(shipValue, action.firstUser));
                yield put(actionBattleMap.setHorizon(horizon, action.firstUser));
                yield put(actionBattleMap.unlockForSetShip(shipValue, horizon, action.firstUser));
                yield put(actionBattleMap.setShipUser(shipInputState[getRandomInt(shipInputState.length)], action.firstUser,horizon,shipValue));
            }
        }
    } catch (error) {
        console.log("error when installing ships AI (SAGA)")
    }
}


export default battleMapReducer;
