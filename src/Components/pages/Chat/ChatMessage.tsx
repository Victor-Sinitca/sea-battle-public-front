import React, {FC} from "react";
import {MessageApiType} from "../../../api/chatApi";
import UserAvatar from "../../../commen/UserAvatar/UserAvatar";

export const ChatMessage: FC<{ message: MessageApiType }> = React.memo(({message}) => {
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
