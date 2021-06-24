import {AnyBaseActionType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/authApi";
import {UserType} from "../http/userHttpApi";


let initialState = {
    user: null as UserType | null,
    isAuthorization: false as boolean,
    isLoading:false as boolean,
}

export type initialStateType = typeof initialState
const authHttpReducer = (state = initialState as initialStateType, action: ActionType): initialStateType => {
    switch (action.type) {
        case "AUTH_HTTP/SET_USER_DATA":
            return {
                ...state,
                ...action.data,
            }
        case "AUTH_HTTP/DELETE_USER_DATA":
            return {
                ...state,
                user: null, isAuthorization: false
            }
        case "AUTH_HTTP/SET_LOADING": {
            return {...state, isLoading: action.isLoading}
        }
        default:
            return state;
    }
}

type ActionType = InferActionsTypes<typeof actionAuth>
export const actionAuth = {
    setAuth: (user: UserType, isAuthorization: boolean,) => {
        return ({type: "AUTH_HTTP/SET_USER_DATA", data: {user, isAuthorization,}} as const)
    },
    deleteAuth: () => {
        return ({type: 'AUTH_HTTP/DELETE_USER_DATA'} as const)
    },
    setIsLoading: (isLoading:boolean) => {
        return ({type: 'AUTH_HTTP/SET_LOADING', isLoading} as const)
    },
}




export const toLogout = (): AnyBaseActionType => async (dispatch) => {
    try {
        localStorage.setItem('token', "");
        dispatch(actionAuth.deleteAuth())
    } catch (e) {
        console.log("error in toLogout" + e.message)
    }
}
export const login = (email: string, password: string,): AnyBaseActionType =>
    async (dispatch) => {
        try {
            const data = await authAPI.getToLogin(email, password)
            localStorage.setItem('token', data.user.token);
            dispatch(actionAuth.setAuth(data.user._id, data.user.email,
                data.user.token, true, data.user.name))
        } catch (e) {
            console.log("error in login" + e.message)
        }
    }
export const authorization = (email: string, password: string, name: string): AnyBaseActionType =>
    async (dispatch) => {
        try {
            const data = await authAPI.getAuthorization(email, password, name)
            localStorage.setItem('token', data.user.token);
            dispatch(actionAuth.setAuth(data.user._id, data.user.email, data.user.token, true, data.user.name))
        } catch (e) {
            console.log("error in authorization" + e.message)
        }
    }
export const authMe = (): AnyBaseActionType =>
    async (dispatch) => {
        try {
            const token = localStorage.getItem("token")
            if (token !== null) {
                const data = await authAPI.getMe(token)
                localStorage.setItem('token', data.user.token);
                dispatch(actionAuth.setAuth(data.user._id, data.user.email, data.user.token, true, data.user.name))
            }
        } catch (e) {
            console.log("error in authMe" + e.message)
        }
    }

export default authHttpReducer;
