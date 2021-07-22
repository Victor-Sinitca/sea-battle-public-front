import React, {FC, useEffect, useState} from "react";
import DeskThreeInLine, {MapsGameType} from "./DeskThreeInLine";
import {SectorGameType} from "./Sector/Sector";
import {isNearbyWithSector} from "./gameLogic/isNearbyWithSector";
import {SetIsFirstClickSector} from "./gameLogic/setIsFirstClickSector";
import s from "./ThreeInLine.module.css"
import {sectorsNotEqual} from "./gameLogic/sectorsNotEqual";
import {checkMap} from "./gameLogic/checkMap";
import {useDispatch, useSelector} from "react-redux";
import {
    boomEffectThink,
    checkMapThink,
    checkOnLineInSelectSectorsThink,
    endTurnThink,
    replacementSectorsThink,
    selectNewSectorThink,
    threeInLineAction,
    unselectNewSectorThink
} from "../../redux/threeInLine-reduser";
import {
    getDeskState,
    getIsBoom,
    getIsDevMode,
    getIsEndTurn,
    getPrevMap,
    getScore,
    getSelectSector
} from "../../redux/threeInLine-selectors";
import {Header3inLine} from "./Header3inLine/Header3inLine";


export type deskStateType = {
    x: number, y: number, length: number
}
type PropsType = {
    map: MapsGameType
    gemsCount: number
    animationCount:number
}
export const ThreeInLine: FC<PropsType> =  React.memo( ({map, gemsCount,animationCount}) => {
    const dispatch = useDispatch()
    const [endMove, setEndMove] = useState<boolean>(false)
    const deskState = useSelector(getDeskState)
    const prevMap = useSelector(getPrevMap)
    const score = useSelector(getScore)
    const isDevMode = useSelector(getIsDevMode)
    const selectSector = useSelector(getSelectSector)
    const isEndTurn = useSelector(getIsEndTurn)
    const isBoom = useSelector(getIsBoom)



    const onMouseDown = (sector: SectorGameType) => {
        if (!isEndTurn) {
            if (selectSector) {
                // есть выделенный сектор
                if (sector.sectorState.isSelected) {
                   /* console.log("onMouseDown - old sector selected ")*/
                    // если сектор был выделен  установка флага на снятие выделения
                    dispatch(threeInLineAction.setMap(SetIsFirstClickSector(map, sector)))
                } else if (isNearbyWithSector(selectSector, sector)) {
                   /* console.log("onMouseDown -isNearbyWithSector")*/
                    dispatch(checkOnLineInSelectSectorsThink(map, selectSector, sector, false))
                } else {
                   /* console.log("onMouseDown - new sector selected")*/
                    // выбран сектор не рядом выделение сектора
                    // удаление старого выдления, установка нового выделения
                    // запись карты
                    dispatch(replacementSectorsThink(map, sector, selectSector))
                    dispatch(threeInLineAction.setSelectSector(sector))
                }
            } else {
                /*console.log("onMouseDown -selectNewSectorThink")*/
                // выделение и сохранение выделенного сектора как  выделенный
                dispatch(selectNewSectorThink(map, sector))
            }
        }
    }
    const onMouseDownDev = (sector: SectorGameType) => {
        if (selectSector) {
            if (sector.sectorState.isSelected) {
                dispatch(threeInLineAction.setMap(SetIsFirstClickSector(map, sector)))
            } else {
                dispatch(checkOnLineInSelectSectorsThink(map, selectSector, sector, true))
            }
        } else if (map) {
            dispatch(selectNewSectorThink(map, sector))
        }

    }
    const onMouseUp = (sector: SectorGameType) => {
        if (sector.sectorState.isFirstClick && sector.sectorState.isSelected && !isEndTurn) {
            /*console.log("onMouseUp -unselectNewSectorThink")*/
            dispatch(unselectNewSectorThink(map, sector))
        }
    }
    const onMouseOver = (sector: SectorGameType) => {
        if (selectSector && !isEndTurn && sectorsNotEqual(sector, selectSector)) {
            if (isNearbyWithSector(selectSector, sector)) {
               /* console.log("onMouseOver -isNearbyWithSector")*/
                dispatch(checkOnLineInSelectSectorsThink(map, selectSector, sector, false))
            } else {
                /*console.log("onMouseOver -unselectNewSectorThink")*/
                dispatch(unselectNewSectorThink(map, selectSector))
            }
        }
    }

// уничтожение секторов
    useEffect(() => {
        if (!isDevMode) {
            /* console.log("boomFunc")*/
            if (isEndTurn && !isBoom && !animationCount) {
                /*  dispatch(boomEffectThink(map,gemsCount,score))*/
                setTimeout(() => {
                    /* console.log("boomFunc ==> is bum")*/
                    dispatch(boomEffectThink(map,gemsCount,score))
                   /* let boomFuncState = boomFunc1(map, gemsCount)
                    dispatch(threeInLineAction.setMap(boomFuncState.map))
                    dispatch(threeInLineAction.setAnimationCount(boomFuncState.animationsCount))
                    dispatch(threeInLineAction.setAddScore(boomFuncState.score))
                    dispatch(threeInLineAction.setScore(score + boomFuncState.score))
                    dispatch(threeInLineAction.setIsBoom(true))*/
                }, 200);
            } else {
                /*console.log("boomFunc ==> new turn")*/
                dispatch(threeInLineAction.setIsBoom(false))
            }
        }
    }, [/*dispatch,*/ isEndTurn, isBoom, animationCount,
        /*gemsCount, isDevMode*/])

// нахождение секторов для уничтожения
    useEffect(() => {
        /* console.log("checkMap")*/
        if (isBoom && !isDevMode ) {
            const newMap = checkMap(map)
            if (newMap.isBum){
                /* console.log("checkMap ==> isBum")  */
                dispatch(checkMapThink(newMap.map))
                /*dispatch(threeInLineAction.setMap(findBonusBumFunc(map)))
                dispatch(threeInLineAction.setIsBoom(false))*/
            } else {
                /*console.log("checkMap ==> new turn")*/
                dispatch(endTurnThink())
                /*dispatch(threeInLineAction.setIsEndTurn(false))
                dispatch(threeInLineAction.setIsBoom(false))*/
            }
        }
    }, [/*dispatch,*/ isBoom,
        isDevMode, /*map*/])


// проверка карты на возможность хода
    /* useEffect(() => {
         /!*console.log("checkMapOnMove")*!/
         if (!isEndTurn) {
             if (!checkMapOnMove(map)) {
                 setTimeout(() => {
                     /!* console.log("checkMapOnMove ==> init map")*!/
                     dispatch(threeInLineAction.setMap(initMapGame3inLine(deskState.x, deskState.y , gemsCount)))
                 }, 2000)
             }
         }
     }, [isEndTurn])
 */

    /* useEffect(() => {
         setEndMove(!checkMapOnMove(map))
     })*/


    return <div className={s.displayMap}>
        <div className={s.mainDisplay}>
            <Header3inLine map={map} setEndMove={setEndMove} gemsCount={gemsCount}/>
            <DeskThreeInLine userMap={map} selectSector={selectSector}
                             returnMouseDown={isDevMode ? onMouseDownDev : onMouseDown}
                             returnMouseUp={onMouseUp}
                             returnMouseOver={onMouseOver}
                             isEndTurn={isEndTurn}
                             deskState={deskState}
            />
            {endMove && <div>нет ходов</div>}
        </div>
        <div className={s.mainDisplay}>
            {isDevMode && prevMap && <>
                <div style={{height: 150}}></div>
                <div>
                    <DeskThreeInLine userMap={prevMap} selectSector={selectSector}
                                     returnMouseDown={isDevMode ? onMouseDownDev : onMouseDown}
                                     returnMouseUp={onMouseUp}
                                     returnMouseOver={onMouseOver}
                                     isEndTurn={isEndTurn}
                                     deskState={deskState}
                    />
                </div>
            </>}
        </div>
    </div>

})
