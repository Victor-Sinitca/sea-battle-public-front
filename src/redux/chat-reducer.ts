import {BaseActionType, InferActionsTypes} from "./redux-store";
import {chatApi, GameApiType, MessageApiType, statusType} from "../api/chatApi";
import {Dispatch} from "redux";
import {v1} from "uuid"


type MessageType = MessageApiType & { id: string }
type GamesType = GameApiType & { id: string }

let initialState = {
    messages: [] as MessageType[],
    games: [] as GamesType[],
    status: "pending" as statusType,
}

type initialStateType = typeof initialState
const chatReducer = (state = initialState as initialStateType, action: ActionType): initialStateType => {
    switch (action.type) {
        case "CHAT_SET_MESSAGES":
            return {
                ...state,
                messages: [...state.messages, ...action.messages.map(m => ({...m, id: v1()}))].filter(
                    (m, index, array) => index >= array.length - 100)
            }
        case "CHAT_DELETE_MESSAGES":
            return {
                ...state,
                messages: []
            }
        case "CHAT_DELETE_GAMES":
            return {
                ...state,
                games: []
            }
        case "SET_GAMES":
            return {
                ...state,
                games: [...state.games, ...action.games.map(m => ({...m, id: v1()}))]
            }
        case "CHAT_SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}


type ActionType = InferActionsTypes<typeof actionChat>
export const actionChat = {
    deleteMessages: () => ({type: "CHAT_DELETE_MESSAGES"} as const),
    deleteGames: () => ({type: "CHAT_DELETE_GAMES"} as const),
    setMessages: (messages: MessageApiType[]) => ({type: "CHAT_SET_MESSAGES", messages} as const),
    setStatus: (status: statusType) => ({type: "CHAT_SET_STATUS", status} as const),
    setGames: (games: GameApiType[]) => ({type: "SET_GAMES", games} as const),
}


type ThunkActionType = BaseActionType<ActionType>


export type messagesReceivedSubscribersType = (messages: MessageApiType[]) => void
let _newMessageHandler: messagesReceivedSubscribersType| null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: MessageApiType[]) => {
            dispatch(actionChat.setMessages(messages))
        }
    }
    return _newMessageHandler

}
export type gamesReceivedSubscribersType = (games: GameApiType[]) => void
let _newGameHandler: gamesReceivedSubscribersType| null = null
const newGameHandlerCreator = (dispatch: Dispatch) => {
    if (_newGameHandler === null) {
        _newGameHandler = (games: GameApiType[]) => {
            debugger
            dispatch(actionChat.setGames(games))
        }
    }
    return _newGameHandler

}

export type statusReceivedSubscribersType = (status: statusType) => void
let _newStatusChanged: statusReceivedSubscribersType | null = null
const newStatusChangedCreator = (dispatch: Dispatch) => {
    if (_newStatusChanged === null) {
        _newStatusChanged = (status: statusType) => {
            dispatch(actionChat.setStatus(status))
        }
    }
    return _newStatusChanged
}


export const startMessagesListening = ():ThunkActionType => async (dispatch,getState) => {
    const token=getState().auth.token
    if(token){
        chatApi.start(token)
        chatApi.subscribe("messagesReceived", newMessageHandlerCreator(dispatch))
        chatApi.subscribe("gameListReceived", newGameHandlerCreator(dispatch))
        chatApi.subscribe("statusChanged", newStatusChangedCreator(dispatch))
    }
}
export const stopMessagesListening = (): ThunkActionType => async (dispatch) => {
    chatApi.unSubscribe("messagesReceived", newMessageHandlerCreator(dispatch))
    chatApi.unSubscribe("gameListReceived", newGameHandlerCreator(dispatch))
    chatApi.unSubscribe("statusChanged", newStatusChangedCreator(dispatch))
    chatApi.stop()
    dispatch(actionChat.deleteMessages())
    dispatch(actionChat.deleteGames())
}



export const sendMessage = (message: string): ThunkActionType => async () => {
        chatApi.sendMessage({
            eventName: "message",
            date: {
                messages: message
            }
        })
}
export const sendGame = (game: string): ThunkActionType => async () => {
        chatApi.sendMessage({
            eventName: "listGame",
            date: {
                nameGame: game
            }
        })
}


export default chatReducer;


