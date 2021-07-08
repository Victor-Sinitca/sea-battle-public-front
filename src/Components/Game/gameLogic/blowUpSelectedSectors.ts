import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector";


export const blowUpSelectedSectors = (Map: MapsGameType,sector1: SectorGameType, sector2: SectorGameType) => {
    let map = [...Map]
    map[sector1.sectorState.y][sector1.sectorState.x].date.isBum = true
    map[sector1.sectorState.y][sector1.sectorState.x].date.score = 200
    for (let i = map.length - 1; i >= 0; i--) {
        for (let j = map[i].length - 1; j >= 0; j--) {
            if (map[i][j].date.state === sector2.date.state) {
                map[i][j].date.isBum = true
                map[i][j].date.bonusSector = sector2.date.bonusSector
                map[i][j].date.score = 20

            }
        }
    }
    return map
}
