import {
    checkForDoubleShipInput,
    checkForSingleShipInput, checkForThreeShipInput, lockMap
} from "../Components/Common/CheckForShipInput/CheckForSingleShipInput";

const SET_FIRST_USER_MAP = "SET_FIRST_USER_MAP"
const SET_SECOND_USER_MAP = "SET_SECOND_USER_MAP"
const TOGGLE_FIRST_USER_TURN = "TOGGLE_FIRST_USER_TURN"
const TO_BEGIN_SETTING_SHIP = "TO_BEGIN_SETTING_SHIP"
const FINISH_SETTING_SHIP = "FINISH_SETTING_SHIP"
const SET_SHIP_FIRST_USER = "SET_SHIP_FIRST_USER"
const SET_SHIP_SECOND_USER = "SET_SHIP_SECOND_USER"
const SET_SHOT_FIRST_USER = "SET_SHOT_FIRST_USER"
const SET_SHOT_SECOND_USER = "SET_SHOT_SECOND_USER"
const TOGGLE_SETTING_SHIP = "TOGGLE_SETTING_SHIP"
const UNLOCK_FOR_SET_SHIP = "UNLOCK_FOR_SET_SHIP"
const LOCK_ALL_MAP = "LOCK_ALL_MAP"

let initialState = {
    FUMap: null,
    SUMap: null,

    FUTurn: true,

    settingShipFU: true,
    settingShipSU: true,

    FUShips: {
        ship: [
            {id: 11, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 12, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 13, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 14, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 21, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 22, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 23, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 31, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 32, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 41, set: true, lock: false, parts: [], fieldsAround: []},
        ],
        numberShips1: {
            count: 4,
        },
        numberShips2: {
            count: 3,
        },
        numberShips3: {
            count: 2,
        },
        numberShips4: {
            count: 1,
        },
    },
    SUShips: {
        ship: [
            {id: 11, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 12, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 13, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 14, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 21, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 22, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 23, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 31, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 32, set: true, lock: false, parts: [], fieldsAround: []},
            {id: 41, set: true, lock: false, parts: [], fieldsAround: []},
        ],
        numberShips1: {
            count: 4,
        },
        numberShips2: {
            count: 3,
        },
        numberShips3: {
            count: 2,
        },
        numberShips4: {
            count: 1,
        },
    },
}

const battleMapReducer = (state = initialState, action) => {
    let stateCopy = null
    switch (action.type) {
        case SET_FIRST_USER_MAP:
            return {...state, FUMap: action.FUMap}
        case SET_SECOND_USER_MAP:
            return {...state, SUMap: action.SUMap}
        case TOGGLE_FIRST_USER_TURN:
            return {...state, FUMap: action.firstUserTurn}
        case TO_BEGIN_SETTING_SHIP:
            return {...state, settingShip: true}
        case FINISH_SETTING_SHIP :
            return {...state, settingShip: false}
        case SET_SHIP_FIRST_USER:
            stateCopy = {...state};
            stateCopy.FUMap = [...state.FUMap];
            stateCopy.FUMap[action.sector.y][action.sector.x].sector.ship ?
                stateCopy.FUMap[action.sector.y][action.sector.x].sector.ship = false
                :
                stateCopy.FUMap[action.sector.y][action.sector.x].sector.ship = true
            return stateCopy
        case(SET_SHIP_SECOND_USER):
            stateCopy = {...state};
            stateCopy.SUMap = [...state.SUMap];
            stateCopy.SUMap[action.sector.y][action.sector.x].sector.ship ?
                stateCopy.SUMap[action.sector.y][action.sector.x].sector.ship = false
                :
                stateCopy.SUMap[action.sector.y][action.sector.x].sector.ship = true
            return stateCopy
        case SET_SHOT_FIRST_USER:
            stateCopy = {...state}
            stateCopy.SUMap = [...state.SUMap];
            stateCopy.SUMap[action.sector.y][action.sector.x].sector.shot = true
            return stateCopy
        case SET_SHOT_SECOND_USER:
            stateCopy = {...state}
            stateCopy.FUMap = [...state.FUMap];
            stateCopy.FUMap[action.sector.y][action.sector.x].sector.shot = true
            return stateCopy
        case TOGGLE_SETTING_SHIP : {
            if (action.firstUser) {
                return {...state, settingShipFU: action.value}
            } else {
                return {...state, settingShipSU: action.value}
            }
        }
        case UNLOCK_FOR_SET_SHIP : {
            switch (action.idShip) {
                case 11:
                case 12:
                case 13:
                case 14: {
                    stateCopy = {...state}
                    if (action.firstUser) {
                        stateCopy.FUMap = [...state.FUMap];
                        stateCopy.FUMap = checkForSingleShipInput(stateCopy.FUMap)
                    }
                    else {
                        stateCopy.SUMap = [...state.SUMap];
                        stateCopy.SUMap=checkForSingleShipInput(stateCopy.SUMap)
                    }
                    return stateCopy
                }
                case 21:
                case 22:
                case 23: {
                    stateCopy = {...state}
                    if (action.firstUser) {
                        stateCopy.FUMap = [...state.FUMap];
                        stateCopy.FUMap = checkForDoubleShipInput(stateCopy.FUMap)
                    }
                    else {
                        stateCopy.SUMap = [...state.SUMap];
                        stateCopy.SUMap=checkForDoubleShipInput(stateCopy.SUMap)
                    }
                    return stateCopy
                }
                case 31:
                case 32: {
                    stateCopy = {...state}
                    if (action.firstUser) {
                        stateCopy.FUMap = [...state.FUMap];
                        stateCopy.FUMap = checkForThreeShipInput(stateCopy.FUMap)
                    }
                    else {
                        stateCopy.SUMap = [...state.SUMap];
                        stateCopy.SUMap=checkForThreeShipInput(stateCopy.SUMap)
                    }
                    return stateCopy
                }
                case 41: {
                    stateCopy = {...state}
                    if (action.firstUser) {
                        stateCopy.FUMap = [...state.FUMap];
                        stateCopy.FUMap = checkForSingleShipInput(stateCopy.FUMap)
                    }
                    else {
                        stateCopy.SUMap = [...state.SUMap];
                        stateCopy.SUMap=checkForSingleShipInput(stateCopy.SUMap)
                    }
                    return stateCopy
                }
                default:
            }
            return stateCopy
        }
        case LOCK_ALL_MAP:{
            if (action.firstUser) {
                stateCopy = {...state}
                stateCopy.FUMap = [...state.FUMap];
                stateCopy.FUMap=lockMap(stateCopy.FUMap)
                return stateCopy
            } else {
                stateCopy = {...state}
                stateCopy.SUMap = [...state.SUMap];
                stateCopy.SUMap=lockMap(stateCopy.SUMap)
                return stateCopy
            }
        }
        default:
            return state
    }
}

export const setFirstUserMap = (FUMap) => {
    return ({type: "SET_FIRST_USER_MAP", FUMap})
};
export const setSecondUserMap = (SUMap) => {
    return ({type: "SET_SECOND_USER_MAP", SUMap})
};
export const toBeginSettingShip = () => {
    return ({type: "TO_BEGIN_SETTING_SHIP"})
};
export const finishSettingShip = () => {
    return ({type: "FINISH_SETTING_SHIP"})
};
export const setShipFirstUser = (sector) => {
    return ({type: "SET_SHIP_FIRST_USER", sector})
};
export const setShipSecondUser = (sector) => {
    return ({type: "SET_SHIP_SECOND_USER", sector})
};
export const setShotFirstUser = (sector) => {
    return ({type: "SET_SHOT_FIRST_USER", sector})
};
export const setShotSecondUser = (sector) => {
    return ({type: "SET_SHOT_SECOND_USER", sector})
};
export const toggleSettingShip = (value, firstUser) => {
    return ({type: "TOGGLE_SETTING_SHIP", value, firstUser})
};
export const unlockForSetShip = (idShip, firstUser) => {
    return ({type: "UNLOCK_FOR_SET_SHIP", idShip, firstUser})
};
export const lockAllMap = (firstUser) => {
    return ({type: "LOCK_ALL_MAP", firstUser})
};


export default battleMapReducer;