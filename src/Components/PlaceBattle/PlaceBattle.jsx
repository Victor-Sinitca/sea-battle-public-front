import React from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./PlaceBattle.module.css"


let PlaceBattle = (props) => {
    if (!props.firstUserMap) {
        let UserMap = [], i, j
        for (i = 0; i < 10; i++) {
            UserMap[i] = []
            for (j = 0; j < 10; j++) {
                UserMap[i][j] = 1
            }
        }
        props.setFirstUserMap(UserMap)
    }
    if (!props.secondUserMap) {
        let UserMap = [[]], i, j
        for (i = 0; i < 10; i++) {
            UserMap[i] = []
            for (j = 0; j < 10; j++) {
                UserMap[i][j] = 1
            }
        }
        props.setSecondUserMap(UserMap)
    }
    if (!props.secondUserMap || !props.secondUserMap) return <Preloader/>

    return <div className={s.displayMapBattle}>
        <div className={s.displayMap}>
            {props.secondUserMap.map(a =>
                    a.map(b =>
                        <button className={s.empty}> </button>

                    )
            )}
        </div>
        <div className={s.displayMap}>
            {props.secondUserMap.map(a =>
                a.map(b =>
                    <button> </button>
                )
            )}
        </div>
        <div className={s.displayMap}>
            {props.firstUserMap.map(a =>
                a.map(b =>
                    <button> </button>
                )
            )}
        </div>
        <div className={s.displayMap}>
            {props.firstUserMap.map(a =>
                a.map(b =>
                    <button> </button>
                )
            )}
        </div>


    </div>
}

export default PlaceBattle