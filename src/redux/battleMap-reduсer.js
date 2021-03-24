const SET_FIRST_USER_MAP = "SET_FIRST_USER_MAP"
const SET_SECOND_USER_MAP = "SET_SECOND_USER_MAP"
const TOGGLE_FIRST_USER_TURN = "TOGGLE_FIRST_USER_TURN"


let initialState = {
    firstUserMap: null,
    secondUserMap: null,
    firstUserTurn: true,

}

const battleMapReducer = (state = initialState, action) => {
    switch (action.type) {
        case(SET_FIRST_USER_MAP):
            let a =action.firstUserMap
            debugger
            return {...state, firstUserMap: action.firstUserMap}
        case(SET_SECOND_USER_MAP):
            return {...state, secondUserMap: action.secondUserMap}
        case(TOGGLE_FIRST_USER_TURN):

            return {...state, firstUserTurn: action.firstUserTurn}
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
export const toggleFirstUserTurn = (firstUserTurn) => {
    return ({type: "TOGGLE_FIRST_USER_TURN", firstUserTurn})
};


export default battleMapReducer;