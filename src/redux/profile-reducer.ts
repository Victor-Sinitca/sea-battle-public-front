import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {profileAPI, ProfileType} from "../api/profileApi";


let initialState = {
    userId: null as number|null,
    status: "" as string,
    profile: null as ProfileType|null,
    isUpdateProfile:false as boolean,
}

export type initialStateType = typeof initialState

const profileReducer = (state: initialStateType= initialState, action:ActionType): initialStateType => {
    switch (action.type) {
        case "PP/SET_USERS_PROFILE": {
            return {...state, profile: action.profile}
        }
        case "PP/SET_USER_STATUS": {
            return {...state, status: action.status}
        }
        case "PP/SET_PHOTO_USER": {
            return state
        }
        case "PP/SET_IS_UPDATE_PROFILE": {
            return {...state, isUpdateProfile: action.IsUpdate}
        }
        default:
            return state;
    }
}


type ActionType=InferActionsTypes<typeof actionProfile>
export const actionProfile={
    setUsersProfile : (profile:ProfileType | null) => {
        return ({type: "PP/SET_USERS_PROFILE", profile}as const)
    },
    setUserStatus : (status:string) => {
        return ({type: "PP/SET_USER_STATUS", status}as const)
    },
    setIsUpdateProfile : (IsUpdate:boolean) => {
        return ({type: "PP/SET_IS_UPDATE_PROFILE", IsUpdate}as const)
    },
    setPhotoUser : (photo:string) => {
        return ({type: "PP/SET_PHOTO_USER", photo}as const)
    },
}


type ThunkActionType=ThunkAction<Promise<void>, AppStateType, any, ActionType>
export const getProfileThunk = (userId:string):ThunkActionType => async (dispatch) => {
    try {
        const token = localStorage.getItem("token") ||""
        dispatch(actionProfile.setIsUpdateProfile(true))
        debugger
        let data = await profileAPI.getProfile(token,userId)
        debugger
        dispatch(actionProfile.setUsersProfile(data))
    } catch (error) {
        console.log("error getProfileThunk "+error.message)
    }
    dispatch(actionProfile.setIsUpdateProfile(false))
}

export const getUserStatusThunk = (userId:string):ThunkActionType => async (dispatch) => {
    /*let data = await profileAPI.getStatus(userId)
    dispatch(actionProfile.setUserStatus(data))*/
}
export const updateUserStatusThunk = (status:string):ThunkActionType => async (dispatch) => {
    /*try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actionProfile.setUserStatus(status))
        }
    } catch (error) {
        console.log("error in updateUserStatusThunk" +error.message)
    }*/
}

export default profileReducer ;
