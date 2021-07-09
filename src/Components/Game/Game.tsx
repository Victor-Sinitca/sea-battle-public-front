import React, {FC, useEffect, useState} from "react";
import Desk, {MapsGameType} from "./DeskGame";
import {SectorGameType} from "./Sector";
import {isNearbyWithSector} from "./gameLogic/isNearbyWithSector";
import {SetIsFirstClickSector} from "./gameLogic/setIsFirstClickSector";
import {initMapGame3inLine} from "./gameLogic/initMapGame3inLine";
import {boomFunc} from "./gameLogic/boomFunc";
import {checkMapOnMove} from "./gameLogic/checkMapOnMove";
import s from "./Game.module.css"
import {sectorsNotEqual} from "./gameLogic/sectorsNotEqual";
import {findBonusBumFunc} from "./gameLogic/findBonusBumFunc";
import {checkMap} from "./gameLogic/checkMap";
import {LeftBar3inLine} from "./gameLogic/LeftBar3inLine";
import {useDispatch, useSelector} from "react-redux";
import {
    checkOnLineInSelectSectorsThink, replacementSectorsThink,
    selectNewSectorThink,
    threeInLineAction,
    unselectNewSectorThink
} from "../../redux/threeInLine-reduser";
import {
    getDeskState,
    getIsDevMode,
    getIsEndTurn,
    getPrevMap,
    getScore,
    getSelectSector
} from "../../redux/threeInLine-selectors";


export type deskStateType = {
    x: number, y: number, length: number
}
type PropsType ={
    map: MapsGameType
}
export const Game: FC<PropsType> = ({map}) => {
    const dispatch = useDispatch()
    const [isBoom, setIsBoom] = useState<boolean>(false)
    const [endMove, setEndMove] = useState<boolean>(false)
    const deskState = useSelector(getDeskState)
    const prevMap = useSelector(getPrevMap)
    const score = useSelector(getScore)
    const isDevMode = useSelector(getIsDevMode)
    const selectSector = useSelector(getSelectSector)
    const isEndTurn = useSelector(getIsEndTurn)



    const onMouseDown = (sector: SectorGameType) => {
        if (!isEndTurn) {
            if (selectSector) {
                // есть выделенный сектор
                if (sector.sectorState.isSelected) {
                    // если сектор был выделен  установка флага на снятие выделения
                    dispatch(threeInLineAction.setMap(SetIsFirstClickSector(map, sector)))
                } else if (isNearbyWithSector(selectSector, sector)) {
                    dispatch(checkOnLineInSelectSectorsThink(map, selectSector, sector,))
                } else {
                    // выбран сектор не рядом выделение сектора
                    // удаление старого выдления, установка нового выделения
                    // запись карты
                    dispatch(replacementSectorsThink(map, sector,selectSector))
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
        } else if(map) {
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
                dispatch(checkOnLineInSelectSectorsThink(map, selectSector, sector,))
            } else {
                dispatch(unselectNewSectorThink(map, selectSector))
            }
        }
    }

// уничтожение секторов
    useEffect(() => {
        if (!isDevMode) {
            /* console.log("boomFunc")*/
            setTimeout(() => {
                if (isEndTurn && !isBoom) {
                    /* console.log("boomFunc ==> is bum")*/
                    let boomFuncState = boomFunc(map)
                    dispatch(threeInLineAction.setMap(boomFuncState.map))
                    dispatch(threeInLineAction.setAddScore(boomFuncState.score))
                    dispatch(threeInLineAction.setScore(score + boomFuncState.score))
                    setIsBoom(true)
                } else {
                    /*console.log("boomFunc ==> new turn")*/
                    setIsBoom(false)
                }
            }, 800);
        }

    }, [isEndTurn, isBoom])

// нахождение секторов для уничтожения
    useEffect(() => {
        /* console.log("checkMap")*/
        if (isBoom && !isDevMode) {
            const newMap = checkMap(map)
            if (newMap.isBum) {
               /* console.log("checkMap ==> isBum")  */
                dispatch(threeInLineAction.setMap(findBonusBumFunc(map)))
                setIsBoom(false)
            } else {
                /*console.log("checkMap ==> new turn")*/
                dispatch(threeInLineAction.setIsEndTurn(false))
                setIsBoom(false)
            }
        }
    }, [isBoom])

// проверка карты на возможность хода
    useEffect(() => {
        /*console.log("checkMapOnMove")*/
        if (!isEndTurn) {
            if (!checkMapOnMove(map)) {
                setTimeout(() => {
                    /* console.log("checkMapOnMove ==> init map")*/
                    dispatch(threeInLineAction.setMap(initMapGame3inLine(deskState.x, deskState.y)))
                }, 1000)
            }
        }
    }, [isEndTurn])



    return <div className={s.displayMap}>
        <LeftBar3inLine map ={map} setEndMove={setEndMove}/>
        <div className={s.mainDisplay}>
            <div style={{display: "grid"}}>
                <div className={s.header}>
                    {isDevMode ? <>режим: РАЗРАБОТЧИК</> : <>режим: ИГРА</>}
                </div>
                <div className={s.header}>
                    {isEndTurn
                        ? <>ждите</>
                        : <>ваш ход</>}
                </div>
            </div>
            <div>
                <Desk userMap={map} selectSector={selectSector}
                      returnMouseDown={isDevMode ? onMouseDownDev : onMouseDown}
                      returnMouseUp={onMouseUp}
                      returnMouseOver={onMouseOver}
                      isEndTurn={isEndTurn}
                      deskState={deskState}
                />
                {endMove && <div>нет ходов</div>}
            </div>

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
