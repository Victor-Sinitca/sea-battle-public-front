import React, {FC} from "react";


export  type SectorGameType = {
    x: number,
    y: number,
    color: "red" | "blue" | "black" | "green"
}





type PropsType = {
    sector: SectorGameType
    returnToClick: (sector: SectorGameType) => void
}

export const Sector :FC<PropsType> = ({sector,returnToClick})=>{

    const handlerClickSector = () => {
        returnToClick(sector)
    }

    return <div style={{backgroundColor:sector.color}} onClick={handlerClickSector}>

    </div>
}
