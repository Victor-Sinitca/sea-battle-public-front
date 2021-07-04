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
        for (let s = 0; s < 5; s++) {
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
            }
        }
    }
    return map
}

export const boomFunc = (Map: MapsGameType) => {
    let map = [...Map]
    for (let i = map.length - 1; i >= 0; i--) {
        for (let j = map[i].length - 1; j >= 0; j--) {
            if (map[i][j].date.isBum) {
                if (map[i - 1]?.[j].date.isBum) {
                    if (map[i - 2]?.[j].date.isBum) {
                        if (map[i - 3]?.[j].date.isBum) {
                            if (map[i - 4]?.[j].date.isBum) {
                                if (map[i - 5]?.[j].date.isBum) {
                                    if (map[i - 6]?.[j].date.isBum) {
                                        if (map[i - 7]?.[j].date.isBum) {
                                            if (map[i - 8]?.[j].date.isBum) {
                                                if (map[i - 9]?.[j].date.isBum) {
                                                } else map = setSectorH(map, i, j, i - 9)
                                            } else map = setSectorH(map, i, j, i - 8)
                                        } else map = setSectorH(map, i, j, i - 7)
                                    } else map = setSectorH(map, i, j, i - 6)
                                } else map = setSectorH(map, i, j, i - 5)
                            } else map = setSectorH(map, i, j, i - 4)
                        } else map = setSectorH(map, i, j, i - 3)
                    } else map = setSectorH(map, i, j, i - 2)
                } else map = setSectorH(map, i, j, i - 1)
            }
        }
    }
    return map
}
