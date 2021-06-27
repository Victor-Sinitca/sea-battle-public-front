import React, {FC, useEffect} from "react";
import s from "./BattleList.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getListGamesRoom, getStartGame} from "../../redux/chat-selectors";
import {leaveGameRoomOfId, startGameListening, startGameReducer, stopGameListening} from "../../redux/chat-reducer";
import Battle from "../Battle/Battle";
import {getAuthUser} from "../../redux/authHttp-selectors";


export const BattleList: FC = React.memo(() => {

    const gameRoom = useSelector(getListGamesRoom)
    const startGame= useSelector(getStartGame)
    const authUser=useSelector(getAuthUser)


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
                return <div key={r.gamesRoomId}>
                    <div  className={r.gamesRoomId === startGame?.gameId ? s.gameLink : s.gameLinkActive}
                          onClick={() => dispatch(startGameReducer(r.gamesRoomId))}>
                        <div className={startGame?.gameData.FUTurn.turn && s.userTurn}>
                            Первый игрок: {r.firstUser.name} {!r.firstUser.id && "покинул игру"}
                        </div>
                        <div className={!startGame?.gameData.FUTurn.turn && s.userTurn}>
                            Втрой игрок:{r.secondUser.name} {!r.secondUser.id && "покинул игру"}
                        </div>
                        <div> ID игры: {r.gamesRoomId} </div>
                    </div>
                    <div><button onClick={()=>dispatch(leaveGameRoomOfId(r.gamesRoomId,authUser?.id || ""))}>покинуть игру</button></div>
                </div>
            })
            }
        </div>
        <div className={s.displayBattle}>
            {startGame? <Battle/>
                : <div> выберите игру</div>}
        </div>
    </div>
})
