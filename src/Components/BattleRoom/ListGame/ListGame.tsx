import React, {FC} from "react";
import s from "../BattleRoom.module.css"
import {GamesType} from "../../../redux/chat-reducer";

type ListGameType = {
    listGame: GamesType[]
    myId: string,
    deleteGame: (id: string) => void
    acceptGame: (id: string) => void
}
const ListGame: FC<ListGameType> = ({listGame, myId, deleteGame,acceptGame}) => {


    return <div className={s.window3}>
        <div>Список игр</div>
        {listGame.map(g => {
                return <div className={s.displayGame}>
                    <div>{g.userName}</div>
                    <div>{g.nameGame}</div>
                    <div>{g.id}</div>
                    {myId === g.userId ?
                        <div>
                            <button onClick={() => deleteGame(g.id)}>удалить игру</button>
                        </div>
                        :
                        <div>
                            <button onClick={() => acceptGame(g.id)}>принять игру</button>
                        </div>
                    }
                </div>
            }
        )
        }
    </div>
}
export default ListGame
