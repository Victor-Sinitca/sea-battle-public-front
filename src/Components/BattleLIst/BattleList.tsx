import React, {FC, useEffect} from "react";
import s from "./BattleList.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {getActiveStartGameId, getListGamesRoom, getStartGame, getStatus} from "../../redux/chat-selectors";
import {
    actionChat,
    leaveGameRoomOfId,
    sendMessageMB,
    startGameListening,
    startGameReducer,
    stopGameListening
} from "../../redux/chat-reducer";
import Battle from "../Battle/Battle";
import {getAuthUser} from "../../redux/authHttp-selectors";
import {StartedGames} from "./ListStartedGames/StartedGames";
import {ChatInBattle} from "../pages/Chat/ChatPage";


export const BattleList: FC = React.memo(() => {

    const gameRoom = useSelector(getListGamesRoom)
    const startGames = useSelector(getStartGame)
    const authUser = useSelector(getAuthUser)
    const activeStartGameId = useSelector(getActiveStartGameId)
    const statusWS = useSelector(getStatus)

    const dispatch = useDispatch()
    const handlerStartGame = (gamesRoomId: string) => {
        dispatch(actionChat.setActiveStartGameId(gamesRoomId))
        dispatch(startGameReducer(gamesRoomId))
    }
    const handlerLeaveGameRoomOfId = (gamesRoomId: string, userId: string) => {
        dispatch(actionChat.setActiveStartGameId(""))
        dispatch(leaveGameRoomOfId(gamesRoomId, userId || ""))
    }
    const startGame = startGames.filter((g => g.gameId === activeStartGameId))[0]
    const sendMessageForm = (term: string) => {
        dispatch(sendMessageMB(term, startGame.gameId))
    }

    useEffect(() => {
        dispatch(startGameListening())
        return () => {
            dispatch(stopGameListening())
        }
    }, [dispatch])


    if (gameRoom.length < 1) {
        return <div className={s.emptyGames}> no registered games </div>
    }
    if (!authUser) {
        return <div className={s.emptyGames}> you are not authorized </div>
    }
    return <div className={s.displayBattleList}>
        <div className={s.displayList}>
            {gameRoom.map(r =>
                <StartedGames key={r.gamesRoomId} gameRoom={r} activeStartGameId={activeStartGameId}
                              authUserId={authUser.id} handlerStartGame={handlerStartGame}
                              handlerLeaveGameRoomOfId={handlerLeaveGameRoomOfId}/>
            )}
        </div>
        <div className={s.displayBattle}>
            {activeStartGameId && startGame ?
                <div>
                    <Battle startGame={startGame}/>
                    <ChatInBattle statusWS={statusWS} messages={startGame.chatData} sendMessageForm={sendMessageForm}/>
                </div>
                : <div className={s.emptyGames}> выберите игру</div>}
        </div>
    </div>
})
