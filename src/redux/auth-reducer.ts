import {AnyBaseActionType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/authApi";


let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
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
                userId: null, email: null, login: null,
                authorization: false
            }
        case "AUTH/SET_CAPTCHA_URL": {
            return {...state, captchaUrl: action.url}
        }
        default:
            return state;
    }
}

type ActionType = InferActionsTypes<typeof actionAuth>
export const actionAuth = {
    setAuth: (userId: number | null, email: string | null, login: string | null, authorization: boolean) => {
        return ({type: "AUTH/SET_USER_DATA", data: {userId, email, login, authorization}} as const)
    },
    deleteAuth: () => {
        return ({type: 'AUTH/DELETE_USER_DATA'} as const)
    },
    setCaptchaUrl: (url: string | null) => {
        return ({type: 'AUTH/SET_CAPTCHA_URL', url} as const)
    },
}


export const toLogout = (): AnyBaseActionType => async (dispatch) => {
    try {
        const data = await authAPI.getToLogout()

    } catch (e) {
        console.log("error in toLogout" + e.message)
    }

}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string = ""): AnyBaseActionType =>
    async (dispatch) => {
        try {
            const data = await authAPI.getToLogin(email, password, rememberMe, captcha)

        } catch (e) {
            console.log("error in login" + e.message)
        }
    }

export default authReducer;
