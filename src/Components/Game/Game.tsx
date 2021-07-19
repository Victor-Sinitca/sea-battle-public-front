import React, {FC, useEffect, useState} from "react";
import Desk, {MapsGameType} from "./DeskGame";
import {SectorGameType} from "./Sector/Sector";
import {isNearbyWithSector} from "./gameLogic/isNearbyWithSector";
import {SetIsFirstClickSector} from "./gameLogic/setIsFirstClickSector";
import s from "./Game.module.css"
import {sectorsNotEqual} from "./gameLogic/sectorsNotEqual";
import {findBonusBumFunc} from "./gameLogic/findBonusBumFunc";
import {checkMap} from "./gameLogic/checkMap";
import {LeftBar3inLine} from "./LeftBar3inLine";
import {useDispatch, useSelector} from "react-redux";
import {
    checkOnLineInSelectSectorsThink,
    replacementSectorsThink,
    selectNewSectorThink,
    threeInLineAction,
    unselectNewSectorThink
} from "../../redux/threeInLine-reduser";
import {
    getAnimationCount,
    getDeskState,
    getIsBoom,
    getIsDevMode,
    getIsEndTurn,
    getPrevMap,
    getScore,
    getSelectSector
} from "../../redux/threeInLine-selectors";
import {boomFunc1} from "./gameLogic/boomFunc1";
import {Header3inLine} from "./Header3inLine";


export type deskStateType = {
    x: number, y: number, length: number
}
type PropsType = {
    map: MapsGameType
    gemsCount: number
}
export const Game: FC<PropsType> = ({map, gemsCount}) => {
    const dispatch = useDispatch()
    const [endMove, setEndMove] = useState<boolean>(false)
    const deskState = useSelector(getDeskState)
    const prevMap = useSelector(getPrevMap)
    const score = useSelector(getScore)
    const isDevMode = useSelector(getIsDevMode)
    const selectSector = useSelector(getSelectSector)
    const isEndTurn = useSelector(getIsEndTurn)
    const isBoom = useSelector(getIsBoom)
    const animationCount = useSelector(getAnimationCount)


    const onMouseDown = (sector: SectorGameType) => {
        if (!isEndTurn) {
            if (selectSector) {
                // есть выделенный сектор
                if (sector.sectorState.isSelected) {
                    // если сектор был выделен  установка флага на снятие выделения
                    dispatch(threeInLineAction.setMap(SetIsFirstClickSector(map, sector)))
                } else if (isNearbyWithSector(selectSector, sector)) {
                    dispatch(checkOnLineInSelectSectorsThink(map, selectSector, sector, false))
                } else {
                    // выбран сектор не рядом выделение сектора
                    // удаление старого выдления, установка нового выделения
                    // запись карты
                    dispatch(replacementSectorsThink(map, sector, selectSector))
                    dispatch(threeInLineAction.setSelectSector(sector))
                }
            } else {
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
            dispatch(unselectNewSectorThink(map, sector))
        }
    }
    const onMouseOver = (sector: SectorGameType) => {
        if (selectSector && !isEndTurn && sectorsNotEqual(sector, selectSector)) {
            if (isNearbyWithSector(selectSector, sector)) {
                dispatch(checkOnLineInSelectSectorsThink(map, selectSector, sector, false))
            } else {
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
                    let boomFuncState = boomFunc1(map, gemsCount)
                    dispatch(threeInLineAction.setMap(boomFuncState.map))
                    dispatch(threeInLineAction.setAnimationCount(boomFuncState.animationsCount))
                    dispatch(threeInLineAction.setAddScore(boomFuncState.score))
                    dispatch(threeInLineAction.setScore(score + boomFuncState.score))
                    dispatch(threeInLineAction.setIsBoom(true))
                }, 200);
            } else {
                /*console.log("boomFunc ==> new turn")*/
                dispatch(threeInLineAction.setIsBoom(false))
            }
        }
    }, [dispatch, isEndTurn, isBoom, animationCount,
        /*map,*/gemsCount, isDevMode])

// нахождение секторов для уничтожения
    useEffect(() => {
        /* console.log("checkMap")*/
        if (isBoom && !isDevMode) {
            const newMap = checkMap(map)
            if (newMap.isBum) {
                /* console.log("checkMap ==> isBum")  */
                dispatch(threeInLineAction.setMap(findBonusBumFunc(map)))
                dispatch(threeInLineAction.setIsBoom(false))
            } else {
                /*console.log("checkMap ==> new turn")*/
                dispatch(threeInLineAction.setIsEndTurn(false))
                dispatch(threeInLineAction.setIsBoom(false))
            }
        }
    }, [dispatch, isBoom,
        isDevMode, map])


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
            <Desk userMap={map} selectSector={selectSector}
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
                <div style={{height: 90}}></div>
                <div>
                    <Desk userMap={prevMap} selectSector={selectSector}
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

}
