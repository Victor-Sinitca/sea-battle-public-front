import React, {FC} from "react";
import s from "../BattleList.module.css";
import {gameRoomType} from "../../../api/chatApi";


type PropsType = {
    gameRoom: gameRoomType
    activeStartGameId: string |null
    authUserId: string
    handlerStartGame: (gamesRoomId: string) => void
    handlerLeaveGameRoomOfId: (gamesRoomId: string, userId: string) => void
}

export const ListStartedGames: FC<PropsType> = React.memo(({
                                                               gameRoom,
                                                               activeStartGameId, authUserId,
                                                               handlerStartGame, handlerLeaveGameRoomOfId
                                                           }) => {
    return <>
        <div className={gameRoom.gamesRoomId === activeStartGameId ? s.gameLink : s.gameLinkActive}
             onClick={() => handlerStartGame(gameRoom.gamesRoomId)}>
            <div >
                Первый игрок: {gameRoom.firstUser.name} {!gameRoom.firstUser.id &&
            <div style={{color: "red"}}>покинул игру</div>}
            </div>
            <div >
                Втрой игрок:{gameRoom.secondUser.name} {!gameRoom.secondUser.id &&
            <div style={{color: "red"}}>покинул игру</div>}
            </div>
            {/*<div> ID игры: {gameRoom.gamesRoomId} </div>*/}
        </div>
        <div>
            <button onClick={() => handlerLeaveGameRoomOfId(gameRoom.gamesRoomId, authUserId)}>покинуть
                игру
            </button>
        </div>
    </>

})
