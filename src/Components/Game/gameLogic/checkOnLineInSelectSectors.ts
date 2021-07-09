import {MapsGameType} from "../DeskGame";
import {SectorGameType} from "../Sector";
import React from "react";
import {replaceSectors} from "./replaceSectors";
import {blowUpAllMap} from "./blowUpAllMap";
import {blowUpSelectedSectors} from "./blowUpSelectedSectors";
import {blowUpCrosshair} from "./blowUpСrosshair";
import {blowUpBigCrosshair} from "./blowUpBigСrosshair";
import {isSectorInLine} from "./isSectorInLine";
import {findBonusBumFunc} from "./findBonusBumFunc";
import {deleteSectorSelection} from "./deleteSectorSelection";

export function checkOnLineInSelectSectors(Map: MapsGameType, selectSector: SectorGameType, sector: SectorGameType,
                                           setSelectSector: React.Dispatch<React.SetStateAction<SectorGameType | null>>,
                                           setIsEndTurn: React.Dispatch<React.SetStateAction<boolean>>, isDevMode: boolean = false) {
    // клик рядом с выделеным сектором
    let map = [...Map]
    setSelectSector(null)
    if (selectSector.date.state === 8) {
        // выделен алмаз
        if (sector.date.state === 8) {
            // выделены два алмаза
            map = blowUpAllMap(map)
            if (!isDevMode) {
                setIsEndTurn(true)
            }
        } else {
            map = blowUpSelectedSectors(map, selectSector, sector)
            if (!isDevMode) {
                setIsEndTurn(true)
            }
        }
    } else if (sector.date.state === 8) {
        // рядом алмаз
        map = blowUpSelectedSectors(map, sector, selectSector)
        if (!isDevMode) {
            setIsEndTurn(true)
        }
    } else if ((sector.date.bonusSector === 1 || sector.date.bonusSector === 2)
        && (selectSector.date.bonusSector === 1 || selectSector.date.bonusSector === 2)) {
        // рядом два бонусных сектора по вертикали и или по горизонтали
        map = blowUpCrosshair(map, sector)
        if (!isDevMode) {
            setIsEndTurn(true)
        }
    } else if (sector.date.bonusSector === 3 && selectSector.date.bonusSector === 3) {
        //рядом два бонксных сектора в+г
        map = blowUpBigCrosshair(map, sector)
        if (!isDevMode) {
            setIsEndTurn(true)
        }
    } else {
        //нет бонусных секторов в секторах для замены
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
            if (!isDevMode) {
                setIsEndTurn(true)
            }
        } else {
            // нет комбинаций из трех и более, снятие выделения
            if (isDevMode) {
                map = newMap
            } else map = deleteSectorSelection(map, selectSector)
        }
    }
    return map
}
