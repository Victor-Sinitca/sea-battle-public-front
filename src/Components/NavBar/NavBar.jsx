import React from "react";
import s from "./NavBar.module.css"
import {NavLink} from "react-router-dom";


const NavBar=()=>{
    return(
        <div>
            <div>
                <NavLink to='/placeBattle' className={s.navLink}> Place to battle</NavLink>
            </div>
        </div>
    )
}
export default NavBar;