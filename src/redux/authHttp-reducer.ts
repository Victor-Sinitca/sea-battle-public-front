import {AnyBaseActionType, InferActionsTypes} from "./redux-store";
import {authAPI, UserType} from "../api/authApi";



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
        const data = await authAPI.logout()
        localStorage.setItem('token', "");
        dispatch(actionAuth.deleteAuth())

    } catch (e) {
        console.log("error in toLogout" + e.message)
    }
}
export const login = (email: string, password: string,): AnyBaseActionType =>
    async (dispatch) => {
        try {
            const data = await authAPI.login(email, password)
            localStorage.setItem('token', data.accessToken);
            dispatch(actionAuth.setAuth(data.user, true,))
        } catch (e) {
            console.log("error in login" + e.message)
        }
    }
export const registration = (email: string, password: string, name: string): AnyBaseActionType =>
    async (dispatch) => {
        try {
            const data = await authAPI.registration(email, password, name)
            localStorage.setItem('token', data.accessToken);
            dispatch(actionAuth.setAuth(data.user, true,))
        } catch (e) {
            console.log("error in authorization" + e.message)
        }
    }
export const authMe = (): AnyBaseActionType =>
    async (dispatch) => {
        try {
                const data = await authAPI.refresh()
                localStorage.setItem('token', data.accessToken);
                dispatch(actionAuth.setAuth(data.user, true,))
        } catch (e) {
            console.log("error in authMe" + e.message)
        }
    }

export default authHttpReducer;
