import {MapsType, ShipsType} from "../../../../Types/Types";

export const initializeTheMapFunction = (userMap: MapsType | null): MapsType => {
    let map: MapsType = [[]]
    if (userMap) {
        map = userMap
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            map[i][j] = {
                sector: {
                    ship: false,
                    shot: false,
                    x: j,
                    y: i,
                    unlock: false,
                    img: null
                }
            }
        }
    }
    return map
}

export const initializeTheUserShipsFunction = (): ShipsType => {
    return {
        ship1: 4,
        ship2: 3,
        ship3: 2,
        ship4: 1,
        numberShips1: 4,
        numberShips2: 3,
        numberShips3: 2,
        numberShips4: 1,
    }
}