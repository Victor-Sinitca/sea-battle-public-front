import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector";
import {replaceSectors} from "./replaceSectors";
import {getRandomInt} from "../../../commen/logics/getRandom/getRandom";


export const boomFunc = (Map: MapsGameType) => {
    let map = [...Map]

    for (let i = map.length - 1; i >= 0; i--) {
        for (let j = map[i].length - 1; j >= 0; j--) {
            if(map[i][j].date.isBum){
                if(map[i][j-1]?.date.isBum){
                    if(map[i][j-2]?.date.isBum){
                        if(map[i][j-3]?.date.isBum){
                            if(map[i][j-4]?.date.isBum){
                                if(map[i][j-5]?.date.isBum){
                                    if(map[i][j-6]?.date.isBum){
                                        if(map[i][j-7]?.date.isBum){
                                            if(map[i][j-8]?.date.isBum){
                                                if(map[i][j-9]?.date.isBum){


                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else if(map[i][j-1]){
                    let sectorInMemory = JSON.parse(JSON.stringify(map[i][j])) as SectorGameType
                    let selectSectorInMemory = JSON.parse(JSON.stringify(map[i][j-1])) as SectorGameType
                    map = replaceSectors(map, sectorInMemory, selectSectorInMemory)
                    map = replaceSectors(map, selectSectorInMemory, sectorInMemory)
                }else{
                    let randomMassState = []
                    for (let s = 0; s < 5; s++) {
                        if ((map[i - 1]?.[j].date.state === s && map[i - 2]?.[j].date.state === s) ||
                            (map[i + 1]?.[j].date.state === s && map[i + 2]?.[j].date.state === s) ||
                            (map[i + 1]?.[j].date.state === s && map[i - 1]?.[j].date.state === s) ||
                            (map[i][j - 1]?.date.state === s && map[i][j - 2]?.date.state === s)) {
                        }else{
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
            }else{}
        }
    }


    return map
}
