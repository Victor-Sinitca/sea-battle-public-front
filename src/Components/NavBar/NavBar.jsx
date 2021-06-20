import React from "react";
import s from "./NavBar.module.css"
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAuthorization} from "../../redux/auth-selectors";


const NavBar = () => {
    const authorization = useSelector(getAuthorization)
    return (
        <div className={s.displayNavBar}>
            <div>
                <NavLink to='/placeBattleMan' className={s.navLink}>Sea battle</NavLink>
            </div>
            {authorization && <>
                <div>
                    <NavLink to='/battleRoom' className={s.navLink}>battle room</NavLink>
                </div>
                <div>
                    <NavLink to='/chat' className={s.navLink}>chat</NavLink>
                </div>
                <div>
                    <NavLink to='/battleList' className={s.navLink}>battle list</NavLink>
                </div>
            </>}
            {/*<div>
                <NavLink to='/authorization' className={s.navLink}>login</NavLink>
            </div>*/}
        </div>
    )
}
export default NavBar;
