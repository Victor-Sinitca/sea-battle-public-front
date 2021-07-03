import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector";


export const SetIsFirstClickSector =(map: MapsGameType, sector: SectorGameType)=>{
    let newMap = [...map]
    newMap[sector.sectorState.y] = [...map[sector.sectorState.y]]
    newMap[sector.sectorState.y][sector.sectorState.x] = {...map[sector.sectorState.y][sector.sectorState.x]}
    newMap[sector.sectorState.y][sector.sectorState.x].sectorState = {...map[sector.sectorState.y][sector.sectorState.x].sectorState}
    newMap[sector.sectorState.y][sector.sectorState.x].sectorState.isFirstClick = true
    return newMap
}