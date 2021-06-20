import {BaseActionType, InferActionsTypes} from "./redux-store";
import {
    chatApi,
    deleteGameApiType,
    GameApiType,
    gameRoomApiType,
    gameRoomType,
    MessageApiType, StartGameType,
    statusType
} from "../api/chatApi";
import {Dispatch} from "redux";
import {v1} from "uuid"


export type MessageType = MessageApiType & { id: string }
export type GamesType = GameApiType & { id: string }

let initialState = {
    messages: [] as MessageType[],
    listGames: [] as GamesType[],
    status: "pending" as statusType,
    gameRoom:[] as gameRoomType[],
    startGame:{} as StartGameType
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
                listGames: []
            }
        case "CHAT_DELETE_ROOMS":
            return {
                ...state,
                gameRoom: []
            }
        case "SET_GAMES":
            return {
                ...state,
                listGames: [...state.listGames, ...action.listGames]
            }
        case "SET_GAME_ROOM":
            return {
                ...state,
                gameRoom: [...state.gameRoom, ...action.gameRoom]
            }
        case "DELETE_GAME":
            return {
                ...state,
                listGames: [...state.listGames.filter(game=> game.id !== action.gameDeleteDate.date.idGameDelete)]
            }
        case "CHAT_SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "SET_START_GAME":
            return {
                ...state,
                startGame: action.game
            }
        default:
            return state;
    }
}


type ActionType = InferActionsTypes<typeof actionChat>
export const actionChat = {
    deleteMessages: () => ({type: "CHAT_DELETE_MESSAGES"} as const),
    deleteListGames: () => ({type: "CHAT_DELETE_GAMES"} as const),
    deleteRooms: () => ({type: "CHAT_DELETE_ROOMS"} as const),

    setMessages: (messages: MessageApiType[]) => ({type: "CHAT_SET_MESSAGES", messages} as const),
    setStatus: (status: statusType) => ({type: "CHAT_SET_STATUS", status} as const),
    setListGames: (listGames: GameApiType[]) => ({type: "SET_GAMES", listGames} as const),
    addGameRoom: (gameRoom: gameRoomType[]) => ({type: "SET_GAME_ROOM", gameRoom} as const),
    startGame: (game: StartGameType) => ({type: "SET_START_GAME", game} as const),

    deleteGameInList: (gameDeleteDate: deleteGameApiType) => ({type: "DELETE_GAME", gameDeleteDate} as const),
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
            dispatch(actionChat.setListGames(games))
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
export type deleteGameReceivedSubscribersType = (gameDeleteDate: deleteGameApiType) => void
let _newDeleteGame: deleteGameReceivedSubscribersType | null = null
const newDeleteGameCreator = (dispatch: Dispatch) => {
    if (_newDeleteGame === null) {
        _newDeleteGame = (gameDeleteDate: deleteGameApiType) => {
            dispatch(actionChat.deleteGameInList(gameDeleteDate))
        }
    }
    return _newDeleteGame
}
export type gameRoomReceivedSubscribersType = (gameRoom: gameRoomType[]) => void
let _newGameRoom: gameRoomReceivedSubscribersType | null = null
const newGameRoomCreator = (dispatch: Dispatch) => {
    if (_newGameRoom === null) {
        _newGameRoom = (gameRoom: gameRoomType[]) => {
            dispatch(actionChat.addGameRoom(gameRoom))
        }
    }
    return _newGameRoom
}
export type newStartGameReceivedSubscribersType = (date:StartGameType) => void
let _newStartGame: newStartGameReceivedSubscribersType | null = null
const newStartGameCreator = (dispatch: Dispatch) => {
    if (_newStartGame === null) {
        _newStartGame = (date:StartGameType) => {
            dispatch(actionChat.startGame(date))
        }
    }
    return _newStartGame
}


export const startMessagesListening = ():ThunkActionType => async (dispatch,getState) => {
    const token=getState().auth.token
    if(token){
        chatApi.start(token)
        chatApi.subscribe("messagesReceived", newMessageHandlerCreator(dispatch))
        chatApi.subscribe("gameListReceived", newGameHandlerCreator(dispatch))
        chatApi.subscribe("statusChanged", newStatusChangedCreator(dispatch))
        chatApi.subscribe("deleteGameListReceived", newDeleteGameCreator(dispatch))
        chatApi.subscribe("acceptGame", newGameRoomCreator(dispatch))
    }
}
export const stopMessagesListening = (): ThunkActionType => async (dispatch) => {
    chatApi.unSubscribe("messagesReceived", newMessageHandlerCreator(dispatch))
    chatApi.unSubscribe("gameListReceived", newGameHandlerCreator(dispatch))
    chatApi.unSubscribe("statusChanged", newStatusChangedCreator(dispatch))
    chatApi.unSubscribe("deleteGameListReceived", newDeleteGameCreator(dispatch))
    chatApi.unSubscribe("acceptGame", newGameRoomCreator(dispatch))
    chatApi.stop()
    dispatch(actionChat.deleteMessages())
    dispatch(actionChat.deleteListGames())
    dispatch(actionChat.deleteRooms())
}

export const startGameListening = ():ThunkActionType => async (dispatch,getState) => {
    const token=getState().auth.token
    if(token){
        chatApi.start(token)
        chatApi.subscribe("acceptGame", newGameRoomCreator(dispatch))
        chatApi.subscribe("startGame", newStartGameCreator(dispatch))
        chatApi.subscribe("statusChanged", newStatusChangedCreator(dispatch))
    }
}
export const stopGameListening = (): ThunkActionType => async (dispatch) => {
    chatApi.unSubscribe("acceptGame", newGameRoomCreator(dispatch))
    chatApi.unSubscribe("startGame", newStartGameCreator(dispatch))
    chatApi.unSubscribe("statusChanged", newStatusChangedCreator(dispatch))
    chatApi.stop()
    dispatch(actionChat.deleteRooms())
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
export const deleteGame = (gameId: string): ThunkActionType => async () => {
        chatApi.sendMessage({
            eventName: "deleteGameOfId",
            date: {
                id: gameId
            }
        })
}
export const acceptGame = (gameId: string): ThunkActionType => async () => {
        chatApi.sendMessage({
            eventName: "acceptGameOfId",
            date: {
                id: gameId

            }
        })
}
export const startGame = (gameId: string): ThunkActionType => async () => {
    debugger
        chatApi.sendMessage({
            eventName: "startGame",
            date: {
                gameId: gameId
            }
        })
}


export default chatReducer;


