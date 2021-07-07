import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector";


export const checkMap = (Map: MapsGameType,) => {
    let map = [...Map]
    let isBum = false


    function fasteningH(jj: number, i: number, j: number, bufferSector: SectorGameType) {
        if (map[i][j].date.state === map[i][jj]?.date.state) {
            map[i][jj].date.isBum = true
            if (jj-j === 3){
                bufferSector.date.score=100
                bufferSector.date.addBonusSector=1
            }
            if (jj-j === 4){
                bufferSector= JSON.parse(JSON.stringify(map[i][j +2]))
                bufferSector.date.score=200
                bufferSector.date.addBonusSector=4
            }
            ++jj
            fasteningH(jj, i, j, bufferSector)
        }
    }

    function fasteningV(ii: number, i: number, j: number, bufferSector: SectorGameType) {
        if (map[i][j].date.state === map[ii]?.[j].date.state) {
            map[ii][j].date.isBum = true
            ++ii
            fasteningV(ii, i, j, bufferSector)
        }
    }

    let bufferSector: SectorGameType
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j].date.state === map[i][j + 1]?.date.state && !map[i][j].date.isBum) {
                if (map[i][j].date.state === map[i][j + 2]?.date.state) {
                    map[i][j].date.isBum = true
                    map[i][j + 1].date.isBum = true
                    map[i][j + 2].date.isBum = true
                    bufferSector = JSON.parse(JSON.stringify(map[i][j + 1]))
                    bufferSector.date.score = 50
                    isBum = true
                    let jj = j + 3
                    fasteningH(jj, i, j, bufferSector)
                }
            }
        }
    }
    for (let j = 0; j < map[0].length; j++) {
        for (let i = 0; i < map.length; i++) {
            if (map[i][j].date.state === map[i + 1]?.[j].date.state) {
                if (map[i][j].date.state === map[i + 2]?.[j].date.state) {
                    map[i][j].date.isBum = true
                    map[i + 1][j].date.isBum = true
                    map[i + 2][j].date.isBum = true
                    bufferSector = JSON.parse(JSON.stringify(map[i+1][j]))
                    bufferSector.date.score = 50
                    isBum = true
                    let ii = j + 3
                    fasteningV(ii, i, j, bufferSector)
                }
            }
        }
    }
    return {
        map,
        isBum,
    }
}
