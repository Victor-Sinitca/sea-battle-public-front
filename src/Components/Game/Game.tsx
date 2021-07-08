import React, {FC, useEffect, useState} from "react";
import Desk, {MapsGameType} from "./DeskGame";
import {SectorGameType} from "./Sector";
import {isSectorInLine} from "./gameLogic/isSectorInLine";
import {isNearbyWithSector} from "./gameLogic/isNearbyWithSector";
import {replaceSectors} from "./gameLogic/replaceSectors";
import {deleteSectorSelection} from "./gameLogic/deleteSectorSelection";
import {selectSectorFunc} from "./gameLogic/selectSector";
import {SetIsFirstClickSector} from "./gameLogic/setIsFirstClickSector";
import {initMapGame3inLine} from "./gameLogic/initMapGame3inLine";
import {boomFunc} from "./gameLogic/boomFunc";
import {checkMapOnMove} from "./gameLogic/checkMapOnMove";
import {initMapGame3inLineFalseGame} from "./gameLogic/initMapGame3inLineFalseGame";
import s from "./Game.module.css"
import {sectorsNotEqual} from "./gameLogic/sectorsNotEqual";
import {findBonusBumFunc} from "./gameLogic/findBonusBumFunc";
import {checkMapUpdate} from "./gameLogic/checkMapUpdate";
import {blowUpSelectedSectors} from "./gameLogic/blowUpSelectedSectors";
import {blowUpAllMap} from "./gameLogic/blowUpAllMap";
import {blowUpCrosshair} from "./gameLogic/blowUpСrosshair";
import {blowUpBigCrosshair} from "./gameLogic/blowUpBigСrosshair";


export const Game: FC = () => {
    const [deskState, setDeskState] = useState({x: 10, y: 10, length: 50})
    const [map, setMap] = useState<MapsGameType>(initMapGame3inLine(deskState.x, deskState.y))
    const [prevMap, setPrevMap] = useState<MapsGameType>(initMapGame3inLine(deskState.x, deskState.y))
    const [selectSector, setSelectSector] = useState<SectorGameType | null>(null)
    const [isEndTurn, setIsEndTurn] = useState<boolean>(false)
    const [isBoom, setIsBoom] = useState<boolean>(false)
    const [endMove, setEndMove] = useState<boolean>(false)
    const [score, setScore] = useState(0)
    const [addScore, setAddScore] = useState(0)


    const [isDevMode, setIsDevMode] = useState(false)

    const onMouseDown = (sector: SectorGameType) => {
        if (!isEndTurn) {
            if (selectSector) {
                // есть выделенный сектор
                // клик рядом с выделеным сектором
                if (isNearbyWithSector(selectSector, sector)) {
                    //создание копии и перестановка секторов в новой карте
                    let sectorInMemory = JSON.parse(JSON.stringify(sector)) as SectorGameType
                    let selectSectorInMemory = JSON.parse(JSON.stringify(selectSector)) as SectorGameType
                    let newMap = replaceSectors(map, sectorInMemory, selectSectorInMemory)
                    let newMap1 = replaceSectors(newMap, selectSectorInMemory, sectorInMemory)
                    setSelectSector(null)
                    // выделен алмаз
                    if (selectSector.date.state === 8) {
                        // выделены два алмаза
                        if (sector.date.state === 8) {
                            setMap(blowUpAllMap(map))
                            setIsEndTurn(true)
                        } else {
                            setMap(blowUpSelectedSectors(map, selectSector, sector))
                            setIsEndTurn(true)
                        }
                    } else if (sector.date.state === 8) {
                        setMap(blowUpSelectedSectors(map, sector, selectSector))
                        setIsEndTurn(true)

                    } else if ((sector.date.bonusSector === 1 || sector.date.bonusSector === 2)
                        && (selectSector.date.bonusSector === 1 || selectSector.date.bonusSector === 2)) {
                        setMap(blowUpCrosshair(map, sector))
                        setIsEndTurn(true)
                    } else if (sector.date.bonusSector === 3 || sector.date.bonusSector === 3) {
                        setMap(blowUpBigCrosshair(map, sector))
                        setIsEndTurn(true)
                    } else {
                        //нет двух бонусных секторов в выделении
                        const isLineInMap = isSectorInLine(newMap1, sectorInMemory, selectSectorInMemory)
                        // есть комбинация из трех и более
                        if (isLineInMap) {
                            /*console.log("onMouseDown isLineInMap")*/
                            //проверяем на бонусные сектора в секторах для взрыва
                            setMap(findBonusBumFunc(isLineInMap))
                            /* setMap(isLineInMap)*/
                            setIsEndTurn(true)
                        } else {
                            // нет комбинаций из трех и более, снятие выделения
                            setMap(deleteSectorSelection(map, selectSector))
                        }
                    }
                } else if (sector.sectorState.isSelected) {
                    // если сектор был выделен  установка флага на снятие выделения
                    setMap(SetIsFirstClickSector(map, sector))
                } else {
                    // выбран сектор не рядомб выделение сектора
                    let newMap = selectSectorFunc(map, sector)
                    // удаление старого выдления
                    newMap = deleteSectorSelection(newMap, selectSector)
                    //запись карты
                    setMap(newMap)
                    // установка выбранного сектора
                    setSelectSector(sector)
                }
            } else {
                // сохранение выделенного сектора
                setMap(selectSectorFunc(map, sector))
                setSelectSector(sector)
            }
        }
    }

    const onMouseDownDev = (sector: SectorGameType) => {
        if (selectSector) {
            if (sector.sectorState.isSelected) {
                setMap(SetIsFirstClickSector(map, sector))
            } else {
                let sectorInMemory = JSON.parse(JSON.stringify(sector)) as SectorGameType
                let selectSectorInMemory = JSON.parse(JSON.stringify(selectSector)) as SectorGameType
                let newMap = replaceSectors(map, sectorInMemory, selectSectorInMemory)
                let newMap1 = replaceSectors(newMap, selectSectorInMemory, sectorInMemory)
                setSelectSector(null)
                if (selectSector.date.state === 8) {
                    if (sector.date.state === 8) {
                        setMap(blowUpAllMap(map))
                    } else {
                        setMap(blowUpSelectedSectors(map, selectSector, sector))
                    }
                } else if (sector.date.state === 8) {
                    setMap(blowUpSelectedSectors(map, sector, selectSector))
                } else if ((sector.date.bonusSector === 1 || sector.date.bonusSector === 2)
                    && (selectSector.date.bonusSector === 1 || selectSector.date.bonusSector === 2)) {
                    setMap(blowUpCrosshair(map, sector))
                } else if (sector.date.bonusSector === 3 || sector.date.bonusSector === 3) {
                    setMap(blowUpBigCrosshair(map, sector))
                } else {
                    const isLineInMap = isSectorInLine(newMap1, sectorInMemory, selectSectorInMemory)
                    if (isLineInMap) {
                        setMap(findBonusBumFunc(isLineInMap))
                    } else {
                        setMap(newMap1)
                    }
                }
            }
        } else {
            setMap(selectSectorFunc(map, sector))
            setSelectSector(sector)
        }

    }
    const onMouseUp = (sector: SectorGameType) => {
        if (sector.sectorState.isFirstClick && sector.sectorState.isSelected && !isEndTurn) {
            setMap(deleteSectorSelection(map, sector))
            setSelectSector(null)
        }
    }
    const onMouseOver = (sector: SectorGameType) => {
        if (selectSector && !isEndTurn && sectorsNotEqual(sector, selectSector)) {
            if (isNearbyWithSector(selectSector, sector)) {
                let sectorInMemory = JSON.parse(JSON.stringify(sector)) as SectorGameType
                let selectSectorInMemory = JSON.parse(JSON.stringify(selectSector)) as SectorGameType
                let newMap = replaceSectors(map, sectorInMemory, selectSectorInMemory)
                let newMap1 = replaceSectors(newMap, selectSectorInMemory, sectorInMemory)
                setSelectSector(null)
                const isLineInMap = isSectorInLine(newMap1, sectorInMemory, selectSectorInMemory)
                if (isLineInMap) {
                    setMap(findBonusBumFunc(isLineInMap))
                    /* setMap(isLineInMap)*/
                    setIsEndTurn(true)
                } else {
                    setMap(deleteSectorSelection(map, selectSector))
                }
            } else {
                setMap(deleteSectorSelection(map, selectSector))
                setSelectSector(null)
            }
        }
    }


    const onClickBum = () => {
        setPrevMap(JSON.parse(JSON.stringify(map)))
        let boomFuncState = boomFunc(map)
        setMap(boomFuncState.map)
        setAddScore(boomFuncState.score)
        setScore(score + boomFuncState.score)
        setIsEndTurn(false)
    }
    const onClickFindBonus = () => {
        setPrevMap(JSON.parse(JSON.stringify(map)))
        setMap(findBonusBumFunc(map))
    }
    const onClickCheckIsBum = () => {
        const newMap = checkMapUpdate(map)
        if (newMap.isBum) {
            setPrevMap(JSON.parse(JSON.stringify(map)))
            setMap(newMap.map)
        }
    }

    const newMap = () => {
        if (!checkMapOnMove(map)) {
            setMap(initMapGame3inLine(deskState.x, deskState.y))
            setEndMove(false)
        }
    }
    const setMapOnClick = () => {
        setMap(initMapGame3inLineFalseGame(10, 10))
    }

    const addLine = (value: "x" | "y" | "length") => {
        let x = deskState[value] as number
        setDeskState({
            ...deskState, [value]: x + 1
        })
        setMap(initMapGame3inLine(
            value === "x" ? deskState.x + 1 : deskState.x,
            value === "y" ? deskState.y + 1 : deskState.y
        ))
    }
    const takeAwayLine = (value: "x" | "y" | "length") => {
        if (deskState[value] > 5) {
            let x = deskState[value] as number
            setDeskState({
                ...deskState, [value]: x - 1
            })
            setMap(initMapGame3inLine(
                value === "x" ? deskState.x - 1 : deskState.x,
                value === "y" ? deskState.y - 1 : deskState.y
            ))
        }
    }
    const changeSizeSector = (add: boolean) => {
        if (add) {
            setDeskState({
                ...deskState, length: deskState.length + 1
            })
        } else if (deskState.length > 10) {
            setDeskState({
                ...deskState, length: deskState.length - 1
            })
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
                    setMap(boomFuncState.map)
                    setAddScore(boomFuncState.score)
                    setScore(score + boomFuncState.score)
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
            const newMap = checkMapUpdate(map)
            if (newMap.isBum) {
                console.log("checkMap ==> isBum")
                /*setMap(newMap.map)
                setMap(findBonusBumFunc(map))*/

                setMap(findBonusBumFunc(map))
                setIsBoom(false)
            } else {
                /*console.log("checkMap ==> new turn")*/
                setIsEndTurn(false)
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
                    setMap(initMapGame3inLine(deskState.x, deskState.y))
                    /* setEndMove(true)*/
                }, 1000)
            }
        }
    }, [isEndTurn])


    return <div className={s.displayMap}>
        <div>
            <div>
                <div> по вертикали:
                    <div>
                        <button onClick={() => {
                            addLine("x")
                        }}>+
                        </button>
                        <button onClick={() => {
                            takeAwayLine("x")
                        }}>-
                        </button>

                    </div>

                </div>
                <div> по горизонтали:
                    <div>
                        <button onClick={() => {
                            addLine("y")
                        }}>+
                        </button>
                        <button onClick={() => {
                            takeAwayLine("y")
                        }}>-
                        </button>
                    </div>

                </div>
                <div> маштаб:
                    <div>
                        <button onClick={() => {
                            changeSizeSector(true)
                        }}>+
                        </button>
                        <button onClick={() => {
                            changeSizeSector(false)
                        }}>-
                        </button>
                    </div>

                </div>
            </div>
            <div>
                <div>очки:</div>
                <div>{score}</div>
                <div>+{addScore}</div>
            </div>
            <div>
                <div style={{paddingTop: 40, paddingBottom: 40}}>
                    <button onClick={() => setIsDevMode(!isDevMode)}>установка режима</button>
                </div>
                {isDevMode && <>
                    <div>
                        <button onClick={onClickCheckIsBum}>check is bum</button>
                    </div>
                    <div>
                        <button onClick={onClickFindBonus}>find bonus</button>
                    </div>
                    <div>
                        <button onClick={onClickBum}>bum</button>
                    </div>
                    {/*  <button onClick={newMap}>new map</button>*/}
                    {/*  <button onClick={setMapOnClick}>set map</button>*/}

                </>}


            </div>
        </div>


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
            {isDevMode && <>
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
