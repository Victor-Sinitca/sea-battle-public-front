import {AppStateType} from "./redux-store";

export const getMessages =(state:AppStateType)=>{
    return state.chat.messages
}
export const getStatus =(state:AppStateType)=>{
    return state.chat.status
}
export const getListGames =(state:AppStateType)=>{
    return state.chat.games
}
export const getListGamesRoom =(state:AppStateType)=>{
    return state.chat.gameRoom
}
