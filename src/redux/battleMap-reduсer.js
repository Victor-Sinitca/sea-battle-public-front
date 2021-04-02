import {
    checkForShipInput,
    checkForShipInputComp,
    lockMap
} from "../Components/Common/CheckForShipInput/CheckForSingleShipInput";
import {deleteShipFromTheMap} from "../Components/Common/deleteShipFromTheMap/deleteShipFromTheMap";
import {fireAfterHitComp, killShip} from "../Components/Common/KillShip/KillShip";
import {getRandomInt} from "../Components/Common/getRandom/getRandom";
import {initializeTheMapFunction} from "../Components/Common/initializeTheMapFunction/initializeTheMapFunction";

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
const START_GAME = "START_GAME"
const INCREASE_SECTOR_FIRE = "INCREASE_SECTOR_FIRE"
const SET_COMP_GAME = "SET_COMP_GAME"
const TOGGLE_LOOK_SECOND_USER = "TOGGLE_LOOK_SECOND_USER"
const INITIALIZE_THE_MAP = "INITIALIZE_THE_MAP"
const TOGGLE_GAME_WITH_COMP = "TOGGLE_GAME_WITH_COMP"


let initialState = {
    FUMap: null,
    SUMap: null,

    FUTurn: {
        turn: true
    },

    comp: {
        game: false,
        damaged: false,
        hit: false,
        sectorFire: []
    },

    lookSecondUser: true,


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
            stateCopy.deleteShipFU = false
            return stateCopy
        case DELETE_SHIP_SU :
            stateCopy = {...state}
            stateCopy.SUMap = [...state.SUMap];
            stateCopy.SUMap = deleteShipFromTheMap(stateCopy.SUMap, action.sector, state.SUShips)
            stateCopy.deleteShipSU = false
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
                    if (state.whatSetShipFU === 1) {
                        stateCopy.FUMap[action.sector.y][action.sector.x].sector.img = 1
                    }
                    if (state.whatSetShipFU > 1) {
                        stateCopy.FUMap[action.sector.y][action.sector.x + 1].sector.ship = true
                    }
                    if (state.whatSetShipFU > 2) {
                        stateCopy.FUMap[action.sector.y][action.sector.x + 2].sector.ship = true
                    }
                    if (state.whatSetShipFU > 3) {
                        stateCopy.FUMap[action.sector.y][action.sector.x + 3].sector.ship = true
                    }
                } else {
                    stateCopy.FUMap[action.sector.y][action.sector.x].sector.ship = true
                    if (state.whatSetShipFU === 1) {
                        stateCopy.FUMap[action.sector.y][action.sector.x].sector.img = 1
                    }
                    if (state.whatSetShipFU > 1) {
                        stateCopy.FUMap[action.sector.y + 1][action.sector.x].sector.ship = true
                    }
                    if (state.whatSetShipFU > 2) {
                        stateCopy.FUMap[action.sector.y + 2][action.sector.x].sector.ship = true
                    }
                    if (state.whatSetShipFU > 3) {
                        stateCopy.FUMap[action.sector.y + 3][action.sector.x].sector.ship = true
                    }
                }

                stateCopy.horizonSetShipFU = null
                stateCopy.FUMap = lockMap(stateCopy.FUMap)
                if (state.whatSetShipFU === 1) {
                    stateCopy.FUShips.ship1 -= 1
                }
                if (state.whatSetShipFU === 2) {
                    stateCopy.FUShips.ship2 -= 1
                }
                if (state.whatSetShipFU === 3) {
                    stateCopy.FUShips.ship3 -= 1
                }
                if (state.whatSetShipFU === 4) {
                    stateCopy.FUShips.ship4 -= 1
                }
                stateCopy.whatSetShipFU = null
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
                    if (state.whatSetShipSU > 1) {
                        stateCopy.SUMap[action.sector.y][action.sector.x + 1].sector.ship = true
                    }
                    if (state.whatSetShipSU > 2) {
                        stateCopy.SUMap[action.sector.y][action.sector.x + 2].sector.ship = true
                    }
                    if (state.whatSetShipSU > 3) {
                        stateCopy.SUMap[action.sector.y][action.sector.x + 3].sector.ship = true
                    }
                } else {
                    stateCopy.SUMap[action.sector.y][action.sector.x].sector.ship = true
                    if (state.whatSetShipSU > 1) {
                        stateCopy.SUMap[action.sector.y + 1][action.sector.x].sector.ship = true
                    }
                    if (state.whatSetShipSU > 2) {
                        stateCopy.SUMap[action.sector.y + 2][action.sector.x].sector.ship = true
                    }
                    if (state.whatSetShipSU > 3) {
                        stateCopy.SUMap[action.sector.y + 3][action.sector.x].sector.ship = true
                    }
                }
                stateCopy.horizonSetShipSU = null
                stateCopy.SUMap = lockMap(stateCopy.SUMap)
                if (state.whatSetShipSU === 1) {
                    stateCopy.SUShips.ship1 -= 1
                }
                if (state.whatSetShipSU === 2) {
                    stateCopy.SUShips.ship2 -= 1
                }
                if (state.whatSetShipSU === 3) {
                    stateCopy.SUShips.ship3 -= 1
                }
                if (state.whatSetShipSU === 4) {
                    stateCopy.SUShips.ship4 -= 1
                }
                stateCopy.whatSetShipSU = null
            }
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
                    stateCopy.FUTurn.turn = !stateCopy.FUTurn.turn;
                }
                return stateCopy
            } else return state
        case TOGGLE_SETTING_SHIP : {
            if (action.firstUser) {
                stateCopy = {...state}
                stateCopy.settingShipUser = {...state.settingShipUser}
                stateCopy.settingShipUser.firstUser = action.value
            } else {
                debugger
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
                stateCopy.FUShips = {...state.FUShips}
                stateCopy.FUMap = [...initializeTheMapFunction()]
                stateCopy.FUShips.ship1 = 4
                stateCopy.FUShips.ship2 = 3
                stateCopy.FUShips.ship3 = 2
                stateCopy.FUShips.ship4 = 1
                return stateCopy
            } else {
                stateCopy = {...state}
                stateCopy.SUShips = {...state.SUShips}
                stateCopy.SUMap = [...initializeTheMapFunction()]
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
                return stateCopy
            } else {
                stateCopy.comp.game = true
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
export const setHorizon = (horizon, firstUser) => {
    return ({type: "SET_HORIZON", horizon, firstUser})
};
export const deleteShipFUonMap = (sector) => {
    return ({type: "DELETE_SHIP_FU", sector})
};
export const deleteShipSUonMap = (sector) => {
    return ({type: "DELETE_SHIP_SU", sector})
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

export const initializeTheMap = (firstUser) => {
    return ({type: "INITIALIZE_THE_MAP", firstUser})
};
export const toggleGameWithComp = () => {
    return ({type: "TOGGLE_GAME_WITH_COMP",})
};


/*dispatch(initializeTheMap(firstUser))*/






export const setShipsRandom = (firstUser, userMap) => {
    let horizon = true;
    let shipInputState;
    return dispatch => {
            for (let shipValue = 4; shipValue >= 1; shipValue--) {
                for (let numberOfShips = shipValue; numberOfShips <= 4; numberOfShips++) {
                    horizon = getRandomInt(2)
                    shipInputState = checkForShipInputComp(userMap, horizon, shipValue);
                    Promise.all([ // перечисляем в нужной последовательности операции для выполнения как промисы
                        horizon,
                        dispatch(setWhatSetShip(shipValue, firstUser)),
                        dispatch(setHorizon(horizon, firstUser)),
                        dispatch(unlockForSetShip(shipValue, horizon, firstUser)),
                        shipInputState])
                        .then(
                            !firstUser ?
                                dispatch(setShipSecondUser(shipInputState[getRandomInt(shipInputState.length)], shipValue, horizon))
                                :
                                dispatch(setShipFirstUser(shipInputState[getRandomInt(shipInputState.length)], shipValue, horizon))
                        )
                }
            }
    }
}

export default battleMapReducer;