import React, {FC} from "react";
import s from "../BattleList.module.scss";
import {gameRoomType} from "../../../api/chatApi";


type PropsType = {
    gameRoom: gameRoomType
    activeStartGameId: string | null
    authUserId: string
    handlerStartGame: (gamesRoomId: string) => void
    handlerLeaveGameRoomOfId: (gamesRoomId: string, userId: string) => void
}

export const StartedGames: FC<PropsType> = React.memo(({
                                                           gameRoom,
                                                           activeStartGameId, authUserId,
                                                           handlerStartGame, handlerLeaveGameRoomOfId
                                                       }) => {
    return <div className={s.startedGames}>
        <div className={gameRoom.gamesRoomId === activeStartGameId ? s.gameLinkActive : s.gameLink}
             onClick={() => handlerStartGame(gameRoom.gamesRoomId)}>
            <div>
                <span>First player:</span>
                <span>
                    {gameRoom.firstUser.name} {!gameRoom.firstUser.id &&
                    <span style={{color: "red"}}>покинул игру</span>}
                </span>
            </div>
            <div>
                Second player:{gameRoom.secondUser.name} {!gameRoom.secondUser.id &&
            <div style={{color: "red"}}>покинул игру</div>}
            </div>
        </div>
        <div className={s.buttonStartGame}>
            <button onClick={() => handlerLeaveGameRoomOfId(gameRoom.gamesRoomId, authUserId)}>leave the game
            </button>
        </div>
    </div>

})
