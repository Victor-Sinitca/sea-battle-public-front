import React, {FC, useEffect} from "react";
import s from "./BattleList.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getListGamesRoom} from "../../redux/chat-selectors";
import {startGame, startGameListening, stopGameListening} from "../../redux/chat-reducer";


export const BattleList: FC = () => {
    const gameRoom = useSelector(getListGamesRoom)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(startGameListening())
        return () => {
            dispatch(stopGameListening())
        }
    }, [])

    if (gameRoom.length < 1) {
        return <div> игр не зарегистрировано </div>
    }


    return <div className={s.displayBattleList}>
        <div className={s.displayList}>
            {gameRoom.map(r => {
                return <div key={r.gamesRoomId} className={s.gameLink} onClick={() => dispatch(startGame(r.gamesRoomId))}>
                    <div> Первый игрок: {r.firstUser.name} </div>
                    <div> Втрой игрок:{r.secondUser.name} </div>
                    <div> ID игры: {r.gamesRoomId} </div>
                </div>
            })
            }
        </div>
        <div className={s.displayBattle}>

        </div>


    </div>
}
