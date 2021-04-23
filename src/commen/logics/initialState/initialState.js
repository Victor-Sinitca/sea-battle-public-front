import {initializeTheMapFunction} from "../initializeTheMapFunction/initializeTheMapFunction";

const stateReturn=(state)=>{
    return {
        FUMap: initializeTheMapFunction(state.FUMap),
        SUMap: initializeTheMapFunction(state.SUMap),
        FUShips: {
            ship1: 4,
            ship2: 3,
            ship3: 2,
            ship4: 1,
            numberShips1: 4,
            numberShips2: 3,
            numberShips3: 2,
            numberShips4: 1,
        },
        SUShips: {
            ship1: 4,
            ship2: 3,
            ship3: 2,
            ship4: 1,
            numberShips1: 4,
            numberShips2: 3,
            numberShips3: 2,
            numberShips4: 1,
        },
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
    }
}

export const initialUserState = (state) => {
    return {
        ...stateReturn(state),
        history:{
            savedState: [{
                ...stateReturn(state),
                history:[],
                idTurn: 0
            }],
            idTurn: 1
        }
    }
}

export const saveUserState = (state,id=1) => {
    let stateCopy = {...state}
    stateCopy.history={...state.history}
    if (id === 4) {
        stateCopy.history.savedState.splice(1, 1)
        stateCopy.history.savedState.push(JSON.parse(JSON.stringify(stateCopy)))
        stateCopy.history.idTurn = stateCopy.history.savedState.length
    } else {
        stateCopy.history.savedState.splice(id,stateCopy.history.savedState.length-id)

        //stateCopy.history.savedState.length=id+1



        stateCopy.history.savedState.push(JSON.parse(JSON.stringify(stateCopy)))
        ++stateCopy.history.idTurn
    }
    return stateCopy
}

export const loadUserState = (state, id) => {
    let stateCopy = JSON.parse(JSON.stringify(state.history.savedState[id]))
    stateCopy.history = {...state.history}
    stateCopy.history.idTurn=id+1

    return stateCopy
}
