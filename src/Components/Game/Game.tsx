import React, {FC, useState} from "react";
import Desk from "./DeskGame";
import {SectorGameType} from "./Sector";
import {getRandomInt} from "../../commen/logics/getRandom/getRandom";
import {isSectorInLine} from "./gameLogic/isSectorInLine";
import {isNearbyWithSector} from "./gameLogic/isNearbyWithSector";
import {Profiler} from "inspector";
import {replaceSectors} from "./gameLogic/replaceSectors";
import {deleteSectorSelection} from "./gameLogic/deleteSectorSelection";
import {selectSectorFunc} from "./gameLogic/selectSector";
import {SetIsFirstClickSector} from "./gameLogic/setIsFirstClickSector";


function initMap() {
    let map = Array.from(Array(20), () => new Array(20))
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            map[i][j] = {
                sectorState: {
                    x: j,
                    y: i,
                    isSelected: false,
                    isFirstClick: false,
                },
                date: {
                    color: "red",
                    state: getRandomInt(5),
                    isBum: false,
                }
            }
        }
    }
    return map
}




export const Game: FC = () => {
    const [map, setMap] = useState(initMap())
    const [selectSector, setSelectSector] = useState<SectorGameType | null>(null)


    const onMouseDown = (sector: SectorGameType) => {
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
                } else {
                    setMap(deleteSectorSelection(map, selectSector))
                }
            } else if (sector.sectorState.isSelected) {
                setMap(SetIsFirstClickSector(map,sector))
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
    const onMouseUp = (sector: SectorGameType) => {
        if (sector.sectorState.isFirstClick && sector.sectorState.isSelected) {
            setMap(deleteSectorSelection(map, sector))
            setSelectSector(null)
        }
    }
    const onMouseOver = (sector: SectorGameType) => {
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
                } else {
                    setMap(deleteSectorSelection(map, selectSector))
                }
            }else {
                setMap(deleteSectorSelection(map, selectSector))
                setSelectSector(null)
            }
        }
    }





    return <div>
        <Desk userMap={map} selectSector={selectSector}
              returnMouseDown={onMouseDown}
              returnMouseUp={onMouseUp}
              returnMouseOver={onMouseOver}
        />
    </div>
}
