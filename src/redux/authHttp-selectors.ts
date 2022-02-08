import {AppStateType} from "./redux-store";

export const getAuthUser =(state:AppStateType)=>{
    return state.authHttp.user
}
export const getIsAuthorization =(state:AppStateType)=>{
    return state.authHttp.isAuthorization
}
export const getIsLoading =(state:AppStateType)=>{
    return state.authHttp.isLoading
}

export const getAuthProfile =(state:AppStateType)=>{
    return state.authHttp.authProfile
}
export const getErrorData =(state:AppStateType)=>{
    return state.authHttp.errorData
}



