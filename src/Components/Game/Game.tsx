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


export const Game: FC = () => {
    const [map, setMap] = useState<MapsGameType>(initMapGame3inLine(10, 10))
    const [selectSector, setSelectSector] = useState<SectorGameType | null>(null)
    const [isEndTurn, setIsEndTurn] = useState<boolean>(false)
    const [isBoom, setIsBoom] = useState<boolean>(false)
    const [endMove, setEndMove] = useState<boolean>(false)


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
        if (selectSector && !isEndTurn) {
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
    }
    const checkIsBum = () => {
        const newMap = checkMap(map)
        if (newMap.isBum) {
            setMap(newMap.map)

        }
    }
    const newMap = () => {
        if (!checkMapOnMove(map)) {
            setMap(initMapGame3inLine(10, 10))
            setEndMove(false)
        }
    }
    const setMapOnClick = () => {
        setMap(initMapGame3inLineFalseGame(10, 10))
    }


    useEffect(() => {
       /* console.log("boomFunc")*/
        setTimeout(() => {
            if (isEndTurn && !isBoom) {
               /* console.log("boomFunc ==> is bum")*/
                setMap(boomFunc(map))
                setIsBoom(true)
            } else {
                /*console.log("boomFunc ==> new turn")*/
                setIsBoom(false)
            }
        }, 800);
    }, [isEndTurn, isBoom])

    useEffect(() => {
       /* console.log("checkMap")*/
        if (isBoom) {
            const newMap = checkMap(map)
            if (newMap.isBum) {
               /* console.log("checkMap ==> isBum")*/
                setMap(newMap.map)
                setIsBoom(false)
            } else {
                /*console.log("checkMap ==> new turn")*/
                setIsEndTurn(false)
                setIsBoom(false)
            }
        }
    }, [isBoom])

    useEffect(() => {
        /*console.log("checkMapOnMove")*/
        if (!isEndTurn) {
            if (!checkMapOnMove(map)) {
                setTimeout(() => {
                   /* console.log("checkMapOnMove ==> init map")*/
                    /*setMap(initMapGame3inLine(10, 10))*/
                    setEndMove(true)
                }, 1000)
            }
        }
    }, [isEndTurn])


    return <div>
        {isEndTurn
            ? <div>ждите</div>
            : <div>твой ход</div>}

        <Desk userMap={map} selectSector={selectSector}
              returnMouseDown={onMouseDown}
              returnMouseUp={onMouseUp}
              returnMouseOver={onMouseOver}
              isEndTurn={isEndTurn}
        />
        {endMove && <div>нет ходов</div>}

        {/*  <button onClick={onClickBum}>bum</button>
        <button onClick={checkIsBum}>check is bum</button>*/}
        <button onClick={newMap}>new map</button>
        {/*<button onClick={setMapOnClick}>set map</button>*/}
    </div>
}
