import React, {FC} from "react";
import {ProfileType} from "../../../api/profileApi";
import s from "./User.module.css"
import UserAvatar from "../../../commen/UserAvatar/UserAvatar";


type UserType = {
    userProfile: ProfileType
}

export const User: FC<UserType> = ({userProfile}) => {
    return <div className={s.userDisplay}>
        <UserAvatar name={userProfile.name} avatar={{small: userProfile.photo, large: ""}}
                    link={`/profile/${userProfile.id}`}/>
        <div>
            <div>Морской бой:</div>
            <div>Игр:{userProfile.gameSBState.numberOfGamesSB}</div>
            <div>Выигрышей:{userProfile.gameSBState.numberOfGamesSB}</div>
            <div>Проигрышей:{userProfile.gameSBState.numberOfGamesSB - userProfile.gameSBState.numberOfGamesSB}</div>
        </div>
        <div className={s.userStatus}>
            {userProfile.status}
        </div>
    </div>
}
