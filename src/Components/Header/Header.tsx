import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from "./Header.module.scss"
import ava from "../../assets/img/ava.jpeg"

import {useHistory} from "react-router-dom";
import {getAuthProfile, getAuthUser, getIsAuthorization} from "../../redux/authHttp-selectors";
import {toLogout} from "../../redux/authHttp-reducer";
import {Button} from "../../commen/Button/Button";


export const Header: FC = () => {
    const dispatch = useDispatch()
    let history = useHistory();
    const authUser = useSelector(getAuthUser)
    const authProfile = useSelector(getAuthProfile)
    const authorization = useSelector(getIsAuthorization)
    const greetings = authorization? "Welcome!!!" : "You are not authorize"

    const handlerLogout = () => {
        dispatch(toLogout())
        history.push('/authorization')
    }
    const handlerLogin = () => {
        history.push('/authorization')
    }
    const handlerOpenProfile = () => {
        history.push('/profile')
    }

    return <header className={s.header}>
        <div className={s.infoBlock}>
            {greetings}
        </div>
        <div className={s.userBlock}>
            {authorization?
                <figure className={s.headerAvatar}  onClick={handlerOpenProfile}>
                    <figcaption  onClick={handlerOpenProfile}>{authProfile?.name}</figcaption>
                    <img  onClick={handlerOpenProfile} className={s.headerAvatarImg}  src={authProfile?.photo || ava} alt="user avatar"/>

                </figure>
                : <Button value={"login"} callback={handlerLogin} className={s.headerButton}/>


               // <button className={s.headerButton} onClick={handlerLogin}>login</button>
            }
        </div>
    </header>
}
