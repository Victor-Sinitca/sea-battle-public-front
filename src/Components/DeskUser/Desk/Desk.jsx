import React from "react";
import s from "./Desk.module.css"
import ReturnSector from "../ReturnSector/ReturnSector";


const Desk = (props) => {
    let horizonIndex=[0,1,2,3,4,5,6,7,8,9]
    let verticalIndex=['A','B','C','D','E','F','G','H','I','J']
    return (
        <div className={
            props.yourShips?
                props.shipOpponent?
                    props.UserTurn &&!props.firstDesk? s.display1Turn
                        : s.display1
                    : s.display1Win
                : s.display1Loss
        }>
            <div className={s.display11}>
                <div></div>
                {verticalIndex.map(i=><div key={i}>{i}</div>)}
            </div>
            <div className={s.display2}>
                <div className={s.display3}>
                    {horizonIndex.map(i=><div key={i}>{i}</div>)}
                </div>
                <div className={s.displayMap}>
                    {props.userMap.map(a => a.map(b =>
                        <ReturnSector key={b.sector.x} firstDesk={props.firstDesk} sector={b.sector}
                                      returnToClick={props.returnToClick}
                                      toClick={props.toClick} deleteShipUser={props.deleteShipUser}/>
                    ))}
                </div>
            </div>
        </div>

    )}
export default Desk