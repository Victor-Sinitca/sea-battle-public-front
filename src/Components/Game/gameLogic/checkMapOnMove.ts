import {MapsGameType} from "../DeskGame";


export const checkMapOnMove = (map: MapsGameType) => {
    let isMove = false
    for (let i = 0; i < map.length; i++) {
        if (isMove) break
        for (let j = 0; j < map.length; j++) {

            if (map[i][j].date.state === map[i][j + 1]?.date.state) {
                if (map[i][j].date.state === map[i][j + 3]?.date.state) {
                    isMove = true
                    break
                }
            } else if (map[i][j].date.state === map[i][j + 2]?.date.state &&
                map[i][j].date.state === map[i][j + 3]?.date.state) {
                isMove = true
                break
            }




            if (map[i][j].date.state === map[i + 1]?.[j].date.state) {
                if (map[i][j].date.state === map[i + 3]?.[j].date.state) {
                    isMove = true
                    break
                }
            } else if (map[i][j].date.state === map[i + 2]?.[j].date.state &&
                map[i][j].date.state === map[i + 3]?.[j].date.state) {
                isMove = true
                break
            }




            if (map[i][j].date.state === map[i - 1]?.[j + 1]?.date.state) {
                if (map[i][j].date.state === map[i - 2]?.[j + 1]?.date.state) {
                    isMove = true
                    break
                } else if (map[i][j].date.state === map[i + 1]?.[j + 1]?.date.state) {
                    isMove = true
                    break
                }
            } else if (map[i][j].date.state === map[i + 1]?.[j + 1]?.date.state &&
                map[i][j].date.state === map[i + 2]?.[j + 1]?.date.state) {
                isMove = true
                break
            }


           if(map[i][j+1]?.date.state){
               if(map[i][j+1].date.state === map[i+1]?.[j].date.state){
                   if(map[i][j+1].date.state === map[i+2]?.[j].date.state){
                       isMove = true
                       break
                   } else if(map[i][j+1].date.state === map[i-1]?.[j].date.state){
                       isMove = true
                       break
                   }
               }else if (map[i][j+1].date.state === map[i+1]?.[j].date.state &&
                   map[i][j+1].date.state === map[i+2]?.[j].date.state){
                   isMove = true
                   break
               }
           }


            if (map[i][j].date.state === map[i + 1]?.[j + 1]?.date.state) {
                if (map[i][j].date.state === map[i + 1]?.[j + 2]?.date.state) {
                    isMove = true
                    break
                } else if (map[i][j].date.state === map[i + 1]?.[j - 1]?.date.state) {
                    isMove = true
                    break
                }
            } else if (map[i][j].date.state === map[i + 1]?.[j - 1]?.date.state &&
                map[i][j].date.state === map[i + 1]?.[j - 2]?.date.state) {
                isMove = true
                break
            }

            if(map[i+1]?.[j].date.state){
                if(map[i+1][j].date.state === map[i][j+1]?.date.state){
                    if(map[i+1][j].date.state === map[i][j+2]?.date.state){
                        isMove = true
                        break
                    } else if(map[i+1][j].date.state === map[i][j-1]?.date.state){
                        isMove = true
                        break
                    }
                }else if (map[i+1][j].date.state === map[i][j-1]?.date.state &&
                    map[i+1][j].date.state === map[i][j-2]?.date.state){
                    isMove = true
                    break
                }
            }




        }
    }
    return isMove
}
