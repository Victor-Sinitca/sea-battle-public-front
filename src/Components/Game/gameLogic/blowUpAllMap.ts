import {MapsGameType} from "../DeskGame";


export const blowUpAllMap=(Map: MapsGameType,)=>{
    let map = [...Map]
    for (let i = map.length - 1; i >= 0; i--) {
        for (let j = map[i].length - 1; j >= 0; j--) {
                map[i][j].date.isBum = true
                map[i][j].date.score = 20
        }
    }
    return map
}
