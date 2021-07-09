import {MapsGameType} from "../DeskGame";

// проверка карты на линии взрыва
export const checkMap = (Map: MapsGameType) => {
    let map = [...Map]
    let isBum = false
// есть линия по вертикали
    const isLineOnVertical = (i: number, j: number) => {
        return ((map[i][j].date.state === map[i + 1]?.[j].date.state && map[i][j].date.state === map[i + 2]?.[j].date.state)
            || (map[i][j].date.state === map[i + 1]?.[j].date.state && map[i][j].date.state === map[i - 1]?.[j].date.state)
            || (map[i][j].date.state === map[i - 1]?.[j].date.state && map[i][j].date.state === map[i - 2]?.[j].date.state))
    }
// нахождение горизонтальных лини для взрыва и поиск в них пересечений с вертикальными линиями
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (!map[i][j].date.isBum) {
                let isLine = false // была ли линия по вертикали
                if (map[i][j].date.state === map[i][j + 1]?.date.state
                    && map[i][j].date.state === map[i][j + 2]?.date.state) { // три сектора по горизонту
                    map[i][j].date.isBum = true
                    map[i][j + 1].date.isBum = true
                    map[i][j + 2].date.isBum = true
                    isBum = true
                    if (isLineOnVertical(i, j)) { //
                        isLine = true
                        map[i][j].date.addBonusSector = 3
                        map[i][j].date.score = 100
                    }
                    if (isLineOnVertical(i, j + 1)) {
                        isLine = true
                        map[i][j + 1].date.addBonusSector = 3
                        map[i][j + 1].date.score = 100
                    }
                    if (isLineOnVertical(i, j + 2)) {
                        isLine = true
                        map[i][j + 2].date.addBonusSector = 3
                        map[i][j + 2].date.score = 100
                    }
                    if (map[i][j].date.state === map[i][j + 3]?.date.state) {// четыре сектора по горизонту
                        map[i][j + 3].date.isBum = true
                        if (isLineOnVertical(i, j + 3)) {
                            isLine = true
                            map[i][j + 3].date.addBonusSector = 3
                            map[i][j + 3].date.score = 100
                        }
                        if (map[i][j].date.state === map[i][j + 4]?.date.state) { // пять секторов по горизонту
                            map[i][j + 4].date.isBum = true
                            if (isLineOnVertical(i, j + 4)) {
                                isLine = true
                                map[i][j + 4].date.addBonusSector = 3
                                map[i][j + 4].date.score = 100
                            }
                            if (!isLine) {
                                map[i][j + 2].date.addBonusSector = 4
                                map[i][j + 2].date.score = 200
                            } else {
                                if (!map[i][j + 2].date.addBonusSector) {
                                    map[i][j + 2].date.addBonusSector = 4
                                    map[i][j + 2].date.score = 200
                                } else if (!map[i][j + 1].date.addBonusSector) {
                                    map[i][j + 1].date.addBonusSector = 4
                                    map[i][j + 1].date.score = 200
                                } else if (!map[i][j + 3].date.addBonusSector) {
                                    map[i][j + 3].date.addBonusSector = 4
                                    map[i][j + 3].date.score = 200
                                } else {
                                    //шиш с маком!
                                }
                            }
                        } else {
                            if (!isLine) {
                                map[i][j + 2].date.addBonusSector = 2
                                map[i][j + 2].date.score = 100
                            }
                        }
                    } else {
                        if (!isLine) {
                            map[i][j + 1].date.score = 50
                        }
                    }
                }//пропускаем
            }//пропускаем
        }
    }

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (!map[i][j].date.isBum
                || (map[i][j].date.isBum && (!map[i - 1]?.[j] || !map[i - 1]?.[j].date.isBum))) {

                if (map[i][j].date.state === map[i + 1]?.[j].date.state
                    && map[i][j].date.state === map[i + 2]?.[j].date.state) {
                    map[i][j].date.isBum = true
                    map[i + 1][j].date.isBum = true
                    map[i + 2][j].date.isBum = true
                    isBum = true
                    if (map[i][j].date.state === map[i + 3]?.[j].date.state) {
                        map[i + 3][j].date.isBum = true
                        if (map[i][j].date.state === map[i + 4]?.[j].date.state) {
                            map[i + 4][j].date.isBum = true
                            if (!map[i][j].date.addBonusSector && !map[i + 1][j].date.addBonusSector
                                && !map[i + 2][j].date.addBonusSector && !map[i + 3][j].date.addBonusSector
                                && !map[i + 4][j].date.addBonusSector) {
                                map[i + 2][j].date.score = 200
                                map[i + 2][j].date.addBonusSector = 4
                            } else {
                                if (!map[i + 2][j].date.addBonusSector) {
                                    map[i + 2][j].date.addBonusSector = 4
                                    map[i + 2][j].date.score = 200
                                } else if (!map[i][j + 1].date.addBonusSector) {
                                    map[i + 1][j].date.addBonusSector = 4
                                    map[i + 1][j].date.score = 200
                                } else if (!map[i + 3][j].date.addBonusSector) {
                                    map[i + 3][j].date.addBonusSector = 4
                                    map[i + 3][j].date.score = 200
                                } else {
                                    //шиш с маком!
                                }

                            }


                        } else if (!map[i][j].date.addBonusSector && !map[i + 1][j].date.addBonusSector
                            && !map[i + 2][j].date.addBonusSector && !map[i + 3][j].date.addBonusSector) {
                            map[i + 2][j].date.score = 100
                            map[i + 2][j].date.addBonusSector = 1
                        }
                    } else if (!map[i][j].date.addBonusSector && !map[i + 1][j].date.addBonusSector && !map[i + 2][j].date.addBonusSector) {
                        map[i + 1][j].date.score = 50
                    }

                }

            }
        }

    }


    return {
        map,
        isBum,
    }
}
