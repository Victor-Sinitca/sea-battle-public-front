import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from "./Header.module.css"
import ava from "../../assets/img/ava.jpeg"

import {useHistory} from "react-router-dom";
import {getAuthProfile, getAuthUser, getIsAuthorization} from "../../redux/authHttp-selectors";
import {toLogout} from "../../redux/authHttp-reducer";


export const Header: FC = () => {
    const dispatch = useDispatch()
    let history = useHistory();
    const authUser = useSelector(getAuthUser)
    const authProfile = useSelector(getAuthProfile)
    const authorization = useSelector(getIsAuthorization)

    const handlerLogout = () => {
        dispatch(toLogout())
        history.push('/authorization')
    }
    const handlerLogin = () => {
        history.push('/authorization')
    }

    return <>
        {authorization ?
            <div className={s.headerAuthUser}>
                <div >
                    <img style={{height:40, borderRadius:5}} src={authProfile?.photo || ava }/>
                </div>
                <div>

                </div>
                <div>

                </div>
                <div>
                    <button onClick={handlerLogout}>выйти</button>
                </div>
            </div>
            :
            <div className={s.header}>
                <div>Вы не авторизованы</div>
                <div></div>
                <div>
                    <button style={{borderRadius: 5, padding: 5}} onClick={handlerLogin}>Войти</button>
                </div>
            </div>
        }
    </>
}
