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


export const Game: FC = () => {
    const [map, setMap] = useState<MapsGameType>(initMapGame3inLine(10, 10))
    const [selectSector, setSelectSector] = useState<SectorGameType | null>(null)
    const [isEndTurn, setIsEndTurn] = useState<boolean>(false)
    const [isBoom, setIsBoom] = useState<boolean>(false)


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
    useEffect(() => {
        setTimeout(() => {
            if (isEndTurn && !isBoom) {
                setMap(boomFunc(map))
                setIsBoom(true)
            } else setIsBoom(false)
        }, 2000);
    }, [isEndTurn, isBoom])

    useEffect(() => {

        if (isBoom) {
            const newMap = checkMap(map)
            if (newMap.isBum) {
                setMap(newMap.map)
                setIsBoom(false)
            } else {
                setIsEndTurn(false)
                setIsBoom(false)
            }
        }

    }, [isBoom])


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
        {/*  <button onClick={onClickBum}>bum</button>
        <button onClick={checkIsBum}>check is bum</button>*/}
    </div>
}
