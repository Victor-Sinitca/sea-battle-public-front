import {MapsGameType} from "../DeskGame";



export const checkMap = (Map: MapsGameType) => {
    let map = [...Map]
    let isBum = false
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            if(map[i][j].date.state === map[i][j+1]?.date.state && !map[i][j].date.isBum){
                if(map[i][j].date.state === map[i][j+2]?.date.state){
                    map[i][j].date.isBum = true
                    map[i][j+1].date.isBum = true
                    map[i][j+2].date.isBum = true
                    isBum=true
                    if(map[i][j].date.state === map[i][j+3]?.date.state){
                        map[i][j+3].date.isBum = true
                        if(map[i][j].date.state === map[i][j+4]?.date.state){
                            map[i][j+4].date.isBum = true
                            if(map[i][j].date.state === map[i][j+5]?.date.state){
                                map[i][j+5].date.isBum = true
                                if(map[i][j].date.state === map[i][j+6]?.date.state){
                                    map[i][j+6].date.isBum = true
                                    if(map[i][j].date.state === map[i][j+7]?.date.state){
                                        map[i][j+7].date.isBum = true
                                        if(map[i][j].date.state === map[i][j+8]?.date.state){
                                            map[i][j+8].date.isBum = true
                                            if(map[i][j].date.state === map[i][j+9]?.date.state){
                                                map[i][j+9].date.isBum = true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    for (let j = 0; j < map.length; j++) {
        for (let i = 0; i < map[j].length; i++) {
            if(map[i][j].date.state === map[i+1]?.[j].date.state){
                if(map[i][j].date.state === map[i+2]?.[j].date.state){
                    map[i][j].date.isBum = true
                    map[i+1][j].date.isBum = true
                    map[i+2][j].date.isBum = true
                    isBum=true
                    if(map[i][j].date.state === map[i+3]?.[j].date.state){
                        map[i+3][j].date.isBum = true
                        if(map[i][j].date.state === map[i+4]?.[j].date.state){
                            map[i+4][j].date.isBum = true
                            if(map[i][j].date.state === map[i+5]?.[j].date.state){
                                map[i+5][j].date.isBum = true
                                if(map[i][j].date.state === map[i+6]?.[j].date.state){
                                    map[i+6][j].date.isBum = true
                                    if(map[i][j].date.state === map[i+7]?.[j].date.state){
                                        map[i+7][j].date.isBum = true
                                        if(map[i][j].date.state === map[i+8]?.[j].date.state){
                                            map[i+8][j].date.isBum = true
                                            if(map[i][j].date.state === map[i+9]?.[j].date.state){
                                                map[i+9][j].date.isBum = true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return {
        map,
        isBum
    }
}
