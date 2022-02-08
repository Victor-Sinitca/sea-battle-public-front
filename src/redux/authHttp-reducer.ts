import {AnyBaseActionType, InferActionsTypes} from "./redux-store";
import {authAPI, UserProfileType, UserType} from "../api/authApi";
import {profileAPI} from "../api/profileApi";


let initialState = {
    user: null as UserType | null,
    authProfile: null as null | UserProfileType,
    isAuthorization: false as boolean,
    isLoading: true as boolean,
    errorData: {
        isError: false as boolean,
        errorMessage: "" as string
    }
}

export type initialStateType = typeof initialState
const authHttpReducer = (state = initialState as initialStateType, action: ActionType): initialStateType => {
    switch (action.type) {
        case "AUTH_HTTP/SET_USER_DATA":
            return {
                ...state,
                ...action.data,
            }
        case "AUTH_HTTP/SET_PROFILE_DATA":
            return {
                ...state,
                authProfile: {...action.profile},
            }
        case "AUTH_HTTP/DELETE_USER_DATA":
            return {
                ...state,
                user: null, isAuthorization: false, authProfile: null
            }
        case "AUTH_HTTP/SET_LOADING": {
            return {...state, isLoading: action.isLoading}
        }
        case "AUTH_HTTP/SET_ERROR_AUTH": {
            return {
                ...state, errorData: {
                    isError: action.isError, errorMessage: action.errorMessage
                }
            }
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
    setAuthProfile: (profile: UserProfileType) => {
        return ({type: "AUTH_HTTP/SET_PROFILE_DATA", profile} as const)
    },
    deleteAuth: () => {
        return ({type: 'AUTH_HTTP/DELETE_USER_DATA'} as const)
    },
    setIsLoading: (isLoading: boolean) => {
        return ({type: 'AUTH_HTTP/SET_LOADING', isLoading} as const)
    },
    setErrorAuth: (isError: boolean, errorMessage: string) => {
        return ({type: 'AUTH_HTTP/SET_ERROR_AUTH', isError, errorMessage} as const)
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
            if (data) {
                localStorage.setItem('token', data.accessToken);
                const authProfile = await profileAPI.getProfile(data.user.id)
                dispatch(actionAuth.setAuthProfile(authProfile))
                dispatch(actionAuth.setAuth(data.user, true,))
            }
        } catch (e) {
            console.log("error in login" + e.message)
        }
    }
export const registration = (email: string, password: string, name: string): AnyBaseActionType =>
    async (dispatch) => {
        try {
            const data = await authAPI.registration(email, password, name)
            localStorage.setItem('token', data.accessToken);
            const authProfile = await profileAPI.getProfile(data.user.id)
            dispatch(actionAuth.setAuthProfile(authProfile))
            dispatch(actionAuth.setAuth(data.user, true,))
        } catch (e) {
            if (e.response.status === 400) {
                dispatch(actionAuth.setErrorAuth(true, e.response.data.message))
            } else {
                console.log("error in authorization" + e.message)
            }
        }
    }
export const refreshAPI = (): AnyBaseActionType =>
    async (dispatch) => {
        try {
            const data = await authAPI.refresh()
            localStorage.setItem('token', data.accessToken);
            dispatch(actionAuth.setAuth(data.user, true,))
        } catch (e) {
            console.log("error in authMe" + e.message)
        }
    }
export const setAuth = (): AnyBaseActionType =>
    async (dispatch, getState) => {
        try {
            await dispatch(actionAuth.setIsLoading(true))
            await dispatch(refreshAPI())
            const userID = getState().authHttp.user?.id
            if (userID) {
                const authProfile = await profileAPI.getProfile(userID)
                dispatch(actionAuth.setAuthProfile(authProfile))
            }
        } catch (e) {
            console.log("error in authMe" + e.message)
        }
        dispatch(actionAuth.setIsLoading(false))
    }


export default authHttpReducer;
