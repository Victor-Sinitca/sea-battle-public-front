export  type SectorType = {
    ship: boolean,
    shot: boolean,
    x: number,
    y: number,
    unlock: boolean,
    img: null | number
}

export  type ShipsType = {
    ship1: number,
    ship2: number,
    ship3: number,
    ship4: number,
    numberShips1: number,
    numberShips2: number,
    numberShips3: number,
    numberShips4: number,
}
export type MapsType=Array<Array<{sector:SectorType}>>


