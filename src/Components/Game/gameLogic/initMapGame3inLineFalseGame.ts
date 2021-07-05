import {MapsGameType} from "../DeskGame";


export const initMapGame3inLineFalseGame = (x: number = 10, y: number = 10) => {
    let map = Array.from(Array(x), () => new Array(y)) as MapsGameType

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            let setValue = i + j
            if (setValue > 4) {
                while (setValue > 4) {
                    setValue = setValue - 5
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
                    state: setValue,
                    isBum: false,
                }
            }
        }
    }
    return map
}
