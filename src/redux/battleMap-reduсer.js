import {
    checkForShipInput,
    checkForShipInputComp,
    lockMap
} from "../commen/logics/CheckForShipInput/CheckForSingleShipInput";
import {deleteShipFromTheMap} from "../commen/logics/deleteShipFromTheMap/deleteShipFromTheMap";
import {getRandomInt} from "../commen/logics/getRandom/getRandom";
import {initializeTheMapFunction} from "../commen/logics/initializeTheMapFunction/initializeTheMapFunction";
import {put, takeEvery} from 'redux-saga/effects'
import {setShot} from "../commen/logics/setShot/setShot";
import {initialUserState} from "../commen/logics/initialState/initialState";
import {setShip} from "../commen/logics/setShip/setShip";

const SET_FIRST_USER_MAP = "SET_FIRST_USER_MAP"
const SET_SECOND_USER_MAP = "SET_SECOND_USER_MAP"
const DELETE_SHIP = "DELETE_SHIP"
const SET_SHIP_USER = "SET_SHIP_USER"
const TOGGLE_SETTING_SHIP = "TOGGLE_SETTING_SHIP"
const UNLOCK_FOR_SET_SHIP = "UNLOCK_FOR_SET_SHIP"
const LOCK_ALL_MAP = "LOCK_ALL_MAP"
const SET_WHAT_SET_SHIP = "SET_WHAT_SET_SHIP"
const SET_HORIZON = "SET_HORIZON"
const TOGGLE_DELETE_SHIP = "TOGGLE_DELETE_SHIP"
const START_GAME = "START_GAME"
const INCREASE_SECTOR_FIRE = "INCREASE_SECTOR_FIRE"
const SET_COMP_GAME = "SET_COMP_GAME"
const TOGGLE_LOOK_SECOND_USER = "TOGGLE_LOOK_SECOND_USER"
const INITIALIZE_THE_MAP = "INITIALIZE_THE_MAP"
const TOGGLE_GAME_WITH_COMP = "TOGGLE_GAME_WITH_COMP"
const INITIAL_STATE_USERS = "INITIAL_STATE_USERS"
const SET_SHOT_USER = "SET_SHOT_USER"
const RANDOM_SAGA = "RANDOM_SAGA"


let initialState = {
    FUMap: null,
    SUMap: null,

    FUTurn: {
        turn: true
    },
    comp: {
        game: true,
        damaged: false,
        hit: false,
        sectorFire: []
    },

    lookSecondUser: false,
    whatSetShipFU: null,
    whatSetShipSU: null,
    horizonSetShipFU: null,
    horizonSetShipSU: null,
    deleteShipFU: false,
    deleteShipSU: false,

    settingShipUser: {
        firstUser: true,
        secondUser: true,
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
    },
    SUShips: {
        ship1: 4,
        ship2: 3,
        ship3: 2,
        ship4: 1,
        numberShips1: 4,
        numberShips2: 3,
        numberShips3: 2,
        numberShips4: 1,
    },
}

const battleMapReducer = (state = initialState, action) => {
    let stateCopy = null
    switch (action.type) {
        case SET_WHAT_SET_SHIP:
            if (action.firstUser) return {...state, whatSetShipFU: action.ship}
            else return {...state, whatSetShipSU: action.ship}
        case SET_FIRST_USER_MAP:
            return {...state, FUMap: action.FUMap}
        case SET_SECOND_USER_MAP:
            return {...state, SUMap: action.SUMap}
        case DELETE_SHIP :
            stateCopy = {...state}
            if (action.firstUser) {
                stateCopy.FUMap = [...state.FUMap];
                stateCopy.FUMap = deleteShipFromTheMap(stateCopy.FUMap, action.sector, state.FUShips)
                stateCopy.deleteShipFU = false
                return stateCopy
            } else {
                stateCopy.SUMap = [...state.SUMap];
                stateCopy.SUMap = deleteShipFromTheMap(stateCopy.SUMap, action.sector, state.SUShips)
                stateCopy.deleteShipSU = false
                return stateCopy
            }
        case SET_SHIP_USER:
            return setShip(state, action)
        case SET_SHOT_USER:
            return setShot(state, action)
        case TOGGLE_SETTING_SHIP : {
            if (action.firstUser) {
                stateCopy = {...state}
                stateCopy.settingShipUser = {...state.settingShipUser}
                stateCopy.settingShipUser.firstUser = action.value
            } else {
                stateCopy = {...state}
                stateCopy.settingShipUser = {...state.settingShipUser}
                stateCopy.settingShipUser.secondUser = action.value
            }
            return stateCopy
        }
        case TOGGLE_DELETE_SHIP: {
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
        case UNLOCK_FOR_SET_SHIP : {
            if (action.firstUser) {
                stateCopy = {...state}
                stateCopy.FUMap = [...state.FUMap];
                stateCopy.FUMap = checkForShipInput(stateCopy.FUMap, state.horizonSetShipFU, action.shipValue)
                return stateCopy
            } else {
                stateCopy = {...state}
                stateCopy.SUMap = [...state.SUMap];
                stateCopy.SUMap = checkForShipInput(stateCopy.SUMap, state.horizonSetShipSU, action.shipValue)
                return stateCopy
            }
        }
        case LOCK_ALL_MAP: {
            if (action.firstUser) {
                stateCopy = {...state}
                stateCopy.FUMap = [...state.FUMap];
                stateCopy.FUMap = lockMap(stateCopy.FUMap)
                return stateCopy
            } else {
                stateCopy = {...state}
                stateCopy.SUMap = [...state.SUMap];
                stateCopy.SUMap = lockMap(stateCopy.SUMap)
                return stateCopy
            }
        }
        case SET_HORIZON: {
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
        case START_GAME: {
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
        case INCREASE_SECTOR_FIRE : {
            stateCopy = {...state}
            stateCopy.comp = {...state.comp}
            stateCopy.comp.sectorFire = [...state.comp.sectorFire]
            stateCopy.comp.sectorFire.splice(action.indexElement, 1)
            return stateCopy
        }
        case SET_COMP_GAME : {
            stateCopy = {...state}
            stateCopy.comp = {...state.comp}
            stateCopy.comp.game = false
            return stateCopy
        }
        case TOGGLE_LOOK_SECOND_USER: {
            stateCopy = {...state}
            stateCopy.lookSecondUser = !stateCopy.lookSecondUser
            return stateCopy
        }
        case INITIALIZE_THE_MAP: {
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
        case TOGGLE_GAME_WITH_COMP: {
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
        case INITIAL_STATE_USERS: {
            return initialUserState(state)
        }
        default:
            return state
    }
}

export const setWhatSetShip = (ship, firstUser) => {
    return ({type: SET_WHAT_SET_SHIP, ship, firstUser})
};
export const setFirstUserMap = (FUMap) => {
    return ({type: SET_FIRST_USER_MAP, FUMap})
};
export const setSecondUserMap = (SUMap) => {
    return ({type: SET_SECOND_USER_MAP, SUMap})
};
export const setShipUser = (sector, firstUser) => {
    return ({type: SET_SHIP_USER, sector, firstUser})
};
export const setShotUser = (sector, firstUser) => {
    return ({type: SET_SHOT_USER, sector, firstUser})
};
export const toggleDeleteShip = (firstUser) => {
    return ({type: TOGGLE_DELETE_SHIP, firstUser})
};
export const unlockForSetShip = (shipValue, horizon, firstUser,) => {
    return ({type: UNLOCK_FOR_SET_SHIP, shipValue, horizon, firstUser,})
};
export const lockAllMap = (firstUser) => {
    return ({type: LOCK_ALL_MAP, firstUser})
};
export const setHorizon = (horizon, firstUser) => {
    return ({type: SET_HORIZON, horizon, firstUser})
};
export const deleteShipOnMap = (sector, firstUser) => {
    return ({type: DELETE_SHIP, sector, firstUser})
};
export const startGame = (firstUser) => {
    return ({type: START_GAME, firstUser})
};
export const reduceSectorFire = (indexElement) => {
    return ({type: INCREASE_SECTOR_FIRE, indexElement})
};
export const setCompGame = (value) => {
    return ({type: SET_COMP_GAME, value})
};
export const toggleLookSecondUser = (value) => {
    return ({type: TOGGLE_LOOK_SECOND_USER, value})
};
export const clearTheMap = (firstUser) => {
    return ({type: INITIALIZE_THE_MAP, firstUser})
};
export const toggleGameWithComp = () => {
    return ({type: TOGGLE_GAME_WITH_COMP})
};
export const startNewGame = () => {
    return ({type: INITIAL_STATE_USERS})
};


export const setShipsRandom = (firstUser, userMap) => { //санка (реализована расстановка кораблей по кнопке)
    return dispatch => {
        dispatch(clearTheMap(firstUser))
        let horizon = true;
        let shipInputState;
        for (let shipValue = 4; shipValue >= 1; shipValue--) {
            for (let numberOfShips = shipValue; numberOfShips <= 4; numberOfShips++) {
                horizon = getRandomInt(2)
                shipInputState = checkForShipInputComp(userMap, horizon, shipValue);
                dispatch(setWhatSetShip(shipValue, firstUser))
                dispatch(setHorizon(horizon, firstUser))
                dispatch(unlockForSetShip(shipValue, horizon, firstUser))
                dispatch(setShipUser(shipInputState[getRandomInt(shipInputState.length)], firstUser))
            }
        }
    }
}

export const RandomSaga = (firstUser, userMap) => {
    return ({type: RANDOM_SAGA, firstUser, userMap})
};

export function* watchSetShipsRandomSaga() {
    yield takeEvery(RANDOM_SAGA, fetchSetShipsRandomSaga);
}

function* fetchSetShipsRandomSaga(action) {   //сага (реализована расстановка кораблей ИИ в useEffect)
    try {
        yield put(clearTheMap(action.firstUser));
        let horizon = true;
        let shipInputState;
        for (let shipValue = 4; shipValue >= 1; shipValue--) {
            for (let numberOfShips = shipValue; numberOfShips <= 4; numberOfShips++) {
                horizon = getRandomInt(2)
                shipInputState = checkForShipInputComp(action.userMap, horizon, shipValue);
                yield put(setWhatSetShip(shipValue, action.firstUser));
                yield put(setHorizon(horizon, action.firstUser));
                yield put(unlockForSetShip(shipValue, horizon, action.firstUser));
                yield put(setShipUser(shipInputState[getRandomInt(shipInputState.length)], action.firstUser));
            }
        }
    } catch (error) {console.log("error when installing ships AI (SAGA)")}
}


export default battleMapReducer;