import {
    checkForShipInput,
    lockMap
} from "../commen/logics/checkForShipInput/checkForSingleShipInput";
import {deleteShipFromTheMap} from "../commen/logics/deleteShipFromTheMap/deleteShipFromTheMap";
import {getRandomInt} from "../commen/logics/getRandom/getRandom";
import {initializeTheMapFunction} from "../commen/logics/initializeTheMapFunction/initializeTheMapFunction";
import {put, takeEvery} from 'redux-saga/effects'
import {setShot} from "../commen/logics/setShot/setShot";
import {initialUserState, loadUserState, saveUserState} from "../commen/logics/initialState/initialState";
import {setShip} from "../commen/logics/setShip/setShip";
import {SectorType, ShipsType} from "../../Types/Types";
import {Dispatch} from "redux";

const SET_FIRST_USER_MAP = "SET_FIRST_USER_MAP"
const SET_SECOND_USER_MAP = "SET_SECOND_USER_MAP"
const DELETE_SHIP = "DELETE_SHIP"
const SET_SHIP_USER = "SET_SHIP_USER"
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
const SAVE_STATE = "SAVE_STATE"
const LOAD_STATE = "LOAD_STATE"

const initialState = {
    FUMap: null as null | Array<Array<{sector:SectorType}>> ,
    SUMap: null as null | Array<Array<{sector:SectorType}>>,

    FUTurn: {
        turn: true as boolean
    },
    comp: {
        game: true as boolean,
        damaged: false as boolean,
        hit: false as boolean,
        sectorFire: [] as [] | Array<SectorType>
    },

    lookSecondUser: false as boolean,
    whatSetShipFU: null as null|number,
    whatSetShipSU: null as null|number,
    horizonSetShipFU: null as null|boolean,
    horizonSetShipSU: null as null|boolean,
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
    }as ShipsType ,
    history:{
        savedState:[]  as any, // перепроверить
        idTurn:0 as number
    }
}

type initialStateType= typeof initialState
const battleMapReducer = (state = initialState as initialStateType, action:ActionType) => {
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
            if (action.firstUser && state.FUMap ) {
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
        case SET_SHIP_USER:
            return setShip(state, action)
        case SET_SHOT_USER:
            return setShot(state, action)
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
            if (action.firstUser && state.FUMap && (typeof(state.horizonSetShipFU) === "boolean")) {
                stateCopy = {...state}
                stateCopy.FUMap = [...state.FUMap];

                stateCopy.FUMap = checkForShipInput(stateCopy.FUMap, state.horizonSetShipFU, action.shipValue,true).userMap
                return stateCopy
            } else if (state.SUMap && (typeof(state.horizonSetShipSU) === "boolean")) {
                stateCopy = {...state}
                stateCopy.SUMap = [...state.SUMap];
                stateCopy.SUMap = checkForShipInput(stateCopy.SUMap, state.horizonSetShipSU, action.shipValue,true).userMap
                return stateCopy
            }else {
                console.log(`Error UNLOCK_FOR_SET_SHIP. First User is ${action.firstUser}`)
                return stateCopy
            }
        }
        case LOCK_ALL_MAP: {
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
            }else {
                console.log(`Error LOCK_ALL_MAP. First User is ${action.firstUser}`)
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
            stateCopy.comp.game = action.value
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

        case SAVE_STATE: {
            return saveUserState(state,action.idTurn)
        }
        case LOAD_STATE: {
            return loadUserState(state,action.id)
        }
        default:
            return state
    }
}



type DispatchType=Dispatch<ActionType>
type ActionType=setWhatSetShipType | setFirstUserMapType | setSecondUserMapType | setShipUserType |setShotUserType | toggleDeleteShipType |
    unlockForSetShipType | lockAllMapType | setHorizonType | deleteShipOnMapType | startGameType | reduceSectorFireType |
    setCompGameType | toggleLookSecondUserType | clearTheMapType | toggleGameWithCompType | startNewGameType |
    saveStateType | loadStateType

type setWhatSetShipType={
    type: typeof SET_WHAT_SET_SHIP
    ship:number
    firstUser:boolean
}
export const setWhatSetShip = (ship:number, firstUser:boolean):setWhatSetShipType => {
    return ({type: SET_WHAT_SET_SHIP, ship, firstUser})
};
type setFirstUserMapType={
    type: typeof SET_FIRST_USER_MAP
    FUMap:Array<Array<{sector:SectorType}>>
}
export const setFirstUserMap = (FUMap:Array<Array<{sector:SectorType}>>):setFirstUserMapType => {
    return ({type: SET_FIRST_USER_MAP, FUMap})
};
type setSecondUserMapType={
    type: typeof SET_SECOND_USER_MAP
    SUMap:Array<Array<{sector:SectorType}>>
}
export const setSecondUserMap = (SUMap:Array<Array<{sector:SectorType}>>):setSecondUserMapType => {
    return ({type: SET_SECOND_USER_MAP, SUMap})
};
type setShipUserType={
    type: typeof SET_SHIP_USER
    sector:SectorType
    firstUser:boolean
}
export const setShipUser = (sector:SectorType, firstUser:boolean):setShipUserType => {
    return ({type: SET_SHIP_USER, sector, firstUser})
};
type setShotUserType={
    type: typeof SET_SHOT_USER
    sector:SectorType
    firstUser:boolean
}
export const setShotUser = (sector:SectorType, firstUser:boolean):setShotUserType => {
    return ({type: SET_SHOT_USER, sector, firstUser})
};
type toggleDeleteShipType={
    type: typeof TOGGLE_DELETE_SHIP
    firstUser:boolean
}
export const toggleDeleteShip = (firstUser:boolean):toggleDeleteShipType => {
    return ({type: TOGGLE_DELETE_SHIP, firstUser})
};
type unlockForSetShipType={
    type: typeof UNLOCK_FOR_SET_SHIP
    shipValue:number
    horizon:boolean
    firstUser:boolean
}
export const unlockForSetShip = (shipValue:number, horizon:boolean, firstUser:boolean,):unlockForSetShipType => {
    return ({type: UNLOCK_FOR_SET_SHIP, shipValue, horizon, firstUser,})
};
type lockAllMapType={
    type: typeof LOCK_ALL_MAP
    firstUser:boolean
}
export const lockAllMap = (firstUser:boolean):lockAllMapType => {
    return ({type: LOCK_ALL_MAP, firstUser})
};
type setHorizonType={
    type: typeof SET_HORIZON
    horizon:boolean
    firstUser:boolean
}
export const setHorizon = (horizon:boolean, firstUser:boolean):setHorizonType => {
    return ({type: SET_HORIZON, horizon, firstUser})
};
type deleteShipOnMapType={
    type: typeof DELETE_SHIP
    sector:SectorType
    firstUser:boolean
}
export const deleteShipOnMap = (sector:SectorType, firstUser:boolean):deleteShipOnMapType => {
    return ({type: DELETE_SHIP, sector, firstUser})
};
type startGameType={
    type: typeof START_GAME
    firstUser:boolean
}
export const startGame = (firstUser:boolean):startGameType => {
    return ({type: START_GAME, firstUser})
};
type reduceSectorFireType={
    type: typeof INCREASE_SECTOR_FIRE
    indexElement:number
}
export const reduceSectorFire = (indexElement:number):reduceSectorFireType => {
    return ({type: INCREASE_SECTOR_FIRE, indexElement})
};
type setCompGameType={
    type: typeof SET_COMP_GAME
    value:boolean
}
export const setCompGame = (value:boolean):setCompGameType => {
    return ({type: SET_COMP_GAME, value})
};
type toggleLookSecondUserType={
    type: typeof TOGGLE_LOOK_SECOND_USER
    value:boolean
}
export const toggleLookSecondUser = (value:boolean):toggleLookSecondUserType => {
    return ({type: TOGGLE_LOOK_SECOND_USER, value})
};
type clearTheMapType={
    type: typeof INITIALIZE_THE_MAP
    firstUser:boolean
}
export const clearTheMap = (firstUser:boolean):clearTheMapType => {
    return ({type: INITIALIZE_THE_MAP, firstUser})
};
type toggleGameWithCompType={type: typeof TOGGLE_GAME_WITH_COMP}
export const toggleGameWithComp = ():toggleGameWithCompType => {
    return ({type: TOGGLE_GAME_WITH_COMP})
};
type startNewGameType={type: typeof INITIAL_STATE_USERS}
export const startNewGame = ():startNewGameType => {
    return ({type: INITIAL_STATE_USERS})
};
type saveStateType={
    type: typeof SAVE_STATE
    idTurn:number
}
export const saveState = (idTurn:number):saveStateType => {
    return ({type: SAVE_STATE,idTurn})
};
type loadStateType={
    type: typeof LOAD_STATE
    id:number
}
export const loadState = (id:number):loadStateType => {
    return ({type: LOAD_STATE,id})
};




export const setShipsRandom = (firstUser:boolean, userMap:Array<Array<{sector:SectorType}>>) => { //санка (реализована расстановка кораблей по кнопке)
    return (dispatch:DispatchType) => {
        dispatch(clearTheMap(firstUser))
        let horizon = true;
        let shipInputState=[];
        for (let shipValue = 4; shipValue >= 1; shipValue--) {
            for (let numberOfShips = shipValue; numberOfShips <= 4; numberOfShips++) {
                horizon = Boolean(getRandomInt(2))
                shipInputState = checkForShipInput(userMap, horizon, shipValue,false).shipInputState;
                dispatch(setWhatSetShip(shipValue, firstUser))
                dispatch(setHorizon(horizon, firstUser))
                dispatch(unlockForSetShip(shipValue, horizon, firstUser))
                dispatch(setShipUser(shipInputState[getRandomInt(shipInputState.length)], firstUser))
            }
        }
    }
}

type RandomSagaType={
    type: typeof RANDOM_SAGA
    firstUser:boolean
    userMap:Array<Array<{sector:SectorType}>>
}
export const RandomSaga = (firstUser:boolean, userMap:Array<Array<{sector:SectorType}>>):RandomSagaType => {
    return ({type: RANDOM_SAGA, firstUser, userMap})
};

export function* watchSetShipsRandomSaga() {
    yield takeEvery(RANDOM_SAGA, fetchSetShipsRandomSaga);
}

function* fetchSetShipsRandomSaga(action:RandomSagaType) {   //сага (реализована расстановка кораблей ИИ в useEffect (для примера))
    try {
        yield put(clearTheMap(action.firstUser));
        let horizon = true;
        let shipInputState=[] as [] | Array<SectorType>;
        for (let shipValue = 4; shipValue >= 1; shipValue--) {
            for (let numberOfShips = shipValue; numberOfShips <= 4; numberOfShips++) {
                horizon = Boolean(getRandomInt(2))
                shipInputState = checkForShipInput(action.userMap, horizon, shipValue, false).shipInputState;
                yield put(setWhatSetShip(shipValue, action.firstUser));
                yield put(setHorizon(horizon, action.firstUser));
                yield put(unlockForSetShip(shipValue, horizon, action.firstUser));
                yield put(setShipUser(shipInputState[getRandomInt(shipInputState.length)], action.firstUser));
            }
        }
    } catch (error) {console.log("error when installing ships AI (SAGA)")}
}


export default battleMapReducer;