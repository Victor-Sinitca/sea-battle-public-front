import React, {FC} from "react";
import s from "./DeskGame.module.css"
import {Sector, SectorGameType} from "./Sector/Sector";

export type MapsGameType = Array<Array<SectorGameType>>
type PropsType = {
    deskState:{
        x:number,
        y:number,
        length:number
    }
    isEndTurn:boolean
    userMap: MapsGameType
    returnMouseDown: (sector: SectorGameType) => void
    returnMouseUp: (sector: SectorGameType) => void
    returnMouseOver: (sector: SectorGameType) => void
    selectSector:SectorGameType |null

}
const Desk: FC<PropsType> = ({userMap,deskState, returnMouseDown,selectSector,returnMouseUp,returnMouseOver,isEndTurn}) => {
    const repeat =(count:number)=>{
        let string=''
        for(let i=0; i<count; i++){
            string=string+`${deskState.length + ""}px `
        }
        return string
    }

    return (
        <div style={{display:"grid", overflow:"hidden", gridTemplateColumns: repeat(deskState.y), gridTemplateRows:repeat(deskState.x)}}>
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
