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
                        for (let i = 0; i < 10; i++) {
                            for (let j = 0; j < 10; j++) {
                                if (i === 0) {
                                    if (j === 0) {
                                        if (!stateCopy.FUMap[i][j].sector.ship &&
                                            !stateCopy.FUMap[i + 1][j].sector.ship &&
                                            !stateCopy.FUMap[i + 1][j + 1].sector.ship &&
                                            !stateCopy.FUMap[i][j + 1].sector.ship) {
                                            stateCopy.FUMap[i][j] = {
                                                sector: {
                                                    ship: false,
                                                    shot: false,
                                                    x: j,
                                                    y: i,
                                                    unlock: true,
                                                }
                                            }
                                        }
                                    } else if (j === 9) {
                                        if (!stateCopy.FUMap[i][j].sector.ship &&
                                            !stateCopy.FUMap[i + 1][j].sector.ship &&
                                            !stateCopy.FUMap[i + 1][j - 1].sector.ship &&
                                            !stateCopy.FUMap[i][j - 1].sector.ship) {
                                            stateCopy.FUMap[i][j] = {
                                                sector: {
                                                    ship: false,
                                                    shot: false,
                                                    x: j,
                                                    y: i,
                                                    unlock: true,
                                                }
                                            }
                                        }
                                    } else {
                                        if (!stateCopy.FUMap[i][j].sector.ship &&
                                            !stateCopy.FUMap[i + 1][j].sector.ship &&
                                            !stateCopy.FUMap[i + 1][j + 1].sector.ship &&
                                            !stateCopy.FUMap[i + 1][j - 1].sector.ship &&
                                            !stateCopy.FUMap[i][j + 1].sector.ship &&
                                            !stateCopy.FUMap[i][j - 1].sector.ship) {
                                            stateCopy.FUMap[i][j] = {
                                                sector: {
                                                    ship: false,
                                                    shot: false,
                                                    x: j,
                                                    y: i,
                                                    unlock: true,
                                                }
                                            }
                                        }

                                    }

                                }
                                else if (i === 9) {
                                    if (j === 0) {
                                        if (!stateCopy.SUMap[i][j].sector.ship &&
                                            !stateCopy.SUMap[i - 1][j].sector.ship &&
                                            !stateCopy.SUMap[i - 1][j + 1].sector.ship &&
                                            !stateCopy.SUMap[i][j + 1].sector.ship) {
                                            stateCopy.SUMap[i][j] = {
                                                sector: {
                                                    ship: false,
                                                    shot: false,
                                                    x: j,
                                                    y: i,
                                                    unlock: true,
                                                }
                                            }
                                        }
                                    } else if (j === 9) {
                                        if (!stateCopy.SUMap[i][j].sector.ship &&
                                            !stateCopy.SUMap[i - 1][j].sector.ship &&
                                            !stateCopy.SUMap[i - 1][j - 1].sector.ship &&
                                            !stateCopy.SUMap[i][j - 1].sector.ship) {
                                            stateCopy.SUMap[i][j] = {
                                                sector: {
                                                    ship: false,
                                                    shot: false,
                                                    x: j,
                                                    y: i,
                                                    unlock: true,
                                                }
                                            }
                                        }
                                    } else {
                                        if (!stateCopy.SUMap[i][j].sector.ship &&
                                            !stateCopy.SUMap[i - 1][j].sector.ship &&
                                            !stateCopy.SUMap[i - 1][j + 1].sector.ship &&
                                            !stateCopy.SUMap[i - 1][j - 1].sector.ship &&
                                            !stateCopy.SUMap[i][j + 1].sector.ship &&
                                            !stateCopy.SUMap[i][j - 1].sector.ship) {
                                            stateCopy.SUMap[i][j] = {
                                                sector: {
                                                    ship: false,
                                                    shot: false,
                                                    x: j,
                                                    y: i,
                                                    unlock: true,
                                                }
                                            }
                                        }
                                    }
                                }
                                /*else if (!stateCopy.SUMap[i][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.SUMap[i - 1][j].sector.ship &&
                                    !stateCopy.SUMap[i - 1][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i - 1][j - 1].sector.ship &&
                                    !stateCopy.SUMap[i][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i][j - 1].sector.ship) {
                                    stateCopy.SUMap[i][j] = {
                                        sector: {
                                            ship: false,
                                            shot: false,
                                            x: j,
                                            y: i,
                                            unlock: true,
                                        }
                                    }
                                }*/

                            }
                        }
                    } else {
                        stateCopy.SUMap = [...state.SUMap];
                        for (let i = 0; i < 10; i++) {
                            for (let j = 0; j < 10; j++) {
                                if (!stateCopy.SUMap[i][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.SUMap[i - 1][j].sector.ship &&
                                    !stateCopy.SUMap[i - 1][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i - 1][j - 1].sector.ship &&
                                    !stateCopy.SUMap[i][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i][j - 1].sector.ship) {
                                    stateCopy.SUMap[i][j] = {
                                        sector: {
                                            ship: false,
                                            shot: false,
                                            x: j,
                                            y: i,
                                            unlock: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return stateCopy
                }
                case 21:
                case 22:
                case 23: {
                    stateCopy = {...state}
                    if (action.firstUser) {
                        stateCopy.FUMap = [...state.FUMap];
                        for (let i = 0; i < 10; i++) {
                            for (let j = 0; j < 10; j++) {
                                if (!stateCopy.FUMap[i][j].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.FUMap[i - 1][j].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.FUMap[i][j + 1].sector.ship &&
                                    !stateCopy.FUMap[i][j - 1].sector.ship) {
                                    stateCopy.FUMap[i][j] = {
                                        sector: {
                                            ship: false,
                                            shot: false,
                                            x: j,
                                            y: i,
                                            unlock: true,
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        stateCopy.SUMap = [...state.SUMap];
                        for (let i = 0; i < 10; i++) {
                            for (let j = 0; j < 10; j++) {
                                if (!stateCopy.SUMap[i][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.SUMap[i - 1][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.SUMap[i][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i][j - 1].sector.ship) {
                                    stateCopy.SUMap[i][j] = {
                                        sector: {
                                            ship: false,
                                            shot: false,
                                            x: j,
                                            y: i,
                                            unlock: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return stateCopy
                }
                case 31:
                case 32: {
                    stateCopy = {...state}
                    if (action.firstUser) {
                        stateCopy.FUMap = [...state.FUMap];
                        for (let i = 0; i < 10; i++) {
                            for (let j = 0; j < 10; j++) {
                                if (!stateCopy.FUMap[i][j].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.FUMap[i - 1][j].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.FUMap[i][j + 1].sector.ship &&
                                    !stateCopy.FUMap[i][j - 1].sector.ship) {
                                    stateCopy.FUMap[i][j] = {
                                        sector: {
                                            ship: false,
                                            shot: false,
                                            x: j,
                                            y: i,
                                            unlock: true,
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        stateCopy.SUMap = [...state.SUMap];
                        for (let i = 0; i < 10; i++) {
                            for (let j = 0; j < 10; j++) {
                                if (!stateCopy.SUMap[i][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.SUMap[i - 1][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.SUMap[i][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i][j - 1].sector.ship) {
                                    stateCopy.SUMap[i][j] = {
                                        sector: {
                                            ship: false,
                                            shot: false,
                                            x: j,
                                            y: i,
                                            unlock: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return stateCopy
                }
                case 41: {
                    stateCopy = {...state}
                    if (action.firstUser) {
                        stateCopy.FUMap = [...state.FUMap];
                        for (let i = 0; i < 10; i++) {
                            for (let j = 0; j < 10; j++) {
                                if (!stateCopy.FUMap[i][j].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.FUMap[i - 1][j].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.FUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.FUMap[i][j + 1].sector.ship &&
                                    !stateCopy.FUMap[i][j - 1].sector.ship) {
                                    stateCopy.FUMap[i][j] = {
                                        sector: {
                                            ship: false,
                                            shot: false,
                                            x: j,
                                            y: i,
                                            unlock: true,
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        stateCopy.SUMap = [...state.SUMap];
                        for (let i = 0; i < 10; i++) {
                            for (let j = 0; j < 10; j++) {
                                if (!stateCopy.SUMap[i][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.SUMap[i - 1][j].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i + 1][j - 1].sector.ship &&
                                    !stateCopy.SUMap[i][j + 1].sector.ship &&
                                    !stateCopy.SUMap[i][j - 1].sector.ship) {
                                    stateCopy.SUMap[i][j] = {
                                        sector: {
                                            ship: false,
                                            shot: false,
                                            x: j,
                                            y: i,
                                            unlock: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return stateCopy
                }
                default:
            }
            return stateCopy
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


export default battleMapReducer;