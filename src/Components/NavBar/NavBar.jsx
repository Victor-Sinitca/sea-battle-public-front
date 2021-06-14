import React from "react";
import s from "./NavBar.module.css"
import {NavLink} from "react-router-dom";


const NavBar=()=>{
    return(
        <div className={s.displayNavBar}>
            <div>
                <NavLink to='/placeBattleMan' className={s.navLink}>Sea battle</NavLink>
                <NavLink to='/authorization' className={s.navLink}>authorization</NavLink>
            </div>
        </div>
    )
}
export default NavBar;
