import React, {FC} from "react";
import s from "./Desk.module.css"
import ReturnSector from "../ReturnSector/ReturnSector";
import {MapsType, SectorType} from "../../../../Types/Types";

type PropsType = {
    userMap: MapsType
    firstDesk: boolean
    shipOpponent: boolean
    yourShips: boolean
    returnToClick: (sector: SectorType) => void
    toClick: boolean
    deleteShipUser: boolean
    UserTurn: boolean
}
const Desk: FC<PropsType> = ({
                                 userMap, firstDesk, shipOpponent,
                                 yourShips, returnToClick, toClick, deleteShipUser, UserTurn
                             }) => {
    let index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <div className={
            yourShips ?
                shipOpponent ?
                    UserTurn && !firstDesk ? s.display1Turn
                        : s.display1
                    : s.display1Win
                : s.display1Loss
        }>
            <div className={s.display11}>
                <div></div>
                {index.map(i => <div key={i}>{String.fromCharCode(65 + i)}</div>)}
            </div>
            <div className={s.display2}>
                <div className={s.display3}>
                    {index.map(i => <div key={i}>{i}</div>)}
                </div>
                <div className={s.displayMap}>
                    {userMap.map(a => a.map(b =>
                        <ReturnSector key={b.sector.x * 10 + b.sector.y} firstDesk={firstDesk} sector={b.sector}
                                      returnToClick={returnToClick}
                                      toClick={toClick} deleteShipUser={deleteShipUser}/>
                    ))}
                </div>
            </div>
        </div>

    )
}
export default Desk