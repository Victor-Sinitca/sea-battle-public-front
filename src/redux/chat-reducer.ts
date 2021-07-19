import {AppStateType, BaseActionType, InferActionsTypes} from "./redux-store";
import {
    chatApi,
    deleteGameApiType,
    GameApiType,
    gameRoomType,
    MessageApiType,
    StartGameType,
    statusType
} from "../api/chatApi";
import {Dispatch} from "redux";
import {v1} from "uuid"
import {checkForShipInput, lockMap} from "../commen/logics/checkForShipInput/checkForSingleShipInput";
import {SectorType} from "../../Types/Types";
import {refreshAPI} from "./authHttp-reducer";


export type MessageType = MessageApiType & { id: string }
export type GamesType = GameApiType & { id: string }


let initialState = {
    messages: [] as MessageType[],
    listGames: [] as GamesType[],
    status: "pending" as statusType,
    gameRoom: [] as gameRoomType[],
    startGames: [] as [] | StartGameType[],
    activeStartGameId: null as string | null,
}

type initialStateType = typeof initialState
const chatReducer = (state = initialState as initialStateType, action: ActionType): initialStateType => {
    let stateCopy: initialStateType
    switch (action.type) {
        case "CHAT_SET_MESSAGES":
            return {
                ...state,
                messages: [...state.messages, ...action.messages.map(m => ({...m, id: v1()}))].filter(
                    (m, index, array) => index >= array.length - 100)
            }
        case "CHAT_SET_MESSAGES_MB":
            stateCopy = {...state}
            stateCopy.startGames = [...state.startGames]
            stateCopy.startGames.forEach((value,index,array)=>{
                if(value.gameId === action.gameId){
                    debugger
                    value.chatData = [...state.startGames[index].chatData, ...action.messages.map(m => ({...m, id: v1()})) ]
                    let ddd= value.chatData
                    debugger
                }
            })
            return stateCopy
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
        case "DELETE_GAME_IN_ROOM_OF_ID": {
            if (action.userId === action.date.firstUser.id || action.userId === action.date.secondUser.id) {
                return {
                    ...state,
                    gameRoom: [...state.gameRoom.map((g) => {
                        if (g.gamesRoomId === action.date.gamesRoomId) {
                            return action.date
                        } else return g
                    })]
                }
            } else return {
                ...state,
                gameRoom: [...state.gameRoom.filter((g) => g.gamesRoomId !== action.date.gamesRoomId)]
            }
        }
        case "DELETE_GAME":
            return {
                ...state,
                listGames: [...state.listGames.filter(game => game.id !== action.gameDeleteDate.date.idGameDelete)]
            }
        case "CHAT_SET_STATUS":
            return {
                ...state,
                status: action.status
            }

        case "SET_ACTIVE_START_GAME_ID":
            return {
                ...state,
                activeStartGameId: action.activeStartGameId
            }


        case "SET_START_GAME": {
            let isNewGame = true
            let newStartGames = state.startGames.map((g: StartGameType) => {
                if (g.gameId === action.game[0].gameId) {
                    isNewGame = false
                    return action.game[0]
                } else return g
            })
            if (isNewGame){
                return {
                    ...state,
                    startGames:[...state.startGames , ...action.game]
                }
            } else return {
                ...state,
                startGames:[...newStartGames ]
            }
        }
        case "BATTLE_UNLOCK_FOR_SET_SHIP" : {
            stateCopy = {...state}
            stateCopy.startGames.forEach((value,index,array)=>{
                if(value.gameId === state.activeStartGameId){
                    if(action.firstUser){
                        value.gameData.FUMap = [...stateCopy.startGames[index].gameData.FUMap];
                        value.gameData.FUMap = checkForShipInput(stateCopy.startGames[index].gameData.FUMap,
                            action.horizon, action.shipValue, true).userMap
                    }else{
                        value.gameData.SUMap = [...stateCopy.startGames[index].gameData.SUMap];
                        value.gameData.SUMap = checkForShipInput(stateCopy.startGames[index].gameData.SUMap,
                            action.horizon, action.shipValue, true).userMap
                    }
                }
            })
            return stateCopy


            /*if (action.firstUser && state.startGames) {
                stateCopy = {...state}
                if (stateCopy.startGames) {
                    stateCopy.startGames.gameData.FUMap = [...state.startGames.gameData.FUMap];
                    stateCopy.startGames.gameData.FUMap =
                        checkForShipInput(stateCopy.startGames.gameData.FUMap, action.horizon, action.shipValue, true).userMap
                    return stateCopy
                } else return state
            } else if (state.startGames) {
                stateCopy = {...state}
                if (stateCopy.startGames) {
                    stateCopy.startGames.gameData.SUMap = [...state.startGames.gameData.SUMap];
                    stateCopy.startGames.gameData.SUMap = checkForShipInput(stateCopy.startGames.gameData.SUMap, action.horizon, action.shipValue, true).userMap
                    return stateCopy
                } else return state
            } else {
                console.log(`Error UNLOCK_FOR_SET_SHIP. First User is ${action.firstUser}`)
                return state
            }*/
        }
        case "BATTLE_LOCK_ALL_MAP": {
            stateCopy = {...state}
            stateCopy.startGames.forEach((value,index,array)=>{
                if(value.gameId === state.activeStartGameId){
                    if(action.firstUser){
                        value.gameData.FUMap = [...state.startGames[index].gameData.FUMap];
                        value.gameData.FUMap = lockMap(stateCopy.startGames[index].gameData.FUMap)
                    }else{
                        value.gameData.SUMap = [...state.startGames[index].gameData.SUMap];
                        value.gameData.SUMap = lockMap(stateCopy.startGames[index].gameData.SUMap)
                    }
                }
            })
            return stateCopy

            /*if (action.firstUser && state.startGames) {
                stateCopy = {...state}
                if (stateCopy.startGames) {
                    stateCopy.startGames.gameData.FUMap = [...state.startGames.gameData.FUMap];
                    stateCopy.startGames.gameData.FUMap = lockMap(stateCopy.startGames.gameData.FUMap)
                    return stateCopy
                } else return state

            } else if (state.startGames?.gameData.SUMap) {
                stateCopy = {...state}
                if (stateCopy.startGames) {
                    stateCopy.startGames.gameData.SUMap = [...state.startGames.gameData.SUMap];
                    stateCopy.startGames.gameData.SUMap = lockMap(stateCopy.startGames.gameData.SUMap)
                    return stateCopy
                } else return state
            } else {
                console.log(`Error LOCK_ALL_MAP. First User is ${action.firstUser}`)
                return state
            }*/
        }
        default:
            return state;
    }
}


type ActionType = InferActionsTypes<typeof actionChat>
export const actionChat = {
    lockAllMap: (firstUser: boolean,) => {
        return ({type: "BATTLE_LOCK_ALL_MAP", firstUser,} as const)
    },
    unlockForSetShip: (shipValue: number, horizon: boolean, firstUser: boolean,) => {
        return ({type: "BATTLE_UNLOCK_FOR_SET_SHIP", shipValue, horizon, firstUser,} as const)
    },
    deleteMessages: () => ({type: "CHAT_DELETE_MESSAGES"} as const),
    deleteListGames: () => ({type: "CHAT_DELETE_GAMES"} as const),
    deleteRooms: () => ({type: "CHAT_DELETE_ROOMS"} as const),
    setMessages: (messages: MessageApiType[]) => ({type: "CHAT_SET_MESSAGES", messages} as const),
    setMessagesMB: (messages: MessageApiType[], gameId:string) => ({type: "CHAT_SET_MESSAGES_MB", messages,gameId} as const),
    setStatus: (status: statusType) => ({type: "CHAT_SET_STATUS", status} as const),
    setListGames: (listGames: GameApiType[]) => ({type: "SET_GAMES", listGames} as const),
    addGameRoom: (gameRoom: gameRoomType[]) => ({type: "SET_GAME_ROOM", gameRoom} as const),
    startGames: (game: StartGameType[]) => ({type: "SET_START_GAME", game} as const),
    setActiveStartGameId: (activeStartGameId: string) => ({type: "SET_ACTIVE_START_GAME_ID", activeStartGameId} as const),
    setShotMB: (game: StartGameType[]) => ({type: "SET_SHOT_START_GAME", game} as const),
    deleteGameInList: (gameDeleteDate: deleteGameApiType) => ({type: "DELETE_GAME", gameDeleteDate} as const),
    deleteGameInRoomOfId: (date: gameRoomType, userId: string | undefined) => ({
        type: "DELETE_GAME_IN_ROOM_OF_ID",
        date,
        userId
    } as const),
}


type ThunkActionType = BaseActionType<ActionType>


export type messagesReceivedSubscribersType = (messages: MessageApiType[]) => void
let _newMessageHandler: messagesReceivedSubscribersType | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: MessageApiType[]) => {
            dispatch(actionChat.setMessages(messages))
        }
    }
    return _newMessageHandler

}
export type messagesMBReceivedSubscribersType = (data:{
    messages: MessageApiType[],gameId:string
}) => void
let _newMessageMBHandler: messagesMBReceivedSubscribersType | null = null
const newMessageMBHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageMBHandler === null) {
        _newMessageMBHandler = (data) => {
            debugger
            dispatch(actionChat.setMessagesMB(data.messages,data.gameId))
        }
    }
    return _newMessageMBHandler

}
export type gamesReceivedSubscribersType = (games: GameApiType[]) => void
let _newGameHandler: gamesReceivedSubscribersType | null = null
const newGameHandlerCreator = (dispatch: Dispatch) => {
    if (_newGameHandler === null) {
        _newGameHandler = (games: GameApiType[]) => {
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
export type newStartGameReceivedSubscribersType = (date: StartGameType[]) => void
let _newStartGame: newStartGameReceivedSubscribersType | null = null
const newStartGameCreator = (dispatch: Dispatch) => {
    if (_newStartGame === null) {
        _newStartGame = (date: StartGameType[]) => {
            dispatch(actionChat.startGames(date))
        }
    }
    return _newStartGame
}
export type newShotGameReceivedSubscribersType = (date: StartGameType[]) => void
let _newShotGame: newShotGameReceivedSubscribersType | null = null
const newShotGameCreator = (dispatch: Dispatch) => {
    if (_newShotGame === null) {
        _newShotGame = (date: StartGameType[]) => {
            dispatch(actionChat.setShotMB(date))
        }
    }
    return _newShotGame
}
export type newLeaveGameRoomOfIdReceivedSubscribersType = (date: gameRoomType) => void
let _newLeaveGameRoomOfId: newLeaveGameRoomOfIdReceivedSubscribersType | null = null
const newLeaveGameRoomOfIdCreator = (dispatch: Dispatch, userId: string | undefined) => {
    if (_newLeaveGameRoomOfId === null) {
        _newLeaveGameRoomOfId = (date: gameRoomType) => {

            dispatch(actionChat.deleteGameInRoomOfId(date, userId))
        }
    }
    return _newLeaveGameRoomOfId
}


export const startMessagesListening = (): ThunkActionType => async (dispatch, getState) => {
    await dispatch(refreshAPI())
    const token = localStorage.getItem("token")
    if (token) {
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

export const startGameListening = (): ThunkActionType => async (dispatch, getState) => {
    await dispatch(refreshAPI())
    const token = localStorage.getItem("token")
    if (token) {
        chatApi.start(token)
        chatApi.subscribe("acceptGame", newGameRoomCreator(dispatch))
        chatApi.subscribe("leaveGameRoomOfId", newLeaveGameRoomOfIdCreator(dispatch, getState().authHttp.user?.id))
        chatApi.subscribe("startGames", newStartGameCreator(dispatch))
        chatApi.subscribe("setShotGame", newShotGameCreator(dispatch))
        chatApi.subscribe("startGameSendMessage", newMessageMBHandlerCreator(dispatch))
        chatApi.subscribe("statusChanged", newStatusChangedCreator(dispatch))
    }
}
export const stopGameListening = (): ThunkActionType => async (dispatch, getState) => {
    chatApi.unSubscribe("acceptGame", newGameRoomCreator(dispatch))
    chatApi.unSubscribe("leaveGameRoomOfId", newLeaveGameRoomOfIdCreator(dispatch, getState().authHttp.user?.id))
    chatApi.unSubscribe("startGames", newStartGameCreator(dispatch))
    chatApi.unSubscribe("setShotGame", newShotGameCreator(dispatch))
    chatApi.unSubscribe("startGameSendMessage", newMessageMBHandlerCreator(dispatch))
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
export const sendMessageMB = (message: string , gameId:string): ThunkActionType => async () => {
    chatApi.sendMessage({
        eventName: "startGameSendMessage",
        date: {
            gameId:gameId,
            message: message
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
export const startGameReducer = (gameId: string): ThunkActionType => async () => {
    chatApi.sendMessage({
        eventName: "startGame",
        date: {
            gameId: gameId
        }
    })
}
export const deleteShipOnMapOnWS = (sector: SectorType, gameId: string, userId: string): ThunkActionType => async () => {
    debugger
    chatApi.sendMessage({
        eventName: "startGameDeleteShip",
        date: {
            sector: sector,
            gameId: gameId,
            userId: userId
        }
    })
}
export const setShipUserOnWS = (sector: SectorType, gameId: string, userId: string,
                                horizonSetShip: boolean, whatSetShip: number): ThunkActionType => async () => {
    chatApi.sendMessage({
        eventName: "startGameSetShip",
        date: {
            sector: {
                x: sector.x,
                y: sector.y,
            },
            gameId: gameId,
            userId: userId,
            horizonSetShip: horizonSetShip,
            whatSetShip: whatSetShip
        }
    })
}
export const setShotUserOnWS = (sector: SectorType, gameId: string, userId: string): ThunkActionType => async () => {
    debugger
    chatApi.sendMessage({
        eventName: "startGameSetShot",
        date: {
            gameId: gameId,
            userId: userId,
            sector: sector
        }
    })
}
export const setShipsRandomOnWS = (gameId: string, userId: string): ThunkActionType => async () => {
    debugger
    chatApi.sendMessage({
        eventName: "startGameSetShipsRandom",
        date: {
            gameId: gameId,
            userId: userId
        }
    })
}
export const clearMapOnWS = (gameId: string, userId: string): ThunkActionType => async () => {
    chatApi.sendMessage({
        eventName: "startGameClearMap",
        date: {
            gameId: gameId,
            userId: userId
        }
    })
}
export const startGameUserOnWS = (gameId: string, userId: string): ThunkActionType => async () => {
    chatApi.sendMessage({
        eventName: "startGameUser",
        date: {
            gameId: gameId,
            userId: userId
        }
    })
}
export const leaveGameRoomOfId = (gameId: string, userId: string): ThunkActionType => async () => {
    chatApi.sendMessage({
        eventName: "leaveGameRoomOfId",
        date: {
            gamesRoomId: gameId,
            userId: userId
        }
    })
}


export default chatReducer;


