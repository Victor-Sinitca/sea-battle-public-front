import React, {FC, MouseEvent,} from "react";
import s from "./Sector.module.css"
import sw0 from "../../../assets/img/G1.png"
import sw1 from "../../../assets/img/G2.png"
import sw2 from "../../../assets/img/G3.png"
import sw3 from "../../../assets/img/G4.png"
import sw4 from "../../../assets/img/G5.png"
import sw5 from "../../../assets/img/G6.png"
import sw6 from "../../../assets/img/G7.png"
import sw7 from "../../../assets/img/G8.png"
import bw8 from "../../../assets/img/G9.png"
import m1 from "../../../assets/img/молния гор.png"
import m2 from "../../../assets/img/молния верт.png"
import m3 from "../../../assets/img/молния в+г.png"
import {deleteAnimationsThink, threeInLineAction} from "../../../redux/threeInLine-reduser";
import {useDispatch} from "react-redux";


export  type SectorGameType = {
    sectorState: {
        x: number,
        y: number,
        isSelected: boolean,
        isFirstClick: boolean,
        animateMove: {
            name: string,
        } | null,
        animateStart: boolean,
    },
    date: {
        color: "red" | "blue" | "black" | "green",
        state: number,
        isBum: boolean,
        score: number,
        addBonusSector: number,
        bonusSector: number,
    }
}
type PropsType = {
    sector: SectorGameType
    returnMouseDown: (sector: SectorGameType) => void
    returnMouseUp: (sector: SectorGameType) => void
    returnMouseOver: (sector: SectorGameType) => void
}
export const Sector: FC<PropsType> = React.memo(({
                                                     sector, returnMouseDown, returnMouseUp, returnMouseOver,
                                                 }) => {
        const index = (sector.sectorState.x + sector.sectorState.y) % 2
        const handlerMouseDown = () => {
            if (!sector.sectorState.animateStart) {
                returnMouseDown(sector)
            }
        }
        const handlerMouseUp = () => {
            if (!sector.sectorState.animateStart) {
                returnMouseUp(sector)
            }
        }
        const handlerMouseOver = (event: MouseEvent<HTMLDivElement>) => {
            if (event.buttons === 1 && !sector.sectorState.animateStart) {
                returnMouseOver(sector)
            }
        }

        return <div style={{height: "100%", backgroundColor: index ? "#11221122" : ""}}
                    onMouseDown={handlerMouseDown}
                    onMouseUp={handlerMouseUp}
                    onMouseOver={handlerMouseOver}>
            <SectorMemo sector={sector}/>
        </div>
    }
)


type SectorImageType = {
    sector: SectorGameType
}
const SectorMemo: FC<SectorImageType> = React.memo(({sector}) => {
    const imgMass = [sw0, sw1, sw2, sw3, sw4, sw5, sw6, sw7, bw8]
    const bonusImgMass = [m1, m2, m3,]
    let boxShadow = sector.sectorState.isSelected ? "inset 2px 2px 5px #374884, inset -2px -2px 5px #374884" : ""
    const dispatch = useDispatch()
    let spedAnimation=0

    const shiftAnimationValue = sector.sectorState.animateMove?.name.split("S")
    /*console.log(shiftAnimationValue)*/
    if(shiftAnimationValue){
        spedAnimation=Math.abs(+shiftAnimationValue[3])+Math.abs(+shiftAnimationValue[4])
    }



    const handleAnimationEnd = () => {
        //выполнить по заершении анимации в секторе
        if (sector.sectorState.animateMove) {
            //удаление стилей анимации keyframes из document.styleSheets
            let styleSheet = document.styleSheets[0];
            let index = null as null | number
            for (let i = 0; i < styleSheet.cssRules.length; i++) {
                // @ts-ignore
                if (styleSheet.rules[i].name) {
                    // @ts-ignore
                    if (styleSheet.rules[i].name === sector.sectorState.animateMove.name) {
                        /*index.push(i)*/
                        //нахождение анимации по имени стиля  и опредление его индекса в таблице стилей
                        index = i
                    }
                }
            }
            if (index !== null) {
                //если стиль найден  - удаляем его из таблице по индексу
                styleSheet.deleteRule(index)
            }

            // сохраняем счетчик для удаления анимаций после выполнения на всей доске
            dispatch(threeInLineAction.increaseAnimationCountEnd(
                {
                    i:sector.sectorState.y,
                    j:sector.sectorState.x
                }))

           /*
            //удаляем название анимации в редаксе
            //уменьшаем счетчик анимаций
            dispatch(threeInLineAction.deleteAnimationInSector(sector.sectorState.y, sector.sectorState.x))
            dispatch(threeInLineAction.decreaseAnimationCount())*/
        }
    }

    return <div onAnimationEnd={handleAnimationEnd} draggable={"false"}/*ref={refDiv}*/
                style={{
                    height: "100%",
                    position: "relative",
                    borderRadius: "5px",
                    boxShadow: boxShadow,
                    /*animationDuration: spedAnimation>1? `${spedAnimation*100}ms`:`400ms`,*/
                    animationDuration: `300ms`,
                    animationIterationCount: 1,
                    animationName: sector.sectorState.animateMove?.name || "",
                    animationDirection: "reverse",
                }}>
        <div className={s.shieldDiv} draggable={"false"}></div>
        <img alt="fon" className={sector.date.isBum ? s.isBum : s.img} draggable={"false"}
             src={imgMass[sector.date.state]}/>
        {sector.date.bonusSector > 0 &&
        <img alt="bonus" className={s.imgBonus} draggable={"false"} src={bonusImgMass[sector.date.bonusSector - 1]}/>}
        <div>
            {sector.date.score > 0 ? <div className={s.score}>{sector.date.score}</div> : <div></div>}
            {/*  <div className={s.devInf}>
                {sector.date.addBonusSector > 0 ? <div>{sector.date.addBonusSector}</div> : <div></div>}
                {sector.date.bonusSector > 0 ? <div style={{color: "red"}}>{sector.date.bonusSector}</div> : <div></div>}
            </div>*/}
        </div>
    </div>
})
