import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector";
import {getRandomInt} from "../../../commen/logics/getRandom/getRandom";








export const boomFunc = (Map: MapsGameType,  gemsCount = 4 as number) => {
    let map = [...Map]
    let score = 0

    function setSectorH  (map: MapsGameType, i: number, j: number, I: number)  {
        function replaceSectors (map: MapsGameType, firstSector: SectorGameType, secondSector: SectorGameType){
            let i = firstSector.sectorState.y, j = firstSector.sectorState.x;
            map[i][j].sectorState.isSelected = false
            map[i][j].sectorState.isFirstClick = false
            map[i][j].date = secondSector.date
        }

        if (map[I]?.[j]) {
            let sectorInMemory = JSON.parse(JSON.stringify(map[i][j])) as SectorGameType
            let selectSectorInMemory = JSON.parse(JSON.stringify(map[I][j])) as SectorGameType
            replaceSectors(map, sectorInMemory, selectSectorInMemory)
            replaceSectors(map, selectSectorInMemory, sectorInMemory)
        } else {
            let randomMassState = []
            for (let s = 0; s < gemsCount; s++) {
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
    }




    function fastening(ii: number, i: number, j: number) {
        --ii
        if (map[ii]?.[j].date.isBum) { //сектор есть и он взорван
            if (map[ii][j].date.addBonusSector === 1
                || map[ii][j].date.addBonusSector === 2
                || map[ii][j].date.addBonusSector === 3) { // добавляем бонусный сектор если он есть
                map[i][j].date.isBum = false
                map[i][j].date.bonusSector = map[ii][j].date.addBonusSector
                map[i][j].date.state = map[ii][j].date.state
                map[ii][j].date.addBonusSector = 0
              /*  if (map[ii][j].date.score) {
                    score = score + map[ii][j].date.score
                    map[ii][j].date.score = 0
                }*/
            } else if (map[ii][j].date.addBonusSector === 4) {// добавляем новый  сектор если он есть
                map[i][j].date.isBum = false
                map[i][j].date.state = 8
                map[ii][j].date.addBonusSector = 0
               /* if (map[ii][j].date.score) {
                    score = score + map[ii][j].date.score
                    map[ii][j].date.score = 0
                }*/
            } else fastening(ii, i, j) // поднимаемся выше
        } else {
           /* if (map[i][j].date.score) {
                score = score + map[i][j].date.score
                map[i][j].date.score = 0
            }*/
            setSectorH(map, i, j, ii)

        } //сектор не взорван - меняемся, сектора нет - генерируем новый сектор
    }

// уничтожение и замещение секторов, подсчет очков
    // бонусные сектора: 1 - горизонтальный взрыв, 2 - вертикальный взрыв, 3 - г+в взрыв, 4 - алмаз
    for (let i = map.length - 1; i >= 0; i--) {
        for (let j = map[i].length - 1; j >= 0; j--) {
            let ii = i
            if (map[i][j].date.isBum) { // сектор взорван
                if (map[i][j].date.score) {
                    score = score + map[i][j].date.score
                    map[i][j].date.score = 0
                }
                if (map[i][j].date.addBonusSector === 1
                    || map[i][j].date.addBonusSector === 2
                    || map[i][j].date.addBonusSector === 3) { // добавляем бонусный сектор если он есть
                    map[i][j].date.isBum = false
                    map[i][j].date.bonusSector = map[i][j].date.addBonusSector
                    map[i][j].date.addBonusSector = 0
                }else if (map[i][j].date.addBonusSector === 4) {// добавляем новый  сектор если он есть
                    map[i][j].date.isBum = false
                    map[i][j].date.state = 8
                    map[i][j].date.addBonusSector = 0
                } else fastening(ii, i, j) // поднимаемся выше
            }
        }
    }
    console.log("очки:" + score)
    return {
        map,
        score
    }
}


