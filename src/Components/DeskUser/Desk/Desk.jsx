import React from "react";
import s from "./Desk.module.css"
import ReturnSector from "../ReturnSector/ReturnSector";


const Desk = (props) => {
    let index=[0,1,2,3,4,5,6,7,8,9]
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
                {index.map(i=><div key={i}>{String.fromCharCode(65 + i)}</div>)}
            </div>
            <div className={s.display2}>
                <div className={s.display3}>
                    {index.map(i=><div key={i}>{i}</div>)}
                </div>
                <div className={s.displayMap}>
                    {props.userMap.map(a => a.map(b =>
                        <ReturnSector key={b.sector.x*10+b.sector.y} firstDesk={props.firstDesk} sector={b.sector}
                                      returnToClick={props.returnToClick}
                                      toClick={props.toClick} deleteShipUser={props.deleteShipUser}/>
                    ))}
                </div>
            </div>
        </div>

    )}
export default Desk