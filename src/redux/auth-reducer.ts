import {AnyBaseActionType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/authApi";


let initialState = {
    userId: null as string | null,
    email: null as string | null,
    token: null as string | null,
    authorization: false as boolean,
    captchaUrl: null as string | null,
}

export type initialStateType = typeof initialState
const authReducer = (state = initialState as initialStateType, action: ActionType): initialStateType => {
    switch (action.type) {
        case "AUTH/SET_USER_DATA":
            return {
                ...state,
                ...action.data,
            }
        case "AUTH/DELETE_USER_DATA":
            return {
                ...state,
                userId: null, email: null,
                authorization: false
            }
        case "AUTH/SET_CAPTCHA_URL": {
            return {...state, captchaUrl: action.url}
        }
        case "AUTH/SET_TOKEN": {
            return {...state, captchaUrl: action.token}
        }
        default:
            return state;
    }
}

type ActionType = InferActionsTypes<typeof actionAuth>
export const actionAuth = {
    setAuth: (userId: string | null, email: string | null, token: string, authorization: boolean,) => {
        return ({type: "AUTH/SET_USER_DATA", data: {userId, email, token, authorization,}} as const)
    },
    deleteAuth: () => {
        return ({type: 'AUTH/DELETE_USER_DATA'} as const)
    },
    setCaptchaUrl: (url: string | null) => {
        return ({type: 'AUTH/SET_CAPTCHA_URL', url} as const)
    },
    setToken: (token: string) => {
        return ({type: 'AUTH/SET_TOKEN', token} as const)
    },
}


export const toLogout = (): AnyBaseActionType => async (dispatch) => {
    try {
        localStorage.setItem('token', "");
         dispatch(actionAuth.setAuth("", "", "", false))

    } catch (e) {
        console.log("error in toLogout" + e.message)
    }

}
export const login = (email: string, password: string,): AnyBaseActionType =>
    async (dispatch) => {
        try {
            const data = await authAPI.getToLogin(email, password,)
            localStorage.setItem('token', data.user.token);
            dispatch(actionAuth.setAuth(data.user._id, data.user.email, data.user.token, true))
        } catch (e) {
            console.log("error in login" + e.message)
        }
    }
export const authorization = (email: string, password: string,): AnyBaseActionType =>
    async (dispatch) => {
        try {
            debugger
            const data = await authAPI.getAuthorization(email, password,)
            localStorage.setItem('token', data.user.token);
            dispatch(actionAuth.setAuth(data.user._id, data.user.email, data.user.token, true))
        } catch (e) {
            console.log("error in authorization" + e.message)
        }
    }
export const authMe = (): AnyBaseActionType =>
    async (dispatch) => {
        try {
            const token =localStorage.getItem("token")
            if(token !== null ){
                const data = await authAPI.getMe(token)
                localStorage.setItem('token', data.user.token);
                dispatch(actionAuth.setAuth(data.user._id, data.user.email, data.user.token, true))
            }
        } catch (e) {
            console.log("error in authMe" + e.message)
        }
    }

export default authReducer;
