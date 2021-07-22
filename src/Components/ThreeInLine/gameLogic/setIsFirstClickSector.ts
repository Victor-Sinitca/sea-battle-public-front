import {MapsGameType} from "../DeskThreeInLine";
import {SectorGameType} from "../Sector/Sector";


export const SetIsFirstClickSector =(map: MapsGameType, sector: SectorGameType)=>{
    let newMap = [...map]
    let i=sector.sectorState.y, j = sector.sectorState.x
    newMap[i][j].sectorState.isFirstClick = true
    return newMap
}
