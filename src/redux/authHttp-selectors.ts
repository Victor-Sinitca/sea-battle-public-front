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


