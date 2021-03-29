import {
    checkForDoubleShipInput, checkForShipInput,
    checkForSingleShipInput, checkForThreeShipInput, lockMap
} from "../Components/Common/CheckForShipInput/CheckForSingleShipInput";
import {killShip} from "../Components/Common/KillShip/KillShip";
import {deleteShipFromTheMap} from "../Components/Common/deleteShipFromTheMap/deleteShipFromTheMap";

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
const SET_WHAT_SET_SHIP = "SET_WHAT_SET_SHIP"
const SET_HORIZON = "SET_HORIZON"
const TOGGLE_DELETE_SHIP = "TOGGLE_DELETE_SHIP"
const DELETE_SHIP_FU = "DELETE_SHIP_FU"
const DELETE_SHIP_SU = "DELETE_SHIP_SU"

let initialState = {
    FUMap: null,
    SUMap: null,

    FUTurn: true,

    whatSetShipFU: null,
    whatSetShipSU: null,
    horizonSetShipFU: null,
    horizonSetShipSU: null,
    deleteShipFU: false,
    deleteShipSU: false,

    settingShipFU: true,
    settingShipSU: true,

    FUShips: {
        ship1:4,
        ship2:3,
        ship3:2,
        ship4:1,
        numberShips1:4,
        numberShips2:3,
        numberShips3:2,
        numberShips4:1,
    },
    SUShips: {
        ship1:4,
        ship2:3,
        ship3:2,
        ship4:1,
        numberShips1:4,
        numberShips2:3,
        numberShips3:2,
        numberShips4:1,
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
        case TOGGLE_FIRST_USER_TURN:
            return {...state, FUMap: action.firstUserTurn}
        case TO_BEGIN_SETTING_SHIP:
            return {...state, settingShip: true}
        case FINISH_SETTING_SHIP :
            return {...state, settingShip: false}
        case DELETE_SHIP_FU :
                stateCopy = {...state}
                stateCopy.FUMap = [...state.FUMap];
                stateCopy.FUMap = deleteShipFromTheMap(stateCopy.FUMap, action.sector, state.FUShips)
                return stateCopy
        case DELETE_SHIP_SU :
                stateCopy = {...state}
                stateCopy.SUMap = [...state.SUMap];
                stateCopy.SUMap = deleteShipFromTheMap(stateCopy.SUMap, action.sector, state.SUShips)
                return stateCopy
        case SET_SHIP_FIRST_USER:
            stateCopy = {...state};
            stateCopy.FUMap = [...state.FUMap];
            if (stateCopy.FUMap[action.sector.y][action.sector.x].sector.ship) {
                if (state.horizonSetShipFU) {

                } else {

                }
            } else {
                if (state.horizonSetShipFU) {
                    stateCopy.FUMap[action.sector.y][action.sector.x].sector.ship = true
                    if (state.whatSetShipFU===1) {stateCopy.FUMap[action.sector.y][action.sector.x].sector.img = 1}
                    if(state.whatSetShipFU>1) {stateCopy.FUMap[action.sector.y][action.sector.x + 1].sector.ship = true}
                    if(state.whatSetShipFU>2) {stateCopy.FUMap[action.sector.y][action.sector.x + 2].sector.ship = true}
                    if(state.whatSetShipFU>3) {stateCopy.FUMap[action.sector.y][action.sector.x + 3].sector.ship = true}
                } else {
                    stateCopy.FUMap[action.sector.y][action.sector.x].sector.ship = true
                    if (state.whatSetShipFU===1) {stateCopy.FUMap[action.sector.y][action.sector.x].sector.img = 1}
                    if(state.whatSetShipFU>1) {stateCopy.FUMap[action.sector.y + 1][action.sector.x].sector.ship = true}
                    if(state.whatSetShipFU>2) {stateCopy.FUMap[action.sector.y + 2][action.sector.x].sector.ship = true}
                    if(state.whatSetShipFU>3) {stateCopy.FUMap[action.sector.y + 3][action.sector.x].sector.ship = true}
                }
                stateCopy.whatSetShipFU= null
                stateCopy.horizonSetShipFU=null
                stateCopy.FUMap = lockMap(stateCopy.FUMap)
                if(state.whatSetShipFU===1){stateCopy.FUShips.ship1-=1}
                if(state.whatSetShipFU===2){stateCopy.FUShips.ship2-=1}
                if(state.whatSetShipFU===3){stateCopy.FUShips.ship3-=1}
                if(state.whatSetShipFU===4){stateCopy.FUShips.ship4-=1}
            }
            return stateCopy
        case SET_SHIP_SECOND_USER:
            stateCopy = {...state};
            stateCopy.SUMap = [...state.SUMap];
            if (stateCopy.SUMap[action.sector.y][action.sector.x].sector.ship) {
                if (state.horizonSetShipSU) {

                } else {

                }
            } else {
                if (state.horizonSetShipSU) {
                    stateCopy.SUMap[action.sector.y][action.sector.x].sector.ship = true
                    if(state.whatSetShipSU>1) {stateCopy.SUMap[action.sector.y][action.sector.x + 1].sector.ship = true}
                    if(state.whatSetShipSU>2) {stateCopy.SUMap[action.sector.y][action.sector.x + 2].sector.ship = true}
                    if(state.whatSetShipSU>3) {stateCopy.SUMap[action.sector.y][action.sector.x + 3].sector.ship = true}
                } else {
                    stateCopy.SUMap[action.sector.y][action.sector.x].sector.ship = true
                    if(state.whatSetShipSU>1) {stateCopy.SUMap[action.sector.y + 1][action.sector.x].sector.ship = true}
                    if(state.whatSetShipSU>2) {stateCopy.SUMap[action.sector.y + 2][action.sector.x].sector.ship = true}
                    if(state.whatSetShipSU>3) {stateCopy.SUMap[action.sector.y + 3][action.sector.x].sector.ship = true}
                }
                stateCopy.whatSetShipSU= null
                stateCopy.horizonSetShipSU=null
                stateCopy.SUMap = lockMap(stateCopy.SUMap)
                if(state.whatSetShipSU===1){stateCopy.SUShips.ship1-=1}
                if(state.whatSetShipSU===2){stateCopy.SUShips.ship2-=1}
                if(state.whatSetShipSU===3){stateCopy.SUShips.ship3-=1}
                if(state.whatSetShipSU===4){stateCopy.SUShips.ship4-=1}
            }
            return stateCopy
        case SET_SHOT_FIRST_USER:
            stateCopy = {...state}
            stateCopy.SUMap = [...state.SUMap];
            stateCopy.SUMap[action.sector.y][action.sector.x].sector.shot = true
            stateCopy.SUMap=killShip(action.sector,stateCopy.SUMap,stateCopy.SUShips)
            return stateCopy
        case SET_SHOT_SECOND_USER:
            stateCopy = {...state}
            stateCopy.FUMap = [...state.FUMap];
            stateCopy.FUMap[action.sector.y][action.sector.x].sector.shot = true
            stateCopy.FUMap=killShip(action.sector,stateCopy.FUMap,stateCopy.FUShips)
            return stateCopy
        case TOGGLE_SETTING_SHIP : {
            if (action.firstUser) {
                return {...state, settingShipFU: action.value}
            } else {
                return {...state, settingShipSU: action.value}
            }
        }
        case TOGGLE_DELETE_SHIP: {
            if (action.firstUser) {
                if(state.deleteShipFU){
                    return {...state, deleteShipFU: false}
                }
                else  return {...state, deleteShipFU: true}
            } else {
                if(state.deleteShipSU){
                    return {...state, deleteShipSU: false}
                }
                else  return {...state, deleteShipSU: true}
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
                stateCopy.horizonSetShipFU=action.horizon
                return stateCopy
            } else {
                stateCopy = {...state}
                stateCopy.horizonSetShipSU=action.horizon
                return stateCopy
            }
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
export const toBeginSettingShip = () => {
    return ({type: "TO_BEGIN_SETTING_SHIP"})
};
export const finishSettingShip = () => {
    return ({type: "FINISH_SETTING_SHIP"})
};


export const setShipFirstUser = (sector, valueShip = 1, horizon = true) => {
    return ({type: "SET_SHIP_FIRST_USER", sector, valueShip, horizon})
};
export const setShipSecondUser = (sector, valueShip = 1, horizon = true) => {
    return ({type: "SET_SHIP_SECOND_USER", sector, valueShip, horizon})
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
export const toggleDeleteShip = (firstUser) => {
    return ({type: "TOGGLE_DELETE_SHIP", firstUser})
};
export const unlockForSetShip = (shipValue, horizon, firstUser,) => {
    return ({type: "UNLOCK_FOR_SET_SHIP", shipValue, horizon, firstUser,})
};
export const lockAllMap = (firstUser) => {
    return ({type: "LOCK_ALL_MAP", firstUser})
};
export const setHorizon = (horizon,firstUser) => {
    return ({type: "SET_HORIZON", horizon,firstUser})
};
export const deleteShipFUonMap = (sector) => {
    return ({type: "DELETE_SHIP_FU", sector})
};
export const deleteShipSUonMap = (sector) => {
    return ({type: "DELETE_SHIP_SU", sector})
};



export default battleMapReducer;