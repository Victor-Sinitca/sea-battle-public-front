import React, {FC, MouseEvent, useEffect,} from "react";
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


export  type SectorGameType = {
    sectorState: {
        x: number,
        y: number,
        isSelected: boolean,
        isFirstClick: boolean,
        animateMove: {
            isMove: boolean,
            shift: boolean,
            i: number,
            j: number
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
    deleteAnimation: (y: number, x: number) => void
    decreaseAnimationCount: () => void
    animation: string,
    changeAnimationList: (i: number, j: number, animation: string) => void,
    setAnimationInSector: (sector: SectorGameType, animation: string) => void

}
export const Sector: FC<PropsType> = React.memo(({
                                                     sector, returnMouseDown, returnMouseUp, returnMouseOver,
                                                     deleteAnimation, decreaseAnimationCount, animation, changeAnimationList,
                                                     setAnimationInSector
                                                 }) => {

        const imgMass = [sw0, sw1, sw2, sw3, sw4, sw5, sw6, sw7, bw8]
        const bonusImgMass = [m1, m2, m3,]
        let boxShadow = sector.sectorState.isSelected ? "inset 2px 2px 5px #374884, inset -2px -2px 5px #374884" : ""

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
        if (sector.sectorState.animateMove && !animation) {
            let isWasAnimation = false
            if (sector.sectorState.animateMove.shift) {
                console.log(`animateMove: i=${sector.sectorState.animateMove.i}, j= ${sector.sectorState.animateMove.j}`)
                let styleSheet = document.styleSheets[0];
                let animationName = `keyframe${sector.sectorState.y}${sector.sectorState.x}${sector.sectorState.animateMove.i}${sector.sectorState.animateMove.j}${sector.sectorState.animateMove.isMove}${sector.sectorState.animateMove.shift}`;
                for (let i = 0; i < styleSheet.cssRules.length; i++) {
                    // @ts-ignore
                    if (styleSheet.rules[i].name) {
                        // @ts-ignore
                        if (styleSheet.rules[i].name === animation) {
                            isWasAnimation = true
                        }
                    }
                }
                if (!isWasAnimation) {
                    let keyframes =
                        `@-webkit-keyframes ${animationName} {
                     100% {transform: translate(${sector.sectorState.animateMove.j * 100}%, ${sector.sectorState.animateMove.i * 100}%)}
                 }`;
                    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
                    changeAnimationList(sector.sectorState.y, sector.sectorState.x, animationName)
                   /* deleteAnimation(sector.sectorState.y, sector.sectorState.x)*/
                }
            } else {
                let styleSheet = document.styleSheets[0];
                let animationName = `keyframe${sector.sectorState.y}${sector.sectorState.x}${sector.sectorState.animateMove.i}${sector.sectorState.animateMove.j}${sector.sectorState.animateMove.isMove}${sector.sectorState.animateMove.shift}`;
                for (let i = 0; i < styleSheet.cssRules.length; i++) {
                    // @ts-ignore
                    if (styleSheet.rules[i].name) {
                        // @ts-ignore
                        if (styleSheet.rules[i].name === animation) {
                            isWasAnimation = true
                        }
                    }
                }
                if (!isWasAnimation) {
                   debugger
                    let keyframes =
                        `@-webkit-keyframes ${animationName} {
                    50% {transform: translate(${sector.sectorState.animateMove.j * 100}%, ${sector.sectorState.animateMove.i * 100}%)}
                 }`;

                    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
                    changeAnimationList(sector.sectorState.y, sector.sectorState.x, animationName)
                    console.log(`back1 ${styleSheet.cssRules.length} `)
                   /* deleteAnimation(sector.sectorState.y, sector.sectorState.x)*/
                }
            }
        }


        const handleAnimationEnd = () => {
            let styleSheet = document.styleSheets[0];
            debugger
            let index =[] as Array<number>
            let index1 = null as null | number
            for (let i = 0; i < styleSheet.cssRules.length; i++) {
                // @ts-ignore
                if (styleSheet.rules[i].name) {
                    // @ts-ignore
                    if (styleSheet.rules[i].name === animation) {
                        /*index.push(i)*/
                        index1=i
                    }
                }
            }
           /* if (index1 !== null) {
                styleSheet.deleteRule(index1)
            }*/
           /* if (index.length > 0) {
                index.forEach(value => (styleSheet.deleteRule(value)))
            }*/
            deleteAnimation(sector.sectorState.y, sector.sectorState.x)
            changeAnimationList(sector.sectorState.y, sector.sectorState.x, "")
            decreaseAnimationCount()
        }

        return <div onAnimationEnd={handleAnimationEnd} draggable={"false"}/*ref={refDiv}*/
                    style={{
                        /* display: "grid",*/
                        gridTemplateRows: "0px 0px",
                        borderRadius: "5px",
                        boxShadow: boxShadow,
                        animationDuration: `400ms`,
                        animationIterationCount: 1,
                        animationName: animation,
                        animationDirection:"reverse",
                    }}
                    onMouseDown={handlerMouseDown}
                    onMouseUp={handlerMouseUp}
                    onMouseOver={handlerMouseOver}>

            <img className={sector.date.isBum ? s.isBum : s.img} draggable={"false"} src={imgMass[sector.date.state]}/>
            {sector.date.bonusSector > 0 &&
            <img className={s.imgBonus} draggable={"false"} src={bonusImgMass[sector.date.bonusSector - 1]}/>}
            <div>
                {sector.date.score > 0 ? <div className={s.score}>{sector.date.score}</div> : <div></div>}
                {/*  <div className={s.devInf}>
                {sector.date.addBonusSector > 0 ? <div>{sector.date.addBonusSector}</div> : <div></div>}
                {sector.date.bonusSector > 0 ? <div style={{color: "red"}}>{sector.date.bonusSector}</div> : <div></div>}
            </div>*/}
            </div>
        </div>

    }
)
