import {MessageType} from "../../../redux/chat-reducer";
import React, {FC, useEffect, useRef, useState} from "react";
import {ChatMessage} from "./ChatMessage";

type MessagesType = {
    messages: MessageType[]
}
export const ListChatMessagesBattle: FC<MessagesType> = ({messages}) => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)


    let CreateMessages = [...messages].reverse().map
    (m => <ChatMessage key={m.id} message={m}/>)



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
        <div ref={messagesAnchorRef}></div>
        {CreateMessages}
    </div>
}

