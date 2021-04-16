import {
    checkForShipInput,
    checkForShipInputComp,
    lockMap
} from "../commen/logics/CheckForShipInput/CheckForSingleShipInput";
import {deleteShipFromTheMap} from "../commen/logics/deleteShipFromTheMap/deleteShipFromTheMap";
import {fireAfterHitComp, killShip} from "../commen/logics/KillShip/KillShip";
import {getRandomInt} from "../commen/logics/getRandom/getRandom";
import {initializeTheMapFunction} from "../commen/logics/initializeTheMapFunction/initializeTheMapFunction";
import {put, takeEvery} from 'redux-saga/effects'

const SET_FIRST_USER_MAP = "SET_FIRST_USER_MAP"
const SET_SECOND_USER_MAP = "SET_SECOND_USER_MAP"
const DELETE_SHIP = "DELETE_SHIP"
const SET_SHIP_USER = "SET_SHIP_USER"
const SET_SHOT_FIRST_USER = "SET_SHOT_FIRST_USER"
const SET_SHOT_SECOND_USER = "SET_SHOT_SECOND_USER"
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
            if(action.firstUser){
                stateCopy.FUMap = [...state.FUMap];
                stateCopy.FUMap = deleteShipFromTheMap(stateCopy.FUMap, action.sector, state.FUShips)
                stateCopy.deleteShipFU = false
                return stateCopy
            }
            else{
                stateCopy.SUMap = [...state.SUMap];
                stateCopy.SUMap = deleteShipFromTheMap(stateCopy.SUMap, action.sector, state.SUShips)
                stateCopy.deleteShipSU = false
                return stateCopy
            }
        case SET_SHIP_USER:
            let map,horizonSetShip,whatSetShip,ships
            if(action.firstUser){
                map="FUMap"
                horizonSetShip="horizonSetShipFU"
                whatSetShip="whatSetShipFU"
                ships="FUShips"
            }else{
                map="SUMap"
                horizonSetShip="horizonSetShipSU"
                whatSetShip="whatSetShipSU"
                ships="SUShips"
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
            if (state[whatSetShip] === 1) {stateCopy[ships].ship1 -= 1}
            if (state[whatSetShip] === 2) {stateCopy[ships].ship2 -= 1}
            if (state[whatSetShip] === 3) {stateCopy[ships].ship3 -= 1}
            if (state[whatSetShip] === 4) {stateCopy[ships].ship4 -= 1}
            stateCopy[whatSetShip] = null
            return stateCopy
        case SET_SHOT_FIRST_USER:
            if (!state.SUMap[action.sector.y][action.sector.x].sector.shot) { // если не стреляли по сектору, то среляем и выполняем проверку на убит/не убит
                stateCopy = {...state}
                stateCopy.SUMap = [...state.SUMap];
                stateCopy.SUMap[action.sector.y][action.sector.x].sector.shot = true
                let stateKillShip = killShip(action.sector, stateCopy.SUMap, stateCopy.SUShips)
                stateCopy.SUMap = [...stateKillShip.map]
                stateCopy.SUShips = {...stateKillShip.ships}
                if (!stateKillShip.hit) {
                    stateCopy.FUTurn={...state.FUTurn}
                    stateCopy.FUTurn.turn = !stateCopy.FUTurn.turn;
                }
                return stateCopy
            } else return state        //если ужее стреляли по сектору - ничего не делаем и продолжаем стрельбу
        case SET_SHOT_SECOND_USER:
            if (!state.FUMap[action.sector.y][action.sector.x].sector.shot) { // если не стреляли по сектору, то среляем и выполняем проверку на убит/не убит
                stateCopy = {...state}
                stateCopy.FUMap = [...state.FUMap];
                stateCopy.FUMap[action.sector.y][action.sector.x].sector.shot = true
                if (stateCopy.FUMap[action.sector.y][action.sector.x].sector.ship) {
                    let stateKillShip = killShip(action.sector, stateCopy.FUMap, stateCopy.FUShips)
                    stateCopy.FUMap = [...stateKillShip.map]
                    stateCopy.FUShips = {...stateKillShip.ships}

                    if (state.comp.game && !stateKillShip.kill && stateKillShip.hit) {
                        stateCopy.comp.sectorFire = [...fireAfterHitComp(stateCopy.FUMap, action.sector)]
                        stateCopy.comp.damaged = true
                        stateCopy.comp.hit = true
                    } else if (state.comp.game && stateKillShip.kill) {
                        stateCopy.comp.damaged = false
                    }
                } else {
                    stateCopy.comp.hit = false
                    stateCopy.FUTurn={...state.FUTurn}
                    stateCopy.FUTurn.turn = true;
                }
                return stateCopy
            } else return state
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
            stateCopy = {...state}
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

            stateCopy.settingShipUser.secondUser=true
            stateCopy.settingShipUser.firstUser=true
            return stateCopy
        }

        default:
            return state
    }
}

export const setWhatSetShip = (ship, firstUser) => {
    return ({type: "SET_WHAT_SET_SHIP", ship, firstUser})
};
export const setFirstUserMap = (FUMap) => {
    return ({type: "SET_FIRST_USER_MAP", FUMap})
};
export const setSecondUserMap = (SUMap) => {
    return ({type: "SET_SECOND_USER_MAP", SUMap})
};
export const setShipUser = (sector, firstUser) => {
    return ({type: "SET_SHIP_USER", sector, firstUser})
};
export const setShotFirstUser = (sector) => {
    return ({type: "SET_SHOT_FIRST_USER", sector})
};
export const setShotSecondUser = (sector) => {
    return ({type: "SET_SHOT_SECOND_USER", sector})
};
export const toggleDeleteShip = (firstUser) => {
    return ({type: "TOGGLE_DELETE_SHIP", firstUser})
};
export const unlockForSetShip = (shipValue, horizon, firstUser,) => {
    return ({type: "UNLOCK_FOR_SET_SHIP", shipValue, horizon, firstUser,})
};
export const lockAllMap = (firstUser) => {
    return ({type: "LOCK_ALL_MAP", firstUser})
};
export const setHorizon = (horizon, firstUser) => {
    return ({type: "SET_HORIZON", horizon, firstUser})
};
export const deleteShipOnMap = (sector,firstUser) => {
    return ({type: "DELETE_SHIP", sector,firstUser})
};
export const startGame = (firstUser) => {
    return ({type: "START_GAME", firstUser})
};
export const increaseSectorFire = (indexElement) => {
    return ({type: "INCREASE_SECTOR_FIRE", indexElement})
};
export const setCompGame = (value) => {
    return ({type: "SET_COMP_GAME", value})
};
export const toggleLookSecondUser = (value) => {
    return ({type: "TOGGLE_LOOK_SECOND_USER", value})
};
export const clearTheMap = (firstUser) => {
    return ({type: "INITIALIZE_THE_MAP", firstUser})
};
export const toggleGameWithComp = () => {
    return ({type: "TOGGLE_GAME_WITH_COMP",})
};
export const startNewGame = () => {
    return ({type: "INITIAL_STATE_USERS",})
};


export const setShipsRandom = (firstUser, userMap) => {
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
                dispatch(setShipUser(shipInputState[getRandomInt(shipInputState.length)],firstUser))
            }
        }
    }
}

export const RandomSaga = (firstUser, userMap) => {
    return ({type: "RANDOM_SAGA",firstUser, userMap})
};

export function* watchSetShipsRandomSaga() {
    debugger
    yield takeEvery('RANDOM_SAGA', fetchSetShipsRandomSaga);
}

function* fetchSetShipsRandomSaga(action) {
    try {
        yield put({type: "INITIALIZE_THE_MAP", firstUser:action.firstUser});
        let horizon = true;
        let shipInputState;
        for (let shipValue = 4; shipValue >= 1; shipValue--) {
            for (let numberOfShips = shipValue; numberOfShips <= 4; numberOfShips++) {
                horizon = getRandomInt(2)
                shipInputState = checkForShipInputComp(action.userMap, horizon, shipValue);
                yield put({type: "SET_WHAT_SET_SHIP", shipValue:shipValue, firstUser:action.firstUser});
                yield put({type: "SET_HORIZON", horizon:horizon, firstUser:action.firstUser});
                yield put({type: "UNLOCK_FOR_SET_SHIP", shipValue:shipValue, horizon:horizon, firstUser:action.firstUser});
                yield put({type: "SET_SHIP_USER", shipInputState:shipInputState[getRandomInt(shipInputState.length)],firstUser:action.firstUser});
              }
        }
    } catch (error) {}
}



export default battleMapReducer;