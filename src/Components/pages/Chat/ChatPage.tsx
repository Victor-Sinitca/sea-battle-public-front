import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMessages, getStatus} from "../../../redux/chat-selectors";
import {MessageType, sendMessage, startMessagesListening, stopMessagesListening} from "../../../redux/chat-reducer";
import {statusType} from "../../../api/chatApi";
import {ListChatMessages} from "./ListChatMessages";
import {AddMessagesFormChat} from "./AddMeesagesFormChat";
import {ListChatMessagesBattle} from "./ListChatMessagesBattle";


export const ChatPage: FC = () => {
    const dispatch = useDispatch()
    const statusWS = useSelector(getStatus)
    const messages = useSelector(getMessages)

    const sendMessageForm = (term: string) => {
        dispatch(sendMessage(term))
    }

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
    return <div style={{paddingTop:20}}>
        <Chat statusWS={statusWS} messages={messages} sendMessageForm={sendMessageForm}/>
    </div>
}




type ChatType = {
    statusWS: statusType
    messages: MessageType[]
    sendMessageForm: (values: string) => void
}
export const Chat: FC<ChatType> = ({statusWS, messages, sendMessageForm}) => {
    return <div>
        {statusWS === "error" && <div>Some error occurred. Please refresh the page</div>}
        <ListChatMessages messages={messages}/>
        <div style={{paddingTop: 5, paddingBottom: 5}}>
            <AddMessagesFormChat statusWS={statusWS} sendMessageForm={sendMessageForm}/>
        </div>
    </div>
}


type ChatInBattleType = {
    statusWS: statusType
    messages: MessageType[]
    sendMessageForm: (values: string) => void
}
export const ChatInBattle: FC<ChatInBattleType> = ({statusWS, messages, sendMessageForm}) => {
    return <div>
        {statusWS === "error" && <div>Some error occurred. Please refresh the page</div>}
        <div style={{paddingTop: 5, paddingBottom: 5}}>
            <AddMessagesFormChat statusWS={statusWS} sendMessageForm={sendMessageForm}/>
        </div>
        <ListChatMessagesBattle messages={messages} heightMessage={200}/>
    </div>
}

