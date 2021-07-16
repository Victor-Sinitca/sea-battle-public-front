import React, {FC} from "react";
import s from "./UserAvatar.module.css"
import ava from "../../assets/img/ava.jpeg"
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string
    avatar: photosType
    link:string
}

export type photosType = {
    readonly small:string|null
    readonly large:string|null
}
const UserAvatar: FC<PropsType> = ({name, avatar,link}) => {
    return <div>
        <NavLink to={link} onClick={()=>{window.scrollTo(0, 0);}}>
            {avatar.small ?
                <img alt="avatar" className={s.ava} src={avatar.small}/>
                : <img alt="avatar" className={s.ava} src={ava}/>
            }
        </NavLink>
        <div> {name} </div>
    </div>
}
export default UserAvatar;
