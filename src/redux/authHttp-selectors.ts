import {AppStateType} from "./redux-store";

export const getAuthUserId =(state:AppStateType)=>{
    return state.auth.userId
}

export const getEmail =(state:AppStateType)=>{
    return state.auth.email
}
export const getAuthorization =(state:AppStateType)=>{
    return state.auth.authorization
}
export const getToken =(state:AppStateType)=>{
    return state.auth.token
}

