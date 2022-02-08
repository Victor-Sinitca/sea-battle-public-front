import React, {FC} from "react";
import s from "../BattleRoom.module.scss"
import {GamesType} from "../../../redux/chat-reducer";

type ListGameType = {
    listGame: GamesType[]
    myId: string,
    deleteGame: (id: string) => void
    acceptGame: (id: string) => void
}
const ListGame: FC<ListGameType> = ({listGame, myId, deleteGame, acceptGame}) => {


    return <div className={s.listGames}>
        <div className={s.listGamesHeader}>Список игр</div>
        <div className={s.listGamesSection}>
            {listGame.map(g => {
                    return <div className={s.displayGame} key={g.id}>
                        <div className={s.displayGameSection}>
                            <div><span>creator:</span>{g.userName}</div>
                            <div><span>description:</span>{g.nameGame}</div>
                        </div>
                        <div className={s.displayGameButton}>
                            {myId === g.userId ?
                                <button onClick={() => deleteGame(g.id)}>удалить игру</button>
                                : <button onClick={() => acceptGame(g.id)}>принять игру</button>
                            }
                        </div>
                    </div>
                }
            )
            }
        </div>

    </div>
}
export default ListGame
