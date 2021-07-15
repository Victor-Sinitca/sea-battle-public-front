import React, {FC} from "react";
import s from "./DeskGame.module.css"
import {Sector, SectorGameType} from "./Sector/Sector";
import {threeInLineAction} from "../../redux/threeInLine-reduser";
import {useDispatch} from "react-redux";

export type MapsGameType = Array<Array<SectorGameType>>
type PropsType = {
    deskState:{
        x:number,
        y:number,
        length:number
    }
    isEndTurn:boolean
    userMap: MapsGameType
    returnMouseDown: (sector: SectorGameType) => void
    returnMouseUp: (sector: SectorGameType) => void
    returnMouseOver: (sector: SectorGameType) => void
    selectSector:SectorGameType |null
    animationList : Array<Array<string>>

}
const Desk: FC<PropsType> = ({userMap,deskState, returnMouseDown,selectSector,
                                 returnMouseUp,returnMouseOver,isEndTurn,animationList}) => {
    const dispatch = useDispatch()
    const repeat =(count:number)=>{
        let string=''
        for(let i=0; i<count; i++){
            string=string+`${deskState.length + ""}px `
        }
        return string
    }
    const deleteAnimation =(y:number,x:number)=>{
        dispatch(threeInLineAction.deleteAnimationInSector(y, x))
    }
    const decreaseAnimationCount =()=>{
        dispatch(threeInLineAction.decreaseAnimationCount())
    }
    const changeAnimationList =(i:number, j:number, animation:string)=>{
        dispatch(threeInLineAction.changeAnimationList(i,j,animation))
    }

    const setAnimationInSector =(sector:SectorGameType, animation:string )=>{
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
                    deleteAnimation(sector.sectorState.y, sector.sectorState.x)
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
                    deleteAnimation(sector.sectorState.y, sector.sectorState.x)
                }
            }
        }
    }


    return (
        <div style={{display:"grid", overflow:"hidden", gridTemplateColumns: repeat(deskState.y), gridTemplateRows:repeat(deskState.x)}}>
            {userMap.map(a => a.map(b =>
                <Sector returnMouseDown={returnMouseDown}
                        returnMouseUp={returnMouseUp}
                        returnMouseOver={returnMouseOver}
                        key={b.sectorState.x * 10 + b.sectorState.y} sector={b}
                        deleteAnimation={deleteAnimation}
                        decreaseAnimationCount={decreaseAnimationCount}
                        animation={animationList[b.sectorState.y][b.sectorState.x]}
                        changeAnimationList={changeAnimationList}
                        setAnimationInSector={setAnimationInSector}
                />
            ))}
        </div>
    )
}
export default Desk
