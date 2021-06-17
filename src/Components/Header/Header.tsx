import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAuthorization, getAuthUserId, getEmail, getToken} from "../../redux/auth-selectors";
import s from "./Header.module.css"
import {toLogout} from "../../redux/auth-reducer";
import {useHistory} from "react-router-dom";


export const Header: FC = () => {
    const dispatch = useDispatch()
    let history = useHistory();
    const userId = useSelector(getAuthUserId)
    const email = useSelector(getEmail)
    const authorization = useSelector(getAuthorization)

    const handlerLogout =()=>{
        dispatch(toLogout())
        history.push('/authorization')
    }
    const handlerLogin =()=>{
        dispatch(toLogout())
        history.push('/authorization')
    }

    return <div>
        {authorization ? <>
                <div className={s.displayHeader}>
                    <div>
                        userId : {userId}
                    </div>
                    <div>
                        email: {email}
                    </div>
                    <div>
                        <button onClick={handlerLogout}>выйти</button>
                    </div>
                </div>
            </>
            : <>
                <div className={s.displayHeader}>
                    <div>Вы не авторизованы</div>
                    <div></div>
                    <div>
                        <button onClick={handlerLogin}>Login</button>
                    </div>
                </div>


            </>
        }
    </div>
}
