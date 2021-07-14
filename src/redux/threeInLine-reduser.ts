import {BaseActionType, InferActionsTypes} from "./redux-store";
import {MapsGameType} from "../Components/Game/DeskGame";
import {deskStateType} from "../Components/Game/Game";
import {Dispatch} from "redux";
import {SectorGameType} from "../Components/Game/Sector/Sector";
import {replaceSectors} from "../Components/Game/gameLogic/replaceSectors";
import {isSectorInLine} from "../Components/Game/gameLogic/isSectorInLine";
import {findBonusBumFunc} from "../Components/Game/gameLogic/findBonusBumFunc";
import {deleteSectorSelection} from "../Components/Game/gameLogic/deleteSectorSelection";
import {selectSectorFunc} from "../Components/Game/gameLogic/selectSector";
import {
    blowUpAllMap,
    blowUpBigCrosshair,
    blowUpCrosshair,
    blowUpSelectedSectors
} from "../Components/Game/gameLogic/blowUpFunc";
import {boomFunc1} from "../Components/Game/gameLogic/boomFunc1";


let initialState = {
    map: null as null | MapsGameType,
    deskState: {x: 10 as number, y: 10 as number, length: 50 as number},
    gemsCount: 5 as number,
    prevMap: null as null | MapsGameType,
    score: 0 as number,
    addScore: 0 as number,
    isDevMode: false as boolean,
    selectSector: null as null | SectorGameType,
    isEndTurn: false as boolean,
    isBoom: false as boolean

}

type initialStateType = typeof initialState
const threeInLineReducer = (state = initialState as initialStateType, action: ActionType): initialStateType => {
    switch (action.type) {
        case "threeInLine_SET_ADD_SCORE":
            return {
                ...state,
                addScore: action.addScore
            }
        case "threeInLine_SET_DESK_STATE":
            return {
                ...state,
                deskState: action.deskState
            }
        case "threeInLine_SET_IS_DEV_MODE":
            return {
                ...state,
                isDevMode: action.devMode
            }
        case "threeInLine_SET_MAP":
            return {
                ...state,
                map: action.map
            }
        case "threeInLine_SET_PREV_MAP":
            return {
                ...state,
                prevMap: action.map
            }
        case "threeInline_SET_SCORE":
            return {
                ...state,
                score: action.score
            }
        case "threeInLine_SET_SELECT_SECTOR":
            return {
                ...state,
                selectSector: action.sector
            }
        case "threeInLine_SET_IS_END_TURN":
            return {
                ...state,
                isEndTurn: action.IsEndTurn
            }
        case "threeInLine_SET_IS_BUM":
            return {
                ...state,
                isBoom: action.value
            }
        case "threeInLine_DELETE_ANIMATION_IN_SECTOR":
            if (state.map) {
                console.log("DELETE_ANIMATION_IN_SECTOR")
                let copyState = {...state}
                copyState.map = [...state.map]
                copyState.map[action.i] = [...state.map[action.i]]
                copyState.map[action.i][action.j] = {...state.map[action.i][action.j]}
                copyState.map[action.i][action.j].sectorState = {...state.map[action.i][action.j].sectorState}
                copyState.map[action.i][action.j].sectorState.animateMove = null
                return copyState
            } else return state
        case "threeInLine_SET_GEMS_COUNT":
            if (action.count > 3 && action.count < 9) {
                return {
                    ...state,
                    gemsCount: action.count
                }
            } else return state;
        default:
            return state;
    }
}

type DispatchType = Dispatch<ActionType>
type ActionType = InferActionsTypes<typeof threeInLineAction>
export const threeInLineAction = {
    setIsDevMode: (devMode: boolean,) => {
        return ({type: "threeInLine_SET_IS_DEV_MODE", devMode,} as const)
    },
    setMap: (map: MapsGameType) => {
        return ({type: "threeInLine_SET_MAP", map,} as const)
    },
    setPrevMap: (map: MapsGameType) => {
        return ({type: "threeInLine_SET_PREV_MAP", map,} as const)
    },
    setScore: (score: number) => {
        return ({type: "threeInline_SET_SCORE", score,} as const)
    },
    setAddScore: (addScore: number) => {
        return ({type: "threeInLine_SET_ADD_SCORE", addScore,} as const)
    },
    setDeskState: (deskState: deskStateType) => {
        return ({type: "threeInLine_SET_DESK_STATE", deskState,} as const)
    },
    setSelectSector: (sector: SectorGameType | null) => {
        return ({type: "threeInLine_SET_SELECT_SECTOR", sector,} as const)
    },
    setIsEndTurn: (IsEndTurn: boolean) => {
        return ({type: "threeInLine_SET_IS_END_TURN", IsEndTurn,} as const)
    },
    setGemsCount: (count: number) => {
        return ({type: "threeInLine_SET_GEMS_COUNT", count,} as const)
    },
    setIsBoom: (value: boolean) => {
        return ({type: "threeInLine_SET_IS_BUM", value,} as const)
    },
    deleteAnimationInSector: (i: number, j: number) => {
        return ({type: "threeInLine_DELETE_ANIMATION_IN_SECTOR", i, j} as const)
    },


}

export const selectNewSectorThink = (map: MapsGameType, sector: SectorGameType) => {
    return (dispatch: DispatchType) => {
        dispatch(threeInLineAction.setMap(selectSectorFunc(map, sector)))
        dispatch(threeInLineAction.setSelectSector(sector))
    }
}
export const unselectNewSectorThink = (map: MapsGameType, sector: SectorGameType) => {
    return (dispatch: DispatchType) => {
        dispatch(threeInLineAction.setMap(deleteSectorSelection(map, sector)))
        dispatch(threeInLineAction.setSelectSector(null))
    }
}
export const replacementSectorsThink = (Map: MapsGameType, sector: SectorGameType, selectSector: SectorGameType) => {
    return (dispatch: DispatchType) => {
        let map = selectSectorFunc(Map, sector)
        dispatch(threeInLineAction.setMap(deleteSectorSelection(map, selectSector)))
        dispatch(threeInLineAction.setSelectSector(sector))
        dispatch(threeInLineAction.setSelectSector(null))
    }
}
export const boomEffectThink = (map: MapsGameType, gemsCount: number, score: number) => {
    return async (dispatch: DispatchType) => {
        await setTimeout(() => {
            /* console.log("boomFunc ==> is bum")*/
            let boomFuncState = boomFunc1(map, gemsCount)
            dispatch(threeInLineAction.setMap(boomFuncState.map))
            dispatch(threeInLineAction.setAddScore(boomFuncState.score))
            dispatch(threeInLineAction.setScore(score + boomFuncState.score))
        }, 1500);
        dispatch(threeInLineAction.setIsBoom(true))
    }
}
const setHandleAnimation = (Map: MapsGameType, sector1: SectorGameType, sector2: SectorGameType, isLine: boolean,) => {
    let map = [...Map]
    map[sector1.sectorState.y][sector1.sectorState.x].sectorState.animateMove = {
        j: sector2.sectorState.x - sector1.sectorState.x,
        i: sector2.sectorState.y - sector1.sectorState.y,
        shift: isLine,
        isMove: isLine

    }
    map[sector2.sectorState.y][sector2.sectorState.x].sectorState.animateMove = {
        j: sector1.sectorState.x - sector2.sectorState.x,
        i: sector1.sectorState.y - sector2.sectorState.y,
        shift: isLine,
        isMove: isLine
    }
}


export const checkOnLineInSelectSectorsThink = (Map: MapsGameType, selectSector: SectorGameType, sector: SectorGameType, isDevMode = false) => {
    return (dispatch: DispatchType) => {
        // клик рядом с выделеным сектором
        let map = [...Map]
        dispatch(threeInLineAction.setSelectSector(null))
        if (selectSector.date.state === 8) {
            // выделен алмаз
            if (sector.date.state === 8) {
                // выделены два алмаза
                map = blowUpAllMap(map)
                !isDevMode && dispatch(threeInLineAction.setIsEndTurn(true))
            } else {
                map = blowUpSelectedSectors(map, selectSector, sector)
                !isDevMode && dispatch(threeInLineAction.setIsEndTurn(true))
            }
        } else if (sector.date.state === 8) {
            // рядом алмаз
            map = blowUpSelectedSectors(map, sector, selectSector)
            !isDevMode && dispatch(threeInLineAction.setIsEndTurn(true))
        } else if ((sector.date.bonusSector === 1 || sector.date.bonusSector === 2)
            && (selectSector.date.bonusSector === 1 || selectSector.date.bonusSector === 2)) {
            // рядом два бонусных сектора по вертикали и или по горизонтали
            map = blowUpCrosshair(map, sector)
            !isDevMode && dispatch(threeInLineAction.setIsEndTurn(true))
        } else if (sector.date.bonusSector === 3 && selectSector.date.bonusSector === 3) {
            //рядом два бонусных сектора в+г
            map = blowUpBigCrosshair(map, sector)
            !isDevMode && dispatch(threeInLineAction.setIsEndTurn(true))
        } else if ((sector.date.bonusSector === 3 && (selectSector.date.bonusSector === 1 || selectSector.date.bonusSector === 2))
            || (selectSector.date.bonusSector === 3 && (sector.date.bonusSector === 1 || sector.date.bonusSector === 2))) {
            //рядом бонусный сектор в+г и бонусный сектор верт или гориз
            map = blowUpCrosshair(blowUpCrosshair(map, sector), selectSector)
            !isDevMode && dispatch(threeInLineAction.setIsEndTurn(true))
        } else {
            //нет двух бонусных секторов или алмаза/ов  в секторах для замены
            //создание копий и перестановка секторов в новой карте
            let sectorInMemory = JSON.parse(JSON.stringify(sector)) as SectorGameType
            let selectSectorInMemory = JSON.parse(JSON.stringify(selectSector)) as SectorGameType
            let newMap = replaceSectors(map, selectSectorInMemory, sectorInMemory)
            const isLineInMap = isSectorInLine(newMap, sectorInMemory, selectSectorInMemory)
            // есть комбинация из трех и более
            if (isLineInMap) {
                /*console.log("onMouseDown isLineInMap")*/
                //проверяем на бонусные сектора в секторах для взрыва
                map = findBonusBumFunc(isLineInMap)
                setHandleAnimation(map,sectorInMemory,selectSectorInMemory,true)
                //установка конца хода
                !isDevMode && dispatch(threeInLineAction.setIsEndTurn(true))
            } else {
                // нет комбинаций из трех и более, снятие выделения
                if (isDevMode) {
                    map = newMap
                } else {
                    /*console.log("deleteSectorSelection")*/
                    map = deleteSectorSelection(map, selectSector)
                    setHandleAnimation(map,sectorInMemory,selectSectorInMemory,false)
                }
            }
        }
        dispatch(threeInLineAction.setMap(map))
    }
}


type ThunkActionType = BaseActionType<ActionType>


export default threeInLineReducer;


