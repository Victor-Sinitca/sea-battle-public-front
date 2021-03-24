const SET_FIRST_USER_MAP = "SET_FIRST_USER_MAP"
const SET_SECOND_USER_MAP = "SET_SECOND_USER_MAP"
const TOGGLE_FIRST_USER_TURN = "TOGGLE_FIRST_USER_TURN"
const USER_SHOT = "USER_SHOT"


let initialState = {
    firstUserMap: null,
    secondUserMap: null,
    firstUserTurn: true,

}
/*
ship: false,
    shot: false,
    x: j,
    y: i
*/

const battleMapReducer = (state = initialState, action) => {
    switch (action.type) {
        case(SET_FIRST_USER_MAP):
            return {...state, firstUserMap: action.firstUserMap}
        case(SET_SECOND_USER_MAP):
            return {...state, secondUserMap: action.secondUserMap}
        case(TOGGLE_FIRST_USER_TURN):
            return {...state, firstUserTurn: action.firstUserTurn}
        case(USER_SHOT):
            if (state.firstUserTurn) {
                debugger
                let newState={...state}
                newState.secondUserMap[action.shotSector.y][action.shotSector.x].sector={...action.shotSector}
                newState.secondUserMap[action.shotSector.y][action.shotSector.x].sector.shot=true
                return newState
            } else {
                let newState={...state}
                newState.firstUserMap[action.shotSector.y][action.shotSector.x].sector={...action.shotSector}
                newState.firstUserMap[action.shotSector.y][action.shotSector.x].sector.shot=true
                return newState
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
export const userShot = (shotSector) => {
    return ({type: "USER_SHOT", shotSector})
};
export const toggleFirstUserTurn = (firstUserTurn) => {
    return ({type: "TOGGLE_FIRST_USER_TURN", firstUserTurn})
};


export default battleMapReducer;