import React from "react";
import s from "./NavBar.module.css"
import {NavLink} from "react-router-dom";


const NavBar=()=>{
    return(
        <div>
            <div>
                <NavLink to='/placeBattleMan' className={s.navLink}> Battle with man </NavLink>
            </div>
            <div> ------</div>
            <div>
                <NavLink to='/placeBattleComputer' className={s.navLink}> Battle with the computer </NavLink>
            </div>

        </div>
    )
}
export default NavBar;