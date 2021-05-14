import {
    initializeTheMapFunction,
    initializeTheUserShipsFunction
} from "../initializeTheMapFunction/initializeTheMapFunction";
import {initialStateBattleMapType} from "../../../redux/battleMap-reduсer";
import {stateReturnType} from "../../../../Types/Types";



export const initialUserState=(state:initialStateBattleMapType):stateReturnType=>{
    return {
        FUMap: initializeTheMapFunction(state.FUMap),
        SUMap: initializeTheMapFunction(state.SUMap),
        FUShips: initializeTheUserShipsFunction(),
        SUShips: initializeTheUserShipsFunction(),
        comp:{
            game : true,
            damaged : false,
            hit : false,
            sectorFire : [],
        },
        FUTurn:{
            turn:true
        },
        lookSecondUser : false,
        whatSetShipFU : 0,
        whatSetShipSU : 0,
        horizonSetShipFU : null,
        horizonSetShipSU : null,
        deleteShipFU : false,
        deleteShipSU : false,
        settingShipUser:{
            secondUser : true,
            firstUser : true,
        },
        idTurn: 0,
    }
}

/*export const initialUserState = (state:initialStateBattleMapType):initialStateBattleMapType => {
    return {
        ...stateReturn(state),
    }
}*/
