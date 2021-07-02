import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector";


export const isSectorInLine = (Map: MapsGameType, selectSector: SectorGameType, sector: SectorGameType) => {
    let isLine = false
    let map = Map
    let i = selectSector.sectorState.y, j = selectSector.sectorState.x;
    if (map[i][j].date.state === map[i - 1]?.[j].date.state) {
        if (map[i][j].date.state === map[i - 2]?.[j].date.state) {
            isLine = true
            map[i][j].date.isBum = true
            map[i - 1][j].date.isBum = true
            map[i - 2][j].date.isBum = true
            if (map[i][j].date.state === map[i + 1]?.[j].date.state) {
                map[i + 1][j].date.isBum = true
                if (map[i][j].date.state === map[i + 2]?.[j].date.state) {
                    map[i + 2][j].date.isBum = true
                }
            }
        } else if (map[i][j].date.state === map[i + 1]?.[j].date.state) {
            isLine = true
            map[i][j].date.isBum = true
            map[i - 1][j].date.isBum = true
            map[i + 1][j].date.isBum = true
            if (map[i][j].date.state === map[i + 2]?.[j].date.state) {
                map[i + 2][j].date.isBum = true
            }
        }
    } else if (map[i][j].date.state === map[i + 1]?.[j].date.state) {
        if (map[i][j].date.state === map[i + 2]?.[j].date.state) {
            isLine = true
            map[i][j].date.isBum = true
            map[i + 1][j].date.isBum = true
            map[i + 2][j].date.isBum = true
        }
    }


    if (map[i][j].date.state === map[i][j - 1]?.date.state) {
        if (map[i][j].date.state === map[i][j - 2]?.date.state) {
            isLine = true
            map[i][j].date.isBum = true
            map[i][j - 1].date.isBum = true
            map[i][j - 2].date.isBum = true
            if (map[i][j].date.state === map[i][j + 1]?.date.state) {
                map[i][j + 1].date.isBum = true
                if (map[i][j].date.state === map[i][j + 2]?.date.state) {
                    map[i][j + 2].date.isBum = true
                }
            }
        } else if (map[i][j].date.state === map[i][j + 1]?.date.state) {
            isLine = true
            map[i][j].date.isBum = true
            map[i][j - 1].date.isBum = true
            map[i][j + 1].date.isBum = true
            if (map[i][j].date.state === map[i][j + 2]?.date.state) {
                map[i][j + 2].date.isBum = true
            }
        }
    } else if (map[i][j].date.state === map[i][j + 1]?.date.state) {
        if (map[i][j].date.state === map[i][j + 2]?.date.state) {
            isLine = true
            map[i][j].date.isBum = true
            map[i][j + 1].date.isBum = true
            map[i][j + 2].date.isBum = true
        }
    }


    i = sector.sectorState.y;
    j = sector.sectorState.x;

    if (map[i][j].date.state === map[i - 1]?.[j].date.state) {
        if (map[i][j].date.state === map[i - 2]?.[j].date.state) {
            isLine = true
            map[i][j].date.isBum = true
            map[i - 1][j].date.isBum = true
            map[i - 2][j].date.isBum = true
            if (map[i][j].date.state === map[i + 1]?.[j].date.state) {
                map[i + 1][j].date.isBum = true
                if (map[i][j].date.state === map[i + 2]?.[j].date.state) {
                    map[i + 2][j].date.isBum = true
                }
            }
        } else if (map[i][j].date.state === map[i + 1]?.[j].date.state) {
            isLine = true
            map[i][j].date.isBum = true
            map[i - 1][j].date.isBum = true
            map[i + 1][j].date.isBum = true
            if (map[i][j].date.state === map[i + 2]?.[j].date.state) {
                map[i + 2][j].date.isBum = true
            }
        }
    } else if (map[i][j].date.state === map[i + 1]?.[j].date.state) {
        if (map[i][j].date.state === map[i + 2]?.[j].date.state) {
            isLine = true
            map[i][j].date.isBum = true
            map[i + 1][j].date.isBum = true
            map[i + 2][j].date.isBum = true
        }
    }


    if (map[i][j].date.state === map[i][j - 1]?.date.state) {
        if (map[i][j].date.state === map[i][j - 2]?.date.state) {
            isLine = true
            map[i][j].date.isBum = true
            map[i][j - 1].date.isBum = true
            map[i][j - 2].date.isBum = true
            if (map[i][j].date.state === map[i][j + 1]?.date.state) {
                map[i][j + 1].date.isBum = true
                if (map[i][j].date.state === map[i][j + 2]?.date.state) {
                    map[i][j + 2].date.isBum = true
                }
            }
        } else if (map[i][j].date.state === map[i][j + 1]?.date.state) {
            isLine = true
            map[i][j].date.isBum = true
            map[i][j - 1].date.isBum = true
            map[i][j + 1].date.isBum = true
            if (map[i][j].date.state === map[i][j + 2]?.date.state) {
                map[i][j + 2].date.isBum = true
            }
        }
    } else if (map[i][j].date.state === map[i][j + 1]?.date.state) {
        if (map[i][j].date.state === map[i][j + 2]?.date.state) {
            isLine = true
            map[i][j].date.isBum = true
            map[i][j + 1].date.isBum = true
            map[i][j + 2].date.isBum = true
        }
    }





    if (isLine) {
        return map
    } else return null
}
