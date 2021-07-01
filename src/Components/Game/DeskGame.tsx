import React, {FC} from "react";
import s from "./DeskGame.module.css"
import {Sector, SectorGameType} from "./Sector";

export type MapsGameType = Array<Array<SectorGameType>>
type PropsType = {
    userMap: MapsGameType
    returnToClick: (sector: SectorGameType) => void
    selectSector:SectorGameType |null
}
const Desk: FC<PropsType> = ({userMap, returnToClick,selectSector,}) => {
    return (
        <div className={s.displayMap}>
            {userMap.map(a => a.map(b =>
                <Sector selectSector={selectSector} key={b.sectorState.x * 10 + b.sectorState.y} sector={b} returnToClick={returnToClick}/>
            ))}
        </div>
    )
}
export default Desk
