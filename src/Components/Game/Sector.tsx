import React, {FC, MouseEvent, MouseEventHandler,} from "react";
import s from "./Sector.module.css"
import sw0 from "../../assets/img/G1.png"
import sw1 from "../../assets/img/G2.png"
import sw2 from "../../assets/img/G3.png"
import sw3 from "../../assets/img/G4.png"
import sw4 from "../../assets/img/G5.png"
import sw5 from "../../assets/img/G6.png"
import sw6 from "../../assets/img/G7.png"
import sw7 from "../../assets/img/G8.png"
import bw8 from "../../assets/img/G9.png"
import m1 from "../../assets/img/молния гор.png"
import m2 from "../../assets/img/молния верт.png"
import m3 from "../../assets/img/молния в+г.png"


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
        isBum: boolean,
        score: number,
        addBonusSector: number,
        bonusSector: number,
    }
}


type PropsType = {
    sector: SectorGameType
    returnMouseDown: (sector: SectorGameType) => void
    returnMouseUp: (sector: SectorGameType) => void
    returnMouseOver: (sector: SectorGameType) => void

}

export const Sector: FC<PropsType> = ({sector, returnMouseDown, returnMouseUp, returnMouseOver}) => {
    const imgMass = [sw0, sw1, sw2, sw3, sw4, sw5, sw6, sw7, bw8]
    const bonusImgMass = [m1, m2, m3,]

    const handlerMouseDown = () => {
        returnMouseDown(sector)
    }
    const handlerMouseUp = () => {
        returnMouseUp(sector)
    }
    const handlerMouseOver = (event: MouseEvent<HTMLDivElement>) => {
        if (event.buttons === 1) {
            returnMouseOver(sector)
        }
    }

    return <div className={sector.sectorState.isSelected ? s.active : s.noActive}
                onMouseDown={handlerMouseDown}
                onMouseUp={handlerMouseUp}
                onMouseOver={handlerMouseOver}>

        <img className={sector.date.isBum ? s.isBum : s.img} draggable={"false"} src={imgMass[sector.date.state]}/>
        {sector.date.bonusSector > 0 && <img className={s.img}  draggable={"false"} src={bonusImgMass[sector.date.bonusSector-1]} />}


        <div>
            {sector.date.score > 0 ? <div>{sector.date.score}</div> : <div></div>}
          {/*  <div className={s.devInf}>
                {sector.date.addBonusSector > 0 ? <div>{sector.date.addBonusSector}</div> : <div></div>}
                {sector.date.bonusSector > 0 ? <div style={{color: "red"}}>{sector.date.bonusSector}</div> : <div></div>}
            </div>*/}

        </div>


    </div>
}
