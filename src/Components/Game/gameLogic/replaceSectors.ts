import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector";


export const replaceSectors =(map: MapsGameType, firstSector: SectorGameType, secondSector: SectorGameType)=>{
    let newMap = [...map]
    let i = firstSector.sectorState.y, j = firstSector.sectorState.x;
    newMap[i] = [...map[i]]
    newMap[i][j] = {...map[i][j]}
    newMap[i][j].sectorState = {...map[i][j].sectorState}
    newMap[i][j].sectorState.isSelected = false
    newMap[i][j].sectorState.isFirstClick = false
    newMap[i][j].date = secondSector.date
    return newMap
}
