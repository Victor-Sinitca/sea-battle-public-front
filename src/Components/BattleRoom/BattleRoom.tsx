import React, {FC, useEffect} from "react";
import s from "./BattleRoom.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getListGames} from "../../redux/chat-selectors";
import {sendGame, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";


const BattleRoom: FC = () => {
    const listGame = useSelector(getListGames)
    const dispatch = useDispatch()

    const handleSendGame = () => {
        dispatch(sendGame("просто название"))
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
                <div className={s.window3}>
                    <div>Список игр</div>
                    {listGame.map(g =>
                        <div className={s.displayGame}>
                            <div>{g.userName}</div>
                            <div>{g.nameGame}</div>
                            <div>
                                <button>принять игру</button>
                            </div>
                        </div>)
                    }
                </div>
                <div className={s.window3}>
                    <div>Название</div>
                    <textarea></textarea>
                    <button onClick={handleSendGame}>создать игру</button>

                </div>


            </div>
            <div className={s.window2}>


                22


            </div>
        </div>


    </div>
}
export default BattleRoom
