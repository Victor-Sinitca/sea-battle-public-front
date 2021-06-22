import React, {FC, useEffect} from "react";
import s from "./BattleRoom.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getListGames, getListGamesRoom, getMessages, getStatus} from "../../redux/chat-selectors";
import {
    acceptGame,
    deleteGame,
    sendGame,
    sendMessage,
    startMessagesListening,
    stopMessagesListening
} from "../../redux/chat-reducer";
import {AddMessagesForm, Chat} from "../pages/Chat/ChatPage";
import ListGame from "./ListGame/ListGame";
import {getAuthUserId} from "../../redux/auth-selectors";


const BattleRoom: FC = () => {
    const listGame = useSelector(getListGames)
    const statusWS = useSelector(getStatus)
    const messages = useSelector(getMessages)
    const myId = useSelector(getAuthUserId)
    const GamesRoom = useSelector(getListGamesRoom)

    const dispatch = useDispatch()

    const handleSendGame = (term: string) => {
        dispatch(sendGame(term))
    }

    const sendMessageForm = (term: string) => {
        dispatch(sendMessage(term))
    }
    const deleteGameInList = (id: string) => {
        dispatch(deleteGame(id))
    }
    const acceptGameInList = (id: string) => {
        dispatch(acceptGame(id))
    }
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
    return <div>
        <div className={s.displayWindow}>
            <div className={s.window1}>
                <div className={s.displayCreateGame}>
                    <div>Название игры</div>
                    <div>
                        <AddMessagesForm statusWS={statusWS} sendMessageForm={handleSendGame}/>
                    </div>
                </div>
                <ListGame myId={myId || "empty Id"} listGame={listGame}
                          deleteGame={deleteGameInList} acceptGame={acceptGameInList}/>
            </div>
            <div className={s.window2}>
                <div className={s.window3}>
                    <div style={{padding:10}}>Чат</div>
                    <div style={{padding:10}}>
                        <Chat statusWS={statusWS} messages={messages} sendMessageForm={sendMessageForm}/>
                    </div>

                </div>
                <div className={s.window3}>
                    <div>Комната создания игры</div>
                    {GamesRoom.map(r =>
                        <div className={s.window4}>
                            <div>
                                <div>{r.firstUser.name}</div>
                                <div>{r.gamesRoomId}</div>

                            </div>
                            <div>
                                <div>{r.secondUser.name}</div>
                                <div>{r.gamesRoomId}</div>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    </div>
}
export default BattleRoom
