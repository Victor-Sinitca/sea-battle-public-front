import React from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./PlaceBattle.module.css"
import ReturnSector from "../Common/Sector";


let PlaceBattle = (props) => {

    if (!props.firstUserMap) {
        let userMap = [], i, j
        for (i = 0; i < 10; i++) {
            userMap[i] = []
            for (j = 0; j < 10; j++) {
                userMap[i][j] = {
                    sector: {
                        ship: false,
                        shot: false,
                        x: j,
                        y: i
                    }
                }
        }}
        props.setFirstUserMap(userMap)
    }
    if (!props.secondUserMap) {
        let userMap = [[]], i, j
        for (i = 0; i < 10; i++) {
            userMap[i] = []
            for (j = 0; j < 10; j++) {
                userMap[i][j] = {
                    sector: {
                        ship: false,
                        shot: false,
                        x: j,
                        y: i
                    }
                }
            }
            props.setSecondUserMap(userMap)
        }}
    if (!props.secondUserMap || !props.secondUserMap) return <Preloader/>

    return <div className={s.displayMapBattle}>
        <div className={s.displayMap}>
            {props.secondUserMap.map(a =>
                a.map(b =>
                    <ReturnSector b={b} userShot={props.userShot} />
                )
            )}
        </div>
        <div className={s.displayMap}>
            {props.secondUserMap.map(a =>
                a.map(b =>
                    <ReturnSector b={b} userShot={props.userShot} />
                )
            )}
        </div>
        <div className={s.displayMap}>
            {props.firstUserMap.map(a =>
                a.map(b =>
                    <ReturnSector b={b} userShot={props.userShot} />
                )
            )}
        </div>
        <div className={s.displayMap}>
            {props.firstUserMap.map(a =>
                a.map(b =>
                    <ReturnSector b={b} userShot={props.userShot} />
                )
            )}
        </div>
    </div>
}

export default PlaceBattle