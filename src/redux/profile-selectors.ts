import {AppStateType} from "./redux-store";

export const getUserId =(state:AppStateType)=>{
    return state.profilePage.userId
}
export const getStatus =(state:AppStateType)=>{
    return state.profilePage.status
}
export const getProfile =(state:AppStateType)=>{
    return state.profilePage.profile
}
