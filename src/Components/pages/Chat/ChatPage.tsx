import React, {FC, useEffect, useRef, useState} from "react";
import {Form, Formik, FormikHelpers} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {createFieldFormikTextarea} from "../../../commen/FormikControls/FormikControls";
import {getMessages, getStatus} from "../../../redux/chat-selectors";
import {MessageType, sendMessage, startMessagesListening, stopMessagesListening} from "../../../redux/chat-reducer";
import {MessageApiType, statusType} from "../../../api/chatApi";
import UserAvatar from "../../../commen/UserAvatar/UserAvatar";


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
        <Messages messages={messages}/>
        <div style={{paddingTop: 5, paddingBottom: 5}}>
            <AddMessagesForm statusWS={statusWS} sendMessageForm={sendMessageForm}/>
        </div>

    </div>
}

type MessagesType = {
    messages: MessageType[]
}
export const Messages: FC<MessagesType> = ({messages}) => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget

        /*console.log("scrollHeight:" + element.scrollHeight + "\n"+
                     "scrollLeft:" + element.scrollLeft + "\n"+
                     "scrollTop:" + element.scrollTop + "\n"+
                     "scrollWidth:" +  element.scrollWidth + "\n"+
                     "clientHeight:" +  element.clientHeight + "\n")
*/
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 20) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({block: 'end', behavior: "auto"})
        }
    }, [messages])

    return <div style={{height: "400px", overflow: "auto"}} onScroll={scrollHandler}>
        {messages.map((m) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const validateTerm = (values: any) => {
    const errors = {} as { term: string };
    if (values.term.length > 100) {
        errors.term = 'сообщение более 100 символов';
    }
    return errors;
}


type AddMessagesFormType = {
    statusWS: statusType
    sendMessageForm: (values: string) => void
}
export const AddMessagesForm: FC<AddMessagesFormType> = ({statusWS, sendMessageForm}) => {
    const refButton = useRef<HTMLButtonElement>(null)
    const submitForm = (values: { term: string },
                        {setSubmitting, resetForm}: FormikHelpers<{ term: string }>,) => {
        sendMessageForm(values.term)
        resetForm()
        setSubmitting(false)
    }
    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.key === "Enter") {
            refButton.current?.click()
        }
    }
    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: ""}}
            validate={validateTerm}
            onSubmit={submitForm}
        >
            {({errors, touched, isSubmitting, values}) => (
                <Form style={{display: "inline-flex",}}>
                    <div style={{width: "auto"}}>
                        {createFieldFormikTextarea<{ term: string }>("твое сообщение",
                            "term", undefined, "text", {onKeyDown})}
                    </div>
                    <div style={{padding: 5}}>
                        <button ref={refButton} type="submit"
                                disabled={statusWS !== "ready" || isSubmitting || !values.term}>
                            send
                        </button>
                    </div>

                </Form>
            )}
        </Formik>
        {statusWS !== "ready" && <div> идет соединение</div>}
    </div>
}


const Message: FC<{ message: MessageApiType }> = React.memo(({message}) => {
    return <div >
        <div style={{display:"inline-flex", }}>
            <div style={{minWidth: 120}}>
                <UserAvatar name={message.userName} avatar={{small: message.photo, large: ""}}
                            link={`/profile/${message.userId}`}/>
            </div>
            <div style={{wordBreak: "break-all"}}>
                {message.message}
            </div>
        </div>

        <hr/>
    </div>
})
