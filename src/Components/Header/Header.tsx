import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from "./Header.module.css"

import {useHistory} from "react-router-dom";
import {getAuthUser, getIsAuthorization} from "../../redux/authHttp-selectors";
import {toLogout} from "../../redux/authHttp-reducer";


export const Header: FC = () => {
    const dispatch = useDispatch()
    let history = useHistory();
    const authUser = useSelector(getAuthUser)
    const authorization = useSelector(getIsAuthorization)

    const handlerLogout = () => {
        debugger
        dispatch(toLogout())
        history.push('/authorization')
    }
    const handlerLogin = () => {
        history.push('/authorization')
    }

    return <>
        {authorization ?
            <div className={s.displayHeader}>
                <div>
                    userId : {authUser?.id}
                </div>
                <div>
                    email: {authUser?.email}
                </div>
                <div>
                    <button onClick={handlerLogout}>выйти</button>
                </div>
            </div>
            :
            <div className={s.displayHeader}>
                <div>Вы не авторизованы</div>
                <div></div>
                <div>
                    <button style={{borderRadius: 5, padding: 5}} onClick={handlerLogin}>Войти</button>
                </div>
            </div>
        }
    </>
}
