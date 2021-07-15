import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector/Sector";
import {getRandomInt} from "../../../commen/logics/getRandom/getRandom";



export function setAnimationCSS(i:number, j:number, ii: number, jj:number,
                                isMove:boolean, shift:boolean,
                                animationList:Array<Array<string>> ) {
    let styleSheet = document.styleSheets[0];
    let animationName = `keyframe${i}${j}${ii}${jj}${isMove}${shift}`
    let keyframes =
        `@-webkit-keyframes ${animationName} {
                     ${shift? "100%" :"50%"} {transform: translate(${j * 100}%, ${i * 100}%)}
                 }`
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    animationList[i][j]=animationName
}




export const boomFunc1 = (Map: MapsGameType, gemsCount = 4 as number, AnimationList:Array<Array<string>>) => {
    let map = [...Map]
    let animationList = [...AnimationList]

    let score = 0
    let pozNewSector = 0
    let animationsCount = 0

    function setSectorH(map: MapsGameType, i: number, j: number, I: number) {
        if (map[I]?.[j]) {
            //сектор есть - меняемся местами
            /*console.log("setSectorH")*/
            map[i][j].date.isBum = false
            map[i][j].date.bonusSector = map[I][j].date.bonusSector
            map[i][j].date.state = map[I][j].date.state
            map[i][j].sectorState.animateMove = {
                isMove: false,
                shift: true,
                i: I - i,
                j: 0
            }
            setAnimationCSS(i,j,I - i,0,false,true,animationList)
            animationsCount++
            map[I][j].date.isBum = true
        } else {
            //сектора нет - создаем новый сектор
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
                    animateMove: {
                        isMove: false,
                        shift: true,
                        i: I - i - pozNewSector,
                        j: 0
                    },
                    animateStart: false,
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
            setAnimationCSS(i,j,I - i - pozNewSector,0,false,true,animationList)
            animationsCount++
            pozNewSector++
        }
    }


    function fastening(II: number, I: number, J: number) {
        let ii = II - 1
        let i = I
        let j = J
        if (map[ii]?.[j].date.isBum) { //сектор есть и он взорван
            if (map[ii][j].date.addBonusSector === 1
                || map[ii][j].date.addBonusSector === 2
                || map[ii][j].date.addBonusSector === 3) { // добавляем бонусный сектор если он есть
                map[i][j].date.isBum = false
                map[i][j].date.bonusSector = map[ii][j].date.addBonusSector
                map[i][j].date.state = map[ii][j].date.state
                map[ii][j].date.addBonusSector = 0


                setAnimationCSS(i,j,ii-i,0,false,true,animationList)

                map[i][j].sectorState.animateMove = {
                    isMove: false,
                    shift: true,
                    i: ii - i,
                    j: 0
                }

                animationsCount++


            } else if (map[ii][j].date.addBonusSector === 4) {// добавляем новый  сектор если он есть
                map[i][j].date.isBum = false
                map[i][j].date.state = 8
                map[ii][j].date.addBonusSector = 0


                setAnimationCSS(i,j,ii-i, 0,false,true,animationList)
                map[i][j].sectorState.animateMove = {
                    isMove: false,
                    shift: true,
                    i: ii - i,
                    j: 0
                }



                animationsCount++


            } else fastening(ii, i, j) // поднимаемся выше
        } else {
            setSectorH(map, i, j, ii)
        } //сектор не взорван - меняемся, сектора нет - генерируем новый сектор
    }


// уничтожение и замещение секторов, подсчет очков
    // бонусные сектора: 1 - горизонтальный взрыв, 2 - вертикальный взрыв, 3 - г+в взрыв, 4 - алмаз
    for (let j = map[0].length - 1; j >= 0; j--) {
        pozNewSector = 0
        for (let i = map.length - 1; i >= 0; i--) {
            if (map[i][j].date.isBum) { // сектор взорван
                if (map[i][j].date.score) {
                    score = score + map[i][j].date.score //собираем очки
                    map[i][j].date.score = 0
                }
                if (map[i][j].date.addBonusSector === 1
                    || map[i][j].date.addBonusSector === 2
                    || map[i][j].date.addBonusSector === 3) { // добавляем бонусный сектор если он есть
                    map[i][j].date.isBum = false
                    map[i][j].date.bonusSector = map[i][j].date.addBonusSector
                    map[i][j].date.addBonusSector = 0
                } else if (map[i][j].date.addBonusSector === 4) {// добавляем новый  сектор если он есть
                    map[i][j].date.isBum = false
                    map[i][j].date.state = 8
                    map[i][j].date.addBonusSector = 0
                } else fastening(i, i, j) // поднимаемся выше
            }
        }
    }
    console.log("очки:" + score)
    return {
        map,
        score,
        animationsCount,
        animationList,
    }
}


