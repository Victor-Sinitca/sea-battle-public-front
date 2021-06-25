import {AppStateType} from "./redux-store";

export const getProfile =(state:AppStateType)=>{
    return state.profilePage.profile
}
