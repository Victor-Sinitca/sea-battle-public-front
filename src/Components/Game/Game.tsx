import React, {FC, useState} from "react";
import Desk from "./DeskGame";
import {SectorGameType} from "./Sector";
import {getRandomInt} from "../../commen/logics/getRandom/getRandom";
import {isSectorInLine} from "./gameLogic/isSectorInLine";
import {isNearbyWithSector} from "./gameLogic/isNearbyWithSector";


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
                    isBum:false,
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
        if (isNearbyWithSector(selectSector,sector)){
            let sectorInMemory = JSON.parse(JSON.stringify(sector)) as SectorGameType
            let selectSectorInMemory = JSON.parse(JSON.stringify(selectSector)) as SectorGameType
            let newMap = [...map]
            newMap[sectorInMemory.sectorState.y] = [...map[sectorInMemory.sectorState.y]]
            newMap[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x] = {...map[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x]}
            newMap[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x].sectorState = {...map[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x].sectorState}
            newMap[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x].sectorState.isSelected = false
            newMap[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x].sectorState.isFirstClick = false
            newMap[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x].date = selectSectorInMemory.date

            newMap[selectSectorInMemory.sectorState.y] = [...newMap[selectSectorInMemory.sectorState.y]]
            newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x] = {...newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x]}
            newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x].sectorState = {...newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x].sectorState}
            newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x].sectorState.isSelected = false
            newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x].sectorState.isFirstClick = false
            newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x].date = sectorInMemory.date

            setSelectSector(null)

            const isLineInMap = isSectorInLine(newMap,sectorInMemory,selectSectorInMemory)
            if (!isLineInMap ){
                newMap[sectorInMemory.sectorState.y] = [...map[sectorInMemory.sectorState.y]]
                newMap[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x] = {...map[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x]}
                newMap[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x].sectorState = {...map[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x].sectorState}
                newMap[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x].sectorState.isSelected = false
                newMap[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x].sectorState.isFirstClick = false
                newMap[sectorInMemory.sectorState.y][sectorInMemory.sectorState.x].date = sectorInMemory.date

                newMap[selectSectorInMemory.sectorState.y] = [...newMap[selectSectorInMemory.sectorState.y]]
                newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x] = {...newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x]}
                newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x].sectorState = {...newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x].sectorState}
                newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x].sectorState.isSelected = false
                newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x].sectorState.isFirstClick = false
                newMap[selectSectorInMemory.sectorState.y][selectSectorInMemory.sectorState.x].date = selectSectorInMemory.date
                setMap(newMap)
            }else {
                setMap(isLineInMap)
            }
        } else {
            let newMap = [...map]
            newMap[sector.sectorState.y] = [...map[sector.sectorState.y]]
            newMap[sector.sectorState.y][sector.sectorState.x] = {...map[sector.sectorState.y][sector.sectorState.x]}
            newMap[sector.sectorState.y][sector.sectorState.x].sectorState = {...map[sector.sectorState.y][sector.sectorState.x].sectorState}
            newMap[sector.sectorState.y][sector.sectorState.x].sectorState.isSelected = true
            if (selectSector) {
                newMap[selectSector.sectorState.y] = [...newMap[selectSector.sectorState.y]]
                newMap[selectSector.sectorState.y][selectSector.sectorState.x] = {...newMap[selectSector.sectorState.y][selectSector.sectorState.x]}
                newMap[selectSector.sectorState.y][selectSector.sectorState.x].sectorState = {...newMap[selectSector.sectorState.y][selectSector.sectorState.x].sectorState}
                newMap[selectSector.sectorState.y][selectSector.sectorState.x].sectorState.isSelected = false
                newMap[selectSector.sectorState.y][selectSector.sectorState.x].sectorState.isFirstClick = false
            }
            setMap(newMap)
            setSelectSector(sector)
        }
    }

    const onMouseUp = (sector: SectorGameType) => {
        /*        if(sector.sectorState.isFirstClick && sector.sectorState.isSelected){
                    let newMap = [...map]
                    newMap[sector.sectorState.y] = [...map[sector.sectorState.y]]
                    newMap[sector.sectorState.y][sector.sectorState.x] = {...map[sector.sectorState.y][sector.sectorState.x]}
                    newMap[sector.sectorState.y][sector.sectorState.x].sectorState = {...map[sector.sectorState.y][sector.sectorState.x].sectorState}
                    newMap[sector.sectorState.y][sector.sectorState.x].sectorState.isFirstClick = false
                    newMap[sector.sectorState.y][sector.sectorState.x].sectorState.isSelected = false
                    setMap(newMap)
                    setSelectSector(null)
                }else{
                    let newMap = [...map]
                    newMap[sector.sectorState.y] = [...map[sector.sectorState.y]]
                    newMap[sector.sectorState.y][sector.sectorState.x] = {...map[sector.sectorState.y][sector.sectorState.x]}
                    newMap[sector.sectorState.y][sector.sectorState.x].sectorState = {...map[sector.sectorState.y][sector.sectorState.x].sectorState}
                    newMap[sector.sectorState.y][sector.sectorState.x].sectorState.isFirstClick = true
                    setMap(newMap)
                }*/
    }

    const onMouseOver = (sector: SectorGameType) => {
        /*if (
            (selectSector?.sectorState.x === sector.sectorState.x - 1 && selectSector?.sectorState.y === sector.sectorState.y)
            || (selectSector?.sectorState.x === sector.sectorState.x + 1 && selectSector?.sectorState.y === sector.sectorState.y)
            || (selectSector?.sectorState.y === sector.sectorState.y - 1 && selectSector?.sectorState.x === sector.sectorState.x)
            || (selectSector?.sectorState.y === sector.sectorState.y + 1 && selectSector?.sectorState.x === sector.sectorState.x)
        ) {
            let newMap = [...map]
            newMap[sector.sectorState.y] = [...map[sector.sectorState.y]]
            newMap[sector.sectorState.y][sector.sectorState.x] = {...map[sector.sectorState.y][sector.sectorState.x]}
            newMap[sector.sectorState.y][sector.sectorState.x].sectorState = {...map[sector.sectorState.y][sector.sectorState.x].sectorState}
            newMap[sector.sectorState.y][sector.sectorState.x].sectorState.isSelected = true
            if (selectSector) {
                newMap[selectSector.sectorState.y] = [...newMap[selectSector.sectorState.y]]
                newMap[selectSector.sectorState.y][selectSector.sectorState.x] = {...newMap[selectSector.sectorState.y][selectSector.sectorState.x]}
                newMap[selectSector.sectorState.y][selectSector.sectorState.x].sectorState = {...newMap[selectSector.sectorState.y][selectSector.sectorState.x].sectorState}
                newMap[selectSector.sectorState.y][selectSector.sectorState.x].sectorState.isSelected = false
            }
            setMap(newMap)
            setSelectSector(sector)
        }*/
    }


    return <div>
        <Desk userMap={map} selectSector={selectSector}
              returnMouseDown={onMouseDown}
              returnMouseUp={onMouseUp}
              returnMouseOver={onMouseOver}
        />
    </div>
}
