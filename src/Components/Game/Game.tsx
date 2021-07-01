import React, {FC, useState} from "react";
import Desk from "./DeskGame";
import {SectorGameType} from "./Sector";


function initMap() {
    let map = Array.from(Array(10), () => new Array(10))
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            map[i][j] = {
                sectorState: {
                    x: j,
                    y: i,
                },
                date: {
                    color: "red",
                    isSelected: false,
                    state: i * 10 + j,
                }
            }
        }
    }
    return map
}


export const Game: FC = () => {
    const [map, setMap] = useState(initMap())
    const [selectSector, setSelectSector] = useState<SectorGameType | null>(null)


    const click = (sector: SectorGameType) => {
        if (selectSector?.sectorState.x === sector.sectorState.x
            && selectSector?.sectorState.y === sector.sectorState.y) {
            setSelectSector(null)
        } else {
            setSelectSector(sector)
            setMap([...map,
                [...map[sector.sectorState.x],
                    [...map[sector.sectorState.x][sector.sectorState.y],
                        {...map[sector.sectorState.x][sector.sectorState.y].date, color:"blue"}
                    ]
                ]
            ])
        }
    }


    return <div>
        <Desk userMap={map} returnToClick={click} selectSector={selectSector}/>
    </div>
}
