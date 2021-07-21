import React from "react";
import s from "./NavBar.module.css"
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuthorization} from "../../redux/authHttp-selectors";


const NavBar = () => {
    const authorization = useSelector(getIsAuthorization)
    return (
        <div className={s.displayNavBar}>
            <NavLink to='/placeBattleMan' activeClassName={s.active}>
                <div className={`${s.item} ${s.active}`}>
                    морской бой
                </div>
            </NavLink>

            {/*<NavLink to='/dragDrop' activeClassName={s.active}>
                <div className={`${s.item} ${s.active}`}>
                    Перетяжка
                </div>
            </NavLink>*/}
            <NavLink to='/game' activeClassName={s.active}>
                <div className={s.item}>
                    три в ряд
                </div>
            </NavLink>
            <NavLink to='/1111' activeClassName={s.active}>
                <div className={s.item}>
                   черновик
                </div>
            </NavLink>
            {authorization && <>
                <NavLink to='/profile' activeClassName={s.active}>
                    <div className={s.item}>
                        профиль
                    </div>
                </NavLink>
                <NavLink to='/battleRoom' activeClassName={s.active}>
                    <div className={s.item}>
                        регистрация игры
                    </div>
                </NavLink>
                <NavLink to='/chat' activeClassName={s.active}>
                    <div className={s.item}>
                        чат
                    </div>
                </NavLink>
                <NavLink to='/battleList' activeClassName={s.active}>
                    <div className={s.item}>
                        комната сражений
                    </div>
                </NavLink>
                <NavLink to='/users' activeClassName={s.active}>
                    <div className={s.item}>
                        список игроков
                    </div>
                </NavLink>
            </>}
        </div>
    )
}
export default NavBar;
