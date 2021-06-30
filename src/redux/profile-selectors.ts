import {AppStateType} from "./redux-store";

export const getProfile =(state:AppStateType)=>{
    return state.profilePage.profile
}
export const getIsUpdateProfile =(state:AppStateType)=>{
    return state.profilePage.isUpdateProfile
}
