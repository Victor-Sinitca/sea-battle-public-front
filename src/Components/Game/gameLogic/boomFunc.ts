import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector";
import {replaceSectors} from "./replaceSectors";
import {getRandomInt} from "../../../commen/logics/getRandom/getRandom";


const setSectorH = (Map: MapsGameType, i: number, j: number, I: number) => {
    let map = Map
    if (map[I]?.[j]) {
        let sectorInMemory = JSON.parse(JSON.stringify(map[i][j])) as SectorGameType
        let selectSectorInMemory = JSON.parse(JSON.stringify(map[I][j])) as SectorGameType
        map = replaceSectors(map, sectorInMemory, selectSectorInMemory)
        map = replaceSectors(map, selectSectorInMemory, sectorInMemory)
    } else {
        let randomMassState = []
        for (let s = 0; s < 4; s++) {
            if ((map[i][j - 1]?.date.state === s && map[i][j - 2]?.date.state === s) ||
                (map[i][j + 1]?.date.state === s && map[i][j + 2]?.date.state === s) ||
                (map[i][j + 1]?.date.state === s && map[i][j - 1]?.date.state === s) ||
                (map[i + 1]?.[j].date.state === s && map[i + 2]?.[j].date.state === s)) {
            } else {
                randomMassState.push(s)
            }
        }
        map[i][j] = {
            sectorState: {
                x: j,
                y: i,
                isSelected: false,
                isFirstClick: false,
            },
            date: {
                color: "red",
                state: randomMassState[getRandomInt(randomMassState.length)],
                isBum: false,
                score: 0,
                addBonusSector: 0,
                bonusSector: 0,
            }
        }
    }
    return map
}

export const boomFunc = (Map: MapsGameType,) => {
    let map = [...Map]

    function fastening(ii: number, i: number, j: number) {
        --ii
        if (map[ii]?.[j].date.isBum) {
            if(map[ii][j].date.addBonusSector === 1
                || map[ii][j].date.addBonusSector === 2
                || map[ii][j].date.addBonusSector === 3){
                map[i][j].date.isBum = false
                map[i][j].date.bonusSector = map[ii][j].date.addBonusSector
                map[ii][j].date.addBonusSector = 0
            }else if(map[ii][j].date.addBonusSector === 4){
                map[i][j].date.isBum = false
                map[i][j].date.state = 8
                map[ii][j].date.addBonusSector = 0
            } else fastening(ii, i, j)
        } else map = setSectorH(map, i, j, ii)
    }


    for (let i = map.length - 1; i >= 0; i--) {
        for (let j = map[i].length - 1; j >= 0; j--) {

        }
    }


    for (let i = map.length - 1; i >= 0; i--) {
        for (let j = map[i].length - 1; j >= 0; j--) {
            let ii = i
            if (map[i][j].date.isBum) {
                if (map[i][j].date.addBonusSector === 1
                    || map[i][j].date.addBonusSector === 2
                    || map[i][j].date.addBonusSector === 3) {
                    map[i][j].date.isBum = false
                    map[i][j].date.bonusSector = map[i][j].date.addBonusSector
                    map[i][j].date.addBonusSector = 0
                } else fastening(ii, i, j)

            }
        }
    }
    return map
}


