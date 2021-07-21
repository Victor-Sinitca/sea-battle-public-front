import React, {FC} from "react";
import s from "./UserAvatar.module.css"
import ava from "../../assets/img/ava.jpeg"
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string
    avatar: photosType
    link: string,
    height?: number
}

export type photosType = {
    readonly small: string | null
    readonly large: string | null
}
const UserAvatar: FC<PropsType> = ({name, avatar, link, height = 60}) => {
    return <div>
        <NavLink to={link} onClick={() => {
            window.scrollTo(0, 0);
        }}>
            <img alt="avatar" style={{height: height, borderRadius: height / 2}} src={avatar.small || ava}/>
        </NavLink>
        <div> {name} </div>
    </div>
}
export default UserAvatar;
