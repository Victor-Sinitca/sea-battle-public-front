import {SectorGameType} from "../Sector/Sector";


export const sectorsNotEqual =(sector1:SectorGameType,sector2:SectorGameType )=>{
    return (sector1.sectorState.x !== sector2.sectorState.x
        || sector1.sectorState.y !== sector2.sectorState.y )
}
