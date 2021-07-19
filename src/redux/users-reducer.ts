import {AnyBaseActionType, InferActionsTypes} from "./redux-store";
import {userApi, UsersResponse} from "../api/userApi";
import {authAPI} from "../api/authApi";


let initialState = {
    users: null as UsersResponse | null,

}

export type initialStateType = typeof initialState
const usersHttpReducer = (state = initialState as initialStateType, action: ActionType): initialStateType => {
    switch (action.type) {
        case "USER_HTTP/SET_USERS":
            return {
                ...state,
                users:[...action.users],
            }
        default:
            return state;
    }
}

type ActionType = InferActionsTypes<typeof actionUsers>
export const actionUsers = {
    setUsers: (users: UsersResponse ) => {
        return ({type: "USER_HTTP/SET_USERS", users} as const)
    },
}


export const addUsers = (): AnyBaseActionType => async (dispatch) => {
    try {
        const users = await userApi.users()
        dispatch(actionUsers.setUsers(users))
    } catch (e) {
        console.log("error in addUsers" + e.message)
    }
}





export default usersHttpReducer;
