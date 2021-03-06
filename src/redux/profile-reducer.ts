import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {profileAPI, ProfileType} from "../api/profileApi";


let initialState = {
    profile: null as ProfileType | null,
    isUpdateProfile: false as boolean,
}

export type initialStateType = typeof initialState

const profileReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "PP/SET_USERS_PROFILE": {
            return {...state, profile: action.profile}
        }
        case "PP/SET_PHOTO_USER": {
            return {
                ...state,
                profile: state.profile? {
                    ...state.profile,  photo:action.photo
                }:null
            }
        }
        case "PP/SET_USER_STATUS": {
            return {
                ...state,
                profile: state.profile? {
                    ...state.profile,  status:action.status
                }:null
            }
        }
        case "PP/SET_IS_UPDATE_PROFILE": {
            return {...state, isUpdateProfile: action.IsUpdate}
        }
        default:
            return state;
    }
}


type ActionType = InferActionsTypes<typeof actionProfile>
export const actionProfile = {
    setUsersProfile: (profile: ProfileType | null) => {
        return ({type: "PP/SET_USERS_PROFILE", profile} as const)
    },
    setUserStatus: (status: string) => {
        return ({type: "PP/SET_USER_STATUS", status} as const)
    },
    setIsUpdateProfile: (IsUpdate: boolean) => {
        return ({type: "PP/SET_IS_UPDATE_PROFILE", IsUpdate} as const)
    },
    setPhotoUser: (photo: string) => {
        return ({type: "PP/SET_PHOTO_USER", photo} as const)
    },
}


type ThunkActionType = ThunkAction<Promise<void>, AppStateType, any, ActionType>
export const getProfileThunk = (userId: string): ThunkActionType => async (dispatch) => {
    try {
        dispatch(actionProfile.setIsUpdateProfile(true))
        let data = await profileAPI.getProfile(userId)
        dispatch(actionProfile.setUsersProfile(data))
    } catch (error) {
        console.log("error getProfileThunk " + error.message)
    }
    dispatch(actionProfile.setIsUpdateProfile(false))
}
export const uploadPhotoThink = (file: File): ThunkActionType => async (dispatch) => {
    try {
        const data = await profileAPI.uploadPhoto(file)
        dispatch(actionProfile.setPhotoUser(data))
    } catch (e) {
        console.log("error in uploadPhotoThink" + e.message)
    }
}

export const getUserStatusThunk = (userId: string): ThunkActionType => async (dispatch) => {
    /*let data = await profileAPI.getStatus(userId)
    dispatch(actionProfile.setUserStatus(data))*/
}



export const updateUserStatusThunk = (status: string): ThunkActionType => async (dispatch) => {
    try {
        debugger
        let data = await profileAPI.updateStatus(status)
        dispatch(actionProfile.setUserStatus(data))
    } catch (error) {
        console.log("error in updateUserStatusThunk" +error.message)
    }
}

export default profileReducer;
