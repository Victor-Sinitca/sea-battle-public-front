import {MapsGameType} from "../DeskGame";





export const checkMapUpdate = (Map: MapsGameType) => {
    let map = [...Map]
    let isBum = false

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if(!map[i][j].date.isBum){

            }
        }
    }
    return {
        map,
        isBum,
    }
}
