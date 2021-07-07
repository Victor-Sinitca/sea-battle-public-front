import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector";
import {checkOnSectorInLine} from "./isSectorInLine";


export const checkMapUpdate = (Map: MapsGameType,) => {
    let map = [...Map]
    let isBum = false

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if(!map[i][j].date.isBum){
                isBum = checkOnSectorInLine(map, isBum, i, j)
            }
        }
    }
    return {
        map,
        isBum,
    }
}
