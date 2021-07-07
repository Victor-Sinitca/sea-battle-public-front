import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector";


export const checkOnSectorInLine = (Map: MapsGameType, IsLine: boolean, i: number, j: number) => {
    let map = Map
    let isLine = IsLine
    if (map[i][j].date.state === map[i - 1]?.[j].date.state) {
        if (map[i][j].date.state === map[i - 2]?.[j].date.state) {
            //00X v
            isLine = true
            map[i][j].date.isBum = true
            map[i - 1][j].date.isBum = true
            map[i - 2][j].date.isBum = true
            if (map[i][j].date.state === map[i - 3]?.[j].date.state) {
                map[i - 3][j].date.isBum = true
                map[i][j].date.score = 100
                map[i][j].date.addBonusSector=1
            } else if (map[i][j].date.state === map[i + 1]?.[j].date.state) {
                //00X0 v
                map[i + 1][j].date.isBum = true
                if (map[i][j].date.state === map[i + 2]?.[j].date.state) {
                    //00X00 v
                    map[i + 2][j].date.isBum = true
                    map[i][j].date.score = 200
                    map[i][j].date.addBonusSector = 4
                } else {
                    //00X0 v
                    map[i][j].date.score = 100
                    map[i][j].date.addBonusSector = 1
                }
            } else {
                //00X v
                map[i][j].date.score = 50
            }
        } else if (map[i][j].date.state === map[i + 1]?.[j].date.state) {
            //0X0 v
            isLine = true
            map[i][j].date.isBum = true
            map[i - 1][j].date.isBum = true
            map[i + 1][j].date.isBum = true
            if (map[i][j].date.state === map[i + 2]?.[j].date.state) {
                //0X00 v
                map[i + 2][j].date.isBum = true
                map[i][j].date.score = 100
                map[i][j].date.addBonusSector = 1
            } else {
                //0X0 v
                map[i][j].date.score = 50
            }
        }
    } else if (map[i][j].date.state === map[i + 1]?.[j].date.state) {
        if (map[i][j].date.state === map[i + 2]?.[j].date.state) {
            //X00 v
            isLine = true
            map[i][j].date.isBum = true
            map[i + 1][j].date.isBum = true
            map[i + 2][j].date.isBum = true
            map[i][j].date.score = 50
        }
    }


    if (map[i][j].date.state === map[i][j - 1]?.date.state) {
        if (map[i][j].date.state === map[i][j - 2]?.date.state) {
            //00X g
            isLine = true
            map[i][j].date.isBum = true
            map[i][j - 1].date.isBum = true
            map[i][j - 2].date.isBum = true
            if (map[i][j].date.state === map[i ][j- 3]?.date.state) {
                map[i ][j- 3].date.isBum = true
                map[i][j].date.score = 100
                map[i][j].date.addBonusSector=2
            } else if (map[i][j].date.state === map[i][j + 1]?.date.state) {
                //00X0 g
                map[i][j + 1].date.isBum = true
                if (map[i][j].date.state === map[i][j + 2]?.date.state) {
                    //00X00 g
                    map[i][j + 2].date.isBum = true
                    map[i][j].date.addBonusSector = 4
                    map[i][j].date.score=200
                    if (map[i][j].date.isBum) {
                        if (map[i][j].date.score === 50) {
                            map[i][j].date.score = 300
                            if (map[i - 1]?.[j].date.isBum) {
                                map[i - 1][j].date.addBonusSector = 3
                            }
                            if (map[i + 1]?.[j].date.isBum) {
                                map[i + 1][j].date.addBonusSector = 3
                            }
                        }
                    }
                } else {
                    //00X0 g
                    if (map[i][j].date.score === 50) {
                        map[i][j].date.score = 150
                        map[i][j].date.addBonusSector = 3
                    } else {
                        map[i][j].date.score = 100
                        map[i][j].date.addBonusSector = 2
                    }
                }
            } else {
                //00X g
                if (map[i][j].date.score === 50) {
                    map[i][j].date.score = 100
                    map[i][j].date.addBonusSector = 3
                } else if (map[i][j].date.score === 100) {
                    map[i][j].date.score = 200
                    map[i][j].date.addBonusSector = 3
                } else if (map[i][j].date.score) {
                    map[i][j].date.score = 300
                    map[i][j - 1].date.addBonusSector = 3
                } else {
                    map[i][j].date.score = 50
                }

            }
        } else if (map[i][j].date.state === map[i][j + 1]?.date.state) {
            //0X0 g
            isLine = true
            map[i][j].date.isBum = true
            map[i][j - 1].date.isBum = true
            map[i][j + 1].date.isBum = true
            if (map[i][j].date.state === map[i][j + 2]?.date.state) {
                //0X00 g
                map[i][j + 2].date.isBum = true
                if (map[i][j].date.score === 50) {
                    map[i][j].date.score = 200
                    map[i][j].date.addBonusSector = 3
                } else {
                    map[i][j].date.score = 100
                    map[i][j].date.addBonusSector = 2
                }

            } else {
                //0X0 g
                if (map[i][j].date.score === 50) {
                    map[i][j].date.score = 100
                    map[i][j].date.addBonusSector = 3
                } else {
                    map[i][j].date.score = 50
                }
            }
        }
    } else if (map[i][j].date.state === map[i][j + 1]?.date.state) {
        if (map[i][j].date.state === map[i][j + 2]?.date.state) {
            //X00 g
            isLine = true
            map[i][j].date.isBum = true
            map[i][j + 1].date.isBum = true
            map[i][j + 2].date.isBum = true
            if (map[i][j].date.score === 50) {
                map[i][j].date.score = 100
                map[i][j].date.addBonusSector = 3
            } else if (map[i][j].date.score === 100) {
                map[i][j].date.score = 200
                map[i][j].date.addBonusSector = 3
            } else if (map[i][j].date.score) {
                map[i][j].date.score = 300
                map[i][j + 1].date.addBonusSector = 3
            } else {
                map[i][j].date.score = 50
            }
        }
    }


    return isLine
}


export const isSectorInLine = (Map: MapsGameType, selectSector: SectorGameType, sector: SectorGameType) => {
    let isLine = false
    let map = Map
    isLine = checkOnSectorInLine(map, isLine, selectSector.sectorState.y, selectSector.sectorState.x)
    isLine = checkOnSectorInLine(map, isLine, sector.sectorState.y, sector.sectorState.x)
    if (isLine) {
        return map
    } else return null
}
