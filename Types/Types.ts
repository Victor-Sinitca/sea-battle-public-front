import {initialStateBattleMapType} from "../src/redux/battleMap-reduсer";

export type compType={
    game:  boolean,
    damaged:  boolean,
    hit:  boolean,
    sectorFire: [] | Array<SectorType>
}

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
export  type settingShipUserType ={
    secondUser : boolean,
    firstUser : boolean,
}

export type MapsType=Array<Array<{sector:SectorType}>>
export type stateReturnType={
    FUMap: MapsType,
    SUMap: MapsType,
    FUShips: ShipsType,
    SUShips: ShipsType,
    comp:compType,
    FUTurn:{
        turn:boolean
    },
    lookSecondUser : boolean,
    whatSetShipFU : number,
    whatSetShipSU :  number,
    horizonSetShipFU : null|boolean,
    horizonSetShipSU : null|boolean,
    deleteShipFU : boolean,
    deleteShipSU : boolean,
    settingShipUser:settingShipUserType,
    idTurn:number,
}


export type SaveTurnBattleMapType={
    BattleMap:initialStateBattleMapType
    IdTurn:number
}
/* export type HistoryType={
    savedState: [{
        ...stateReturn(state),
        history:[],
        idTurn: number
    }],
        idTurn: number
}*/
