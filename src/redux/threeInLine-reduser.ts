import {BaseActionType, InferActionsTypes} from "./redux-store";
import {MapsGameType} from "../Components/Game/DeskGame";
import {deskStateType} from "../Components/Game/Game";
import {Dispatch} from "redux";
import {SectorGameType} from "../Components/Game/Sector";
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


let initialState = {
    map: null as null | MapsGameType,
    deskState: {x: 10 as number, y: 10 as number, length: 50 as number},
    gemsCount : 5 as number,
    prevMap: null as null | MapsGameType,
    score: 0 as number,
    addScore: 0 as number,
    isDevMode: false as boolean,
    selectSector: null as null | SectorGameType,
    isEndTurn: false as boolean
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
        case "threeInLine_SET_GEMS_COUNT":
            if (action.count > 3 && action.count < 9){
                return {
                    ...state,
                    gemsCount: action.count
                }
            }else return state;
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
            map = blowUpCrosshair(blowUpCrosshair(map, sector ), selectSector )
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
                //установка конца хода
                !isDevMode && dispatch(threeInLineAction.setIsEndTurn(true))
            } else {
                // нет комбинаций из трех и более, снятие выделения
                if (isDevMode) {
                    map = newMap
                } else {
                    console.log("deleteSectorSelection")
                    map = deleteSectorSelection(map, selectSector)
                }
            }
        }
        dispatch(threeInLineAction.setMap(findBonusBumFunc(map)))
    }
}


type ThunkActionType = BaseActionType<ActionType>


export default threeInLineReducer;


