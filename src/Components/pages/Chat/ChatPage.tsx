import React, {FC, useEffect, useRef, useState} from "react";
import {Form, Formik, FormikHelpers} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {createFieldFormikTextarea} from "../../../commen/FormikControls/FormikControls";
import {getMessages, getStatus} from "../../../redux/chat-selectors";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../../redux/chat-reducer";
import {MessageApiType} from "../../../api/chatApi";
import UserAvatar from "../../../commen/UserAvatar/UserAvatar";


export const ChatPage: FC = () => {
    return <div>
        <Chat/>
    </div>
}


const Chat: FC = () => {
    const dispatch = useDispatch()
    const statusWS = useSelector(getStatus)
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        {statusWS === "error" && <div>Some error occurred. Please refresh the page</div>}
        <Messages/>
        <AddMessagesForm/>
    </div>
}


const Messages: FC = () => {
    const messages = useSelector(getMessages)
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
        errors.term = 'сообщение долее 100 символов';
    }
    return errors;
}

const AddMessagesForm: FC = () => {
    const statusWS = useSelector(getStatus)
    const dispatch = useDispatch()
    const refButton= useRef<HTMLButtonElement>(null)


    const submitForm = (values: { term: string },
                        {setSubmitting, resetForm}: FormikHelpers<{ term: string }>,) => {
        dispatch(sendMessage(values.term))
        resetForm()
        setSubmitting(false)
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.key === "Enter") {
            refButton.current?.click()
        }
    }

    return <div style={{paddingTop: "20px"}}>
        <Formik
            enableReinitialize
            initialValues={{term: ""}}
            validate={validateTerm}
            onSubmit={submitForm}
        >
            {({errors,  touched, isSubmitting}) => (
                <Form >
                    <div style={{width: 300}}>
                        {createFieldFormikTextarea<{ term: string }>("твое сообщение",
                            "term", undefined, "text", {onKeyDown})}
                    </div>
                    <button ref={refButton} type="submit" disabled={statusWS !== "ready" || isSubmitting}>
                        send
                    </button>
                </Form>
            )}
        </Formik>
        {statusWS !== "ready" && <div> идет соединение</div>}
    </div>
}


const Message: FC<{ message: MessageApiType }> = React.memo(({message}) => {
    return <div>
        <UserAvatar name={message.userName} avatar={{small: message.photo, large: ""}}
                    link={`/profile/${message.userId}`}/>
        <br/>
        {message.message}
        <hr/>
    </div>
})
