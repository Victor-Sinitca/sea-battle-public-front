import {BaseActionType, InferActionsTypes} from "./redux-store";
import {chatApi, MessageApiType, statusType} from "../api/chatApi";
import {Dispatch} from "redux";
import {v1} from "uuid"


type MessageType = MessageApiType & { id: string }

let initialState = {
    messages: [] as MessageType[],
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
    setMessages: (messages: MessageApiType[]) => ({type: "CHAT_SET_MESSAGES", messages} as const),
    setStatus: (status: statusType) => ({type: "CHAT_SET_STATUS", status} as const),
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
        chatApi.subscribe("statusChanged", newStatusChangedCreator(dispatch))
    }

}
export const stopMessagesListening = (): ThunkActionType => async (dispatch) => {
    chatApi.unSubscribe("messagesReceived", newMessageHandlerCreator(dispatch))
    chatApi.unSubscribe("statusChanged", newStatusChangedCreator(dispatch))
    chatApi.stop()
    dispatch(actionChat.deleteMessages())
}
export const sendMessage = (message: string): ThunkActionType => async (dispatch,getState) => {
    const newMessage={
        token:getState().auth.token,
        message:message
    }
    chatApi.sendMessage(message)
}


export default chatReducer;


