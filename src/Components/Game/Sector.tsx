import React, {FC, MouseEvent, MouseEventHandler,} from "react";
import s from "./Sector.module.css"
import sw0  from "../../assets/img/sw1.png"
import sw1  from "../../assets/img/sw2.png"
import sw2  from "../../assets/img/sw3.png"
import sw3  from "../../assets/img/sw4.png"
import sw4  from "../../assets/img/sw5.png"


export  type SectorGameType = {
    sectorState: {
        x: number,
        y: number,
        isSelected: boolean,
        isFirstClick: boolean,
    },
    date: {
        color: "red" | "blue" | "black" | "green",
        state: number,
        isBum:boolean,
    }
}


type PropsType = {
    sector: SectorGameType
    returnMouseDown: (sector: SectorGameType) => void
    returnMouseUp: (sector: SectorGameType) => void
    returnMouseOver: (sector: SectorGameType) => void

}

export const Sector: FC<PropsType> = ({sector,returnMouseDown, returnMouseUp,returnMouseOver}) => {
    const imgMass=[sw0, sw1, sw2, sw3, sw4]

    const handlerMouseDown = () => {
        if(!sector.sectorState.isSelected && !sector.sectorState.isFirstClick )
            returnMouseDown(sector)
    }
    const handlerMouseUp = () => {
        returnMouseUp(sector)
    }
    const handlerMouseOver = (event: MouseEvent<HTMLDivElement>) => {
        if(event.buttons === 1){
            returnMouseOver(sector)
        }
    }

    return <div className={sector.sectorState.isSelected && s.isActive}
                onMouseDown={handlerMouseDown}
                onMouseUp={handlerMouseUp}
                onMouseOver={handlerMouseOver}  >
        <img className={sector.date.isBum ? s.isBum : s.img} draggable={"false"}  src={imgMass[sector.date.state]}/>
    </div>
}
