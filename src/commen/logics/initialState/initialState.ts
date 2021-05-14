import {
    initializeTheMapFunction,
    initializeTheUserShipsFunction
} from "../initializeTheMapFunction/initializeTheMapFunction";
import {initialStateBattleMapType} from "../../../redux/battleMap-reduсer";
import {stateReturnType} from "../../../../Types/Types";



const stateReturn=(state:initialStateBattleMapType):stateReturnType=>{
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
        whatSetShipFU : null,
        whatSetShipSU : null,
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

export const initialUserState = (state:initialStateBattleMapType):initialStateBattleMapType => {
    return {
        ...stateReturn(state),
    }
}
