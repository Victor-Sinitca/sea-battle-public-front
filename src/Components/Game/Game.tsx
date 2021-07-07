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
import {checkMap} from "./gameLogic/checkMap";
import {checkMapOnMove} from "./gameLogic/checkMapOnMove";
import {initMapGame3inLineFalseGame} from "./gameLogic/initMapGame3inLineFalseGame";
import s from "./Game.module.css"
import {sectorsNotEqual} from "./gameLogic/sectorsNotEqual";
import {checkMapUpdate} from "./gameLogic/checkMapUpdate";


export const Game: FC = () => {
    const [deskState, setDeskState] = useState({x: 10, y: 10, length: 50})
    const [map, setMap] = useState<MapsGameType>(initMapGame3inLine(deskState.x, deskState.y))
    const [selectSector, setSelectSector] = useState<SectorGameType | null>(null)
    const [isEndTurn, setIsEndTurn] = useState<boolean>(false)
    const [isBoom, setIsBoom] = useState<boolean>(false)
    const [endMove, setEndMove] = useState<boolean>(false)
    const [score, setScore] = useState(0)


    const onMouseDown = (sector: SectorGameType) => {
        if (!isEndTurn) {
            if (selectSector) {
                if (isNearbyWithSector(selectSector, sector)) {
                    let sectorInMemory = JSON.parse(JSON.stringify(sector)) as SectorGameType
                    let selectSectorInMemory = JSON.parse(JSON.stringify(selectSector)) as SectorGameType
                    let newMap = replaceSectors(map, sectorInMemory, selectSectorInMemory)
                    let newMap1 = replaceSectors(newMap, selectSectorInMemory, sectorInMemory)
                    setSelectSector(null)
                    const isLineInMap = isSectorInLine(newMap1, sectorInMemory, selectSectorInMemory)
                    if (isLineInMap) {
                        setMap(isLineInMap)
                        setIsEndTurn(true)
                    } else {
                        setMap(deleteSectorSelection(map, selectSector))
                    }
                } else if (sector.sectorState.isSelected) {
                    setMap(SetIsFirstClickSector(map, sector))
                } else {
                    let newMap = selectSectorFunc(map, sector)
                    newMap = deleteSectorSelection(newMap, selectSector)
                    setMap(newMap)
                    setSelectSector(sector)
                }
            } else {
                setMap(selectSectorFunc(map, sector))
                setSelectSector(sector)
            }
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
                    setMap(isLineInMap)
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
        setMap(boomFunc(map))
        setIsEndTurn(false)
    }
    const checkIsBum = () => {
        const newMap = checkMap(map)
        if (newMap.isBum) {
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

    const add = (value: "x" | "y" | "length") => {
        let x = deskState[value] as number
        setDeskState({
            ...deskState, [value]: x + 1
        })
        setMap(initMapGame3inLine(
            value === "x" ? deskState.x + 1 : deskState.x,
            value === "y" ? deskState.y + 1 : deskState.y
        ))
    }
    const takeAway = (value: "x" | "y" | "length") => {
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
  /*  useEffect(() => {
        /!* console.log("boomFunc")*!/
        setTimeout(() => {
            if (isEndTurn && !isBoom) {
                /!* console.log("boomFunc ==> is bum")*!/
                setMap(boomFunc(map))
                setIsBoom(true)
            } else {
                /!*console.log("boomFunc ==> new turn")*!/
                setIsBoom(false)
            }
        }, 800);
    }, [isEndTurn, isBoom])*/

// нахождение секторов для уничтожения
   /* useEffect(() => {
        /!* console.log("checkMap")*!/
        if (isBoom) {
            const newMap = checkMap(map)
            if (newMap.isBum) {
                /!* console.log("checkMap ==> isBum")*!/
                setMap(newMap.map)
                setIsBoom(false)
            } else {
                /!*console.log("checkMap ==> new turn")*!/
                setIsEndTurn(false)
                setIsBoom(false)
            }
        }
    }, [isBoom])*/

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


    return <div style={{display: "inline-flex"}}>
        <div>
            <div>
                <div> по вертикали:
                    <button onClick={() => {
                        add("x")
                    }}>+</button>
                    <button onClick={() => {
                        takeAway("x")
                    }}>-
                    </button>
                </div>
                <div> по горизонтали:
                    <button onClick={() => {
                        add("y")
                    }}>+</button>
                    <button onClick={() => {
                        takeAway("y")
                    }}>-
                    </button>
                </div>
                <div> маштаб:
                    <button onClick={() => {
                        changeSizeSector(true)
                    }}>+</button>
                    <button onClick={() => {
                        changeSizeSector(false)
                    }}>-
                    </button>
                </div>
            </div>
            <div>
                <div>очки:</div>
                <div></div>
            </div>
        </div>
        <div className={s.mainDisplay}>
            <div className={s.header}>
                {isEndTurn
                    ? <>ждите</>
                    : <>ваш ход</>}
            </div>
            <div>
                <Desk userMap={map} selectSector={selectSector}
                      returnMouseDown={onMouseDown}
                      returnMouseUp={onMouseUp}
                      returnMouseOver={onMouseOver}
                      isEndTurn={isEndTurn}
                      deskState={deskState}
                />
                 {endMove && <div>нет ходов</div>}
                  <button onClick={onClickBum}>bum</button>
                  <button onClick={checkIsBum}>check is bum</button>
                {/*  <button onClick={newMap}>new map</button>*/}
                {/*  <button onClick={setMapOnClick}>set map</button>*/}
            </div>

        </div>
    </div>

}
