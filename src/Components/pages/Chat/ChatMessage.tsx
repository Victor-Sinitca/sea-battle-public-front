import React, {FC} from "react";
import {MessageApiType} from "../../../api/chatApi";
import UserAvatar from "../../../commen/UserAvatar/UserAvatar";

export const ChatMessage: FC<{ message: MessageApiType, height?: number }> = React.memo(({message, height=80 }) => {

    return <div>
        <div style={{display: "inline-flex",}}>
            <div>
                <UserAvatar name={message.userName} avatar={{small: message.photo, large: ""}}
                            link={`/profile/${message.userId}`} height={height}/>
            </div>
            <div style={{wordBreak: "break-all"}}>
                {message.message}
            </div>
        </div>
        <hr/>
    </div>
})
