import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector/Sector";


export const replaceSectors =(map: MapsGameType, firstSector: SectorGameType, secondSector: SectorGameType)=>{
    let newMap = [...map]
    let i = firstSector.sectorState.y, j = firstSector.sectorState.x;
    let I = secondSector.sectorState.y, J = secondSector.sectorState.x;
    newMap[i] = [...map[i]]
    newMap[I] = [...map[I]]
    newMap[i][j] = {...map[i][j]}
    newMap[I][J] = {...map[I][J]}
    newMap[i][j].sectorState = {...map[i][j].sectorState}
    newMap[I][J].sectorState = {...map[I][J].sectorState}
    newMap[i][j].sectorState.isSelected = false
    newMap[i][j].sectorState.isFirstClick = false
    newMap[i][j].date = secondSector.date
    newMap[I][J].sectorState.isSelected = false
    newMap[I][J].sectorState.isFirstClick = false
    newMap[I][J].date = firstSector.date
    return newMap
}
