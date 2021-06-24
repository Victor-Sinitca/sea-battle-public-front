import React from "react";
import s from "./NavBar.module.css"
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAuthorization} from "../../redux/auth-selectors";


const NavBar = () => {
    const authorization = useSelector(getAuthorization)
    return (
        <div className={s.displayNavBar}>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/placeBattleMan' activeClassName={s.active}>Бой с ИИ</NavLink>
            </div>
            {authorization && <>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to='/profile'  activeClassName={s.active}>профиль</NavLink>
                </div>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to='/battleRoom'  activeClassName={s.active}>регистрация игры</NavLink>
                </div>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to='/chat'  activeClassName={s.active}>чат</NavLink>
                </div>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to='/battleList'  activeClassName={s.active}>комната сражений</NavLink>
                </div>
            </>}
            {/*<div>
                <NavLink to='/authorization' className={s.navLink}>login</NavLink>
            </div>*/}
        </div>
    )
}
export default NavBar;