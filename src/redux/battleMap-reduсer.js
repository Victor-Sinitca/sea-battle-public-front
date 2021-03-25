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

let initialState = {
    firstUserMap: null,
    secondUserMap: null,

    firstUserTurn: true,

    settingShipFU: true,
    settingShipSU: true,

    firstUserShips: {
        numberShips1: 1,
        numberShips2: 1,
        numberShips3: 1,
        numberShips4: 1,
    },
    secondUserShips: {
        numberShips1: 2,
        numberShips2: 2,
        numberShips3: 2,
        numberShips4: 2,
    }

}

const battleMapReducer = (state = initialState, action) => {
    let stateCopy = null
    switch (action.type) {
        case SET_FIRST_USER_MAP:
            return {...state, firstUserMap: action.firstUserMap}
        case SET_SECOND_USER_MAP:
            return {...state, secondUserMap: action.secondUserMap}
        case TOGGLE_FIRST_USER_TURN:
            return {...state, firstUserTurn: action.firstUserTurn}
        case TO_BEGIN_SETTING_SHIP:
            return {...state, settingShip: true}
        case FINISH_SETTING_SHIP :
            return {...state, settingShip: false}
        case SET_SHIP_FIRST_USER:
            stateCopy = {...state};
            stateCopy.firstUserMap = [...state.firstUserMap];
            stateCopy.firstUserMap[action.sector.y][action.sector.x].sector.ship ?
                stateCopy.firstUserMap[action.sector.y][action.sector.x].sector.ship = false
                :
                stateCopy.firstUserMap[action.sector.y][action.sector.x].sector.ship = true
            return stateCopy
        case(SET_SHIP_SECOND_USER):
            stateCopy = {...state};
            stateCopy.secondUserMap = [...state.secondUserMap];
            stateCopy.secondUserMap[action.sector.y][action.sector.x].sector.ship ?
                stateCopy.secondUserMap[action.sector.y][action.sector.x].sector.ship = false
                :
                stateCopy.secondUserMap[action.sector.y][action.sector.x].sector.ship = true
            return stateCopy
        case SET_SHOT_FIRST_USER:
            stateCopy = {...state}
            stateCopy.secondUserMap = [...state.secondUserMap];
            stateCopy.secondUserMap[action.sector.y][action.sector.x].sector.shot = true
            return stateCopy
        case SET_SHOT_SECOND_USER:
            stateCopy = {...state}
            stateCopy.firstUserMap = [...state.firstUserMap];
            stateCopy.firstUserMap[action.sector.y][action.sector.x].sector.shot = true
            return stateCopy
        case TOGGLE_SETTING_SHIP :{
            if(action.firstUser){
                return {...state, settingShipFU: action.value}
            }else {
                return {...state, settingShipSU: action.value}
            }
        }
        default:
            return state
    }
}

export const setFirstUserMap = (firstUserMap) => {
    return ({type: "SET_FIRST_USER_MAP", firstUserMap})
};
export const setSecondUserMap = (secondUserMap) => {
    return ({type: "SET_SECOND_USER_MAP", secondUserMap})
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


export default battleMapReducer;