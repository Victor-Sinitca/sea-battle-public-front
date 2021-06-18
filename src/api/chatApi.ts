import {
    deleteGameReceivedSubscribersType, gameRoomReceivedSubscribersType,
    gamesReceivedSubscribersType,
    messagesReceivedSubscribersType,
    statusReceivedSubscribersType
} from "../redux/chat-reducer";

let subscribers = {
    "messagesReceived": [] as messagesReceivedSubscribersType[],
    "gameListReceived": [] as gamesReceivedSubscribersType[],
    "deleteGameListReceived": [] as deleteGameReceivedSubscribersType[],
    "statusChanged": [] as statusReceivedSubscribersType[],
    "acceptGame": [] as gameRoomReceivedSubscribersType[]
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
    debugger
    ws = new WebSocket(`ws://localhost:8000/?id=${tokenDate}`);
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


export type statusType = "pending" | "ready" | "error"
export type eventName = "messagesReceived" | "statusChanged" | "gameListReceived" | "deleteGameListReceived" | "acceptGame"
export type callbackType = messagesReceivedSubscribersType | statusReceivedSubscribersType
    | gamesReceivedSubscribersType | deleteGameReceivedSubscribersType | gameRoomReceivedSubscribersType
