import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector";

export const blowUpBigCrosshair = (Map: MapsGameType, sector: SectorGameType) => {
    let map = [...Map]
    for (let i = map.length - 1; i >= 0; i--) {
        for (let j = map[i].length - 1; j >= 0; j--) {
            if ((i === sector.sectorState.y || j === sector.sectorState.x)
                || (i === sector.sectorState.y - 1 || j === sector.sectorState.x - 1)
                || (i === sector.sectorState.y + 1 || j === sector.sectorState.x + 1)) {
                map[i][j].date.isBum = true
                map[i][j].date.score = 20
            }

        }
    }
    return map


}
