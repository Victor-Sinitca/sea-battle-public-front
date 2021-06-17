import {
    gamesReceivedSubscribersType,
    messagesReceivedSubscribersType,
    statusReceivedSubscribersType
} from "../redux/chat-reducer";

let subscribers = {
    "messagesReceived": [] as messagesReceivedSubscribersType[],
    "gameListReceived": [] as messagesReceivedSubscribersType[],
    "statusChanged": [] as statusReceivedSubscribersType[]
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
    },
    subscribe(eventName: eventName,
              callback: messagesReceivedSubscribersType | statusReceivedSubscribersType | gamesReceivedSubscribersType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s != callback)
        }
    },
    unSubscribe(eventName: eventName,
                callback: messagesReceivedSubscribersType | statusReceivedSubscribersType | gamesReceivedSubscribersType) {
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
    nameGame:string,
    userId: string,
    userName: string,
}
export type statusType = "pending" | "ready" | "error"
export type eventName = "messagesReceived" | "statusChanged" | "gameListReceived"