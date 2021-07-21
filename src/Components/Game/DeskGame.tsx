import React, {FC} from "react";
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


}
const Desk: FC<PropsType> =  React.memo( ({userMap,deskState, returnMouseDown,selectSector,
                                 returnMouseUp,returnMouseOver,isEndTurn,}) => {
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

    return (
        <div draggable={"false"}
             style={{
                 display:"grid",
                 overflow:"hidden",
                 gridTemplateColumns: repeat(deskState.y),
                 gridTemplateRows:repeat(deskState.x),
                 border:"grey solid 2px",
                 boxShadow:"0px 0px 10px 2px #2244AA"
             }}>
            {userMap.map(a => a.map(b =>
                <Sector returnMouseDown={returnMouseDown}
                        returnMouseUp={returnMouseUp}
                        returnMouseOver={returnMouseOver}
                        key={b.sectorState.x * 10 + b.sectorState.y}
                        sector={b}
                        /*deleteAnimation={deleteAnimation}
                        decreaseAnimationCount={decreaseAnimationCount}*/
                />
            ))}
        </div>
    )
})
export default Desk
