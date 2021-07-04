import React, {FC} from "react";
import s from "./DeskGame.module.css"
import {Sector, SectorGameType} from "./Sector";

export type MapsGameType = Array<Array<SectorGameType>>
type PropsType = {
    isEndTurn:boolean
    userMap: MapsGameType
    returnMouseDown: (sector: SectorGameType) => void
    returnMouseUp: (sector: SectorGameType) => void
    returnMouseOver: (sector: SectorGameType) => void
    selectSector:SectorGameType |null

}
const Desk: FC<PropsType> = ({userMap, returnMouseDown,selectSector,returnMouseUp,returnMouseOver,isEndTurn}) => {
    return (
        <div className={s.displayMap} >
            {userMap.map(a => a.map(b =>
                <Sector returnMouseDown={returnMouseDown}
                        returnMouseUp={returnMouseUp}
                        returnMouseOver={returnMouseOver}
                        key={b.sectorState.x * 10 + b.sectorState.y} sector={b}/>
            ))}
        </div>
    )
}
export default Desk
