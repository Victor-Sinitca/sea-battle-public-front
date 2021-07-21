import React, {FC, useState} from "react";


type sectorType = {
    sector: {
        value: number
        i: number,
        j: number,
    }
}
const initMap = (x: number = 10, y: number = 10) => {
    let map = Array.from(Array(x),
        () => new Array(y)
    ) as Array<Array<sectorType>>

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            map[i][j] = {
                sector: {
                    value: i * 10 + j,
                    i: i,
                    j: j,
                }
            }
        }
    }
    return map
}
const repeat = (count: number) => {
    let string = ''
    for (let i = 0; i < count; i++) {
        string = string + `${50 + ""}px `
    }
    return string
}


export const Draft: FC<{}> = React.memo(() => {
    const [desk, setDesk] = useState(initMap(10, 10))


    const setValue = (i: number, j: number) => {
        /*let newDesk=[...desk]*/
        let newDesk = [...desk, ]
        /*newDesk[i]=[...desk[i]]
        newDesk[i][j]={...desk[i][j]}
        newDesk[i][j].sector={...desk[i][j].sector}*/
        newDesk[i][j].sector.value = desk[i][j].sector.value + 1
        setDesk(newDesk)
    }


    const map = desk.map((a) => a.map((b =>
            <SectorDraft key={b.sector.i * 10 + b.sector.j} sector={b.sector} setValue={setValue}/>
    )))

    return <div style={{
        width: "min-content",
        display: "grid",
        overflow: "hidden",
        gridTemplateColumns: repeat(10),
        gridTemplateRows: repeat(10),
        border: "grey solid 2px",
        boxShadow: "0px 0px 10px 2px #2244AA"
    }}>
        {map}
    </div>
})


type SectorDraftType = {
    sector: {
        value: number
        i: number,
        j: number,
    },
    setValue: (i: number, j: number) => void,
}
const SectorDraft: FC<SectorDraftType> = React.memo(({sector, setValue}) => {
    const index = (sector.i + sector.j) % 2


    const onClick = () => {
        setValue(sector.i, sector.j)
    }


    return <div onClick={onClick} style={{
        height: "100%",
        borderRadius: "5px",
        backgroundColor: index ? "#11221122" : ""
    }}>
        {sector.value}
    </div>
})
