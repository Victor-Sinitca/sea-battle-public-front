import {
    deleteGameReceivedSubscribersType,
    gameRoomReceivedSubscribersType,
    gamesReceivedSubscribersType,
    messagesReceivedSubscribersType,
    newLeaveGameRoomOfIdReceivedSubscribersType,
    newShotGameReceivedSubscribersType,
    newStartGameReceivedSubscribersType,
    statusReceivedSubscribersType
} from "../redux/chat-reducer";
import {SectorType} from "../../Types/Types";
import {API_WS} from "./index";

let subscribers = {
    "messagesReceived": [] as messagesReceivedSubscribersType[],
    "gameListReceived": [] as gamesReceivedSubscribersType[],
    "deleteGameListReceived": [] as deleteGameReceivedSubscribersType[],
    "statusChanged": [] as statusReceivedSubscribersType[],
    "acceptGame": [] as gameRoomReceivedSubscribersType[],
    "startGames": [] as newStartGameReceivedSubscribersType[],
    "leaveGameRoomOfId": [] as newLeaveGameRoomOfIdReceivedSubscribersType[],
    "setShotGame": [] as newShotGameReceivedSubscribersType[]
}


let ws: WebSocket | null = null
let tokenDate: string

const closeHandler = () => {
    notifySubscribersAboutStatus("pending")
    console.log("wsChanel is CLOSE")
    setTimeout(createChanel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    if (newMessages.eventName === "allDate") {
        subscribers["gameListReceived"].forEach(s => s(newMessages.date.games))
        subscribers["messagesReceived"].forEach(s => s(newMessages.date.messages))

    }
    if (newMessages.eventName === "listGame") {
        subscribers["gameListReceived"].forEach(s => s(newMessages.date.games))
    }
    if (newMessages.eventName === "message") {
        subscribers["messagesReceived"].forEach(s => s(newMessages.date.messages))
    }
    if (newMessages.eventName === "deleteGameOfId") {
        subscribers["deleteGameListReceived"].forEach(s => s(newMessages))
    }
    if (newMessages.eventName === "acceptGameOfId") {
        subscribers["acceptGame"].forEach(s => s(newMessages.date))
    }
    if (newMessages.eventName === "startGame") {
        subscribers["startGames"].forEach(s => s(newMessages.date))
    }
    if (newMessages.eventName === "setShotGame") {
        subscribers["setShotGame"].forEach(s => s(newMessages.date))
    }
    if (newMessages.eventName === "startGameDeleteGameOfId") {
        subscribers["leaveGameRoomOfId"].forEach(s => s(newMessages.date))
    }
}
const openHandler = () => {
    notifySubscribersAboutStatus("ready")
}
const errorHandler = () => {
    notifySubscribersAboutStatus("error")
    console.error("RESTART PAGE")
}
const notifySubscribersAboutStatus = (status: statusType) => {
    subscribers["statusChanged"].forEach(s => s(status))
}
const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", messageHandler)
    ws?.removeEventListener("open", openHandler)
    ws?.removeEventListener("error", errorHandler)
    ws?.close()
}

function createChanel(token: string) {
    if (token) {
        tokenDate = token
    }
    cleanUp()
    /*    ws = new WebSocket(`ws://localhost:8000/?id=${tokenDate}`);*/
    ws = new WebSocket(`${API_WS}/?id=${tokenDate}`);
    notifySubscribersAboutStatus("pending")
    ws?.addEventListener("close", closeHandler)
    ws?.addEventListener("message", messageHandler)
    ws?.addEventListener("open", openHandler)
    ws?.addEventListener("error", errorHandler)
}

export const chatApi = {
    start(token: string) {
        createChanel(token)
    },
    stop() {
        cleanUp()
        subscribers["statusChanged"] = []
        subscribers["messagesReceived"] = []
        subscribers["deleteGameListReceived"] = []
        subscribers["gameListReceived"] = []
        subscribers["acceptGame"] = []
        subscribers["startGames"] = []
        subscribers["setShotGame"] = []
        subscribers["leaveGameRoomOfId"] = []
    },
    subscribe(eventName: eventName, callback: callbackType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s != callback)
        }
    },
    unSubscribe(eventName: eventName, callback: callbackType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s != callback)
    },
    sendMessage(message: any) {
        ws?.send(JSON.stringify(message))
    }
}

export type MessageApiType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
export type GameApiType = {
    nameGame: string,
    userId: string,
    userName: string,
    id: string
}
export type deleteGameApiType = {
    eventName: "deleteGameOfId",
    date: {
        message: string,
        idGameDelete: string
    }
}
export type gameRoomApiType = {
    eventName: "acceptGameOfId",
    date: gameRoomType[]
}

export type gameRoomType = {
    firstUser: {
        id: string,
        name: string
    },
    secondUser: {
        id: string,
        name: string
    },
    gamesRoomId: string,
}
export type StartGameType = {
    gameId: string,
    firstUser: {
        id: string,
        name: string
    },
    secondUser: {
        id: string,
        name: string
    },
    winnerUser: null | string,
    gameData: {
        FUMap: Array<Array<{ sector: SectorType }>>,
        SUMap: Array<Array<{ sector: SectorType }>>,
        FUTurn: {
            turn: true
        },
        FUShips: {
            ship1: number,
            ship2: number,
            ship3: number,
            ship4: number,
            numberShips1: number,
            numberShips2: number,
            numberShips3: number,
            numberShips4: number,
        },
        SUShips: {
            ship1: number,
            ship2: number,
            ship3: number,
            ship4: number,
            numberShips1: number,
            numberShips2: number,
            numberShips3: number,
            numberShips4: number,
        },
        settingShipUser: {
            firstUser: boolean,
            secondUser: boolean,
        },
        chatData: MessageApiType[]
    }
}

export type statusType = "pending" | "ready" | "error"
export type eventName =
    "messagesReceived"
    | "statusChanged"
    | "gameListReceived"
    | "deleteGameListReceived"
    | "acceptGame"
    | "startGames"
    | "leaveGameRoomOfId"
    | "setShotGame"
export type callbackType = messagesReceivedSubscribersType | statusReceivedSubscribersType
    | gamesReceivedSubscribersType | deleteGameReceivedSubscribersType | gameRoomReceivedSubscribersType
    | newStartGameReceivedSubscribersType | newLeaveGameRoomOfIdReceivedSubscribersType | newShotGameReceivedSubscribersType
