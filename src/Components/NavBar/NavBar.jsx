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
                {authorization &&
                <div>
                    <NavLink to='/placeBattleMan' className={s.navLink}>Sea battle</NavLink>
                </div>
                }
                <div>
                    <NavLink to='/authorization' className={s.navLink}>authorization</NavLink>
                </div>
            </div>
        </div>
    )
}
export default NavBar;
