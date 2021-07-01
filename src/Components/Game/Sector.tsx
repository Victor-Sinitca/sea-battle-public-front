import React, {FC} from "react";


export  type SectorGameType = {
    sectorState: {
        x: number,
        y: number,
    },
    date:{
        color: "red" | "blue" | "black" | "green",
        isSelected: boolean,
        state:number,
    }
}





type PropsType = {
    sector: SectorGameType
    returnToClick: (sector: SectorGameType) => void
    selectSector:SectorGameType|null
}

export const Sector :FC<PropsType> = ({sector,returnToClick,selectSector})=>{

    const handlerClickSector = () => {
        returnToClick(sector)
    }

    return <div style={{backgroundColor:sector.date.color}} onClick={handlerClickSector}>
        {sector.date.state}
    </div>
}
