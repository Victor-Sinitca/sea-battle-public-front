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
import {Chat} from "../pages/Chat/ChatPage";
import ListGame from "./ListGame/ListGame";
import {getAuthUser} from "../../redux/authHttp-selectors";
import {AddMessagesFormChat} from "../pages/Chat/AddMeesagesFormChat";


const BattleRoom: FC = () => {
    const listGame = useSelector(getListGames)
    const statusWS = useSelector(getStatus)
    const messages = useSelector(getMessages)
    const myId = useSelector(getAuthUser)?.id
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
    }, [dispatch])
    return <div className={s.displayWindow}>
        <div className={s.gameWindow}>
            <div className={s.window1}>
                <ListGame myId={myId || "empty Id"} listGame={listGame}
                          deleteGame={deleteGameInList} acceptGame={acceptGameInList}/>
                <div className={s.displayCreateGame}>
                    <div className={s.displayCreateGameHeader}>Создать новую игру</div>
                    <AddMessagesFormChat statusWS={statusWS} sendMessageForm={handleSendGame}
                                         buttonText="создать игру" placeholder="введите название игры"/>
                </div>
            </div>
            <div className={s.window3}>
                <div >Проводимые игры</div>
                {GamesRoom.map(r =>
                    <div className={s.window4} key={r.gamesRoomId}>
                        <div>
                            <span>Первый игрок:</span>
                            <span>{r.firstUser.name}</span>
                        </div>
                        <div>
                            <span>Второй игрок:</span>
                            <span>{r.secondUser.name}</span>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
        <div className={s.window3}>
            <div style={{padding: 10}}>Чат</div>
            <div style={{padding: 10}}>
                <Chat statusWS={statusWS} messages={messages} sendMessageForm={sendMessageForm}/>
            </div>
        </div>
    </div>

}
export default BattleRoom
