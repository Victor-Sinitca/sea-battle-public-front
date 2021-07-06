import {MapsGameType} from "../DeskGame";



export const checkMap = (Map: MapsGameType) => {
    let map = [...Map]
    let isBum = false

    function fasteningH(jj: number, i: number, j: number) {
        if (map[i][j].date.state === map[i][jj]?.date.state) {
            map[i][jj].date.isBum = true
            ++jj
            fasteningH(jj, i, j)
        }
    }
    function fasteningV(ii: number, i: number, j: number) {
        if (map[i][j].date.state === map[ii]?.[j].date.state) {
            map[ii][j].date.isBum = true
            ++ii
            fasteningV(ii, i, j)
        }
    }
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if(map[i][j].date.state === map[i][j+1]?.date.state && !map[i][j].date.isBum){
                if(map[i][j].date.state === map[i][j+2]?.date.state){
                    map[i][j].date.isBum = true
                    map[i][j+1].date.isBum = true
                    map[i][j+2].date.isBum = true
                    isBum=true
                    let jj = j+3
                    fasteningH(jj, i, j)
                }
            }
        }
    }
    for (let j = 0; j < map[0].length; j++) {
        for (let i = 0; i < map.length; i++) {
            if(map[i][j].date.state === map[i+1]?.[j].date.state){
                if(map[i][j].date.state === map[i+2]?.[j].date.state){
                    map[i][j].date.isBum = true
                    map[i+1][j].date.isBum = true
                    map[i+2][j].date.isBum = true
                    isBum=true
                    let ii = j+3
                    fasteningV(ii, i, j)
                }
            }
        }
    }
    return {
        map,
        isBum
    }
}
