import React from "react";
import s from './NavBar1.module.scss'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuthorization} from "../../redux/authHttp-selectors";


const NavBar = () => {
    const authorization = useSelector(getIsAuthorization)
    return (
        <aside className={s.navBar}>
            <div className={s.navBarSection}>
                <div className={s.navBarSectionHeader}>Games</div>
                <div className={s.navBarSectionBlock}>
                    <NavLink to='/placeBattleMan' activeClassName={s.active}>
                        <div className={s.item}>
                            sea ​​battle
                        </div>
                    </NavLink>
                    <NavLink to='/game' activeClassName={s.active}>
                        <div className={s.item}>
                            three in a row
                        </div>
                    </NavLink>
                </div>
            </div>

            {authorization && <>
                <div className={s.navBarSection}>
                    <div className={s.navBarSectionHeader}>Network</div>
                    <div className={s.navBarSectionBlock}>
                        <NavLink to='/battleRoom' activeClassName={s.active}>
                            <div className={s.item}>
                                game registration
                            </div>
                        </NavLink>
                        <NavLink to='/battleList' activeClassName={s.active}>
                            <div className={s.item}>
                                battle room
                            </div>
                        </NavLink>
                        <NavLink to='/chat' activeClassName={s.active}>
                            <div className={s.item}>
                                chat
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className={s.navBarSection}>
                    <div className={s.navBarSectionHeader}>Community</div>
                    <div className={s.navBarSectionBlock}>
                        <NavLink to='/profile' activeClassName={s.active}>
                            <div className={s.item}>
                                profile
                            </div>
                        </NavLink>
                        <NavLink to='/users' activeClassName={s.active}>
                            <div className={s.item}>
                                list of players
                            </div>
                        </NavLink>
                    </div>
                </div>
            </>}
        </aside>
    )
}
export default NavBar;
