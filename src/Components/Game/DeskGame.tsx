import React, {FC} from "react";
import s from "./DeskGame.module.css"
import {Sector, SectorGameType} from "./Sector";

export type MapsGameType = Array<Array<{ sector: SectorGameType }>>
type PropsType = {
    userMap: MapsGameType
    returnToClick: (sector: SectorGameType) => void
}
const Desk: FC<PropsType> = ({userMap, returnToClick,}) => {
    return (
        <div className={s.displayMap}>
            {userMap.map(a => a.map(b =>
                <Sector key={b.sector.x * 10 + b.sector.y} sector={b.sector} returnToClick={returnToClick}/>
            ))}
        </div>
    )
}
export default Desk
