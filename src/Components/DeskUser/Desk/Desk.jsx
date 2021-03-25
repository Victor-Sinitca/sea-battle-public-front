import React from "react";
import ReturnSector from "../../Common/SectorShip";
import s from "./Desk.module.css"


const Desk = (props) => {
    return (
        <div className={s.displayMap}>
            {props.userMap.map(a => a.map(b =>
                <ReturnSector firstDesk={props.firstDesk} sector={b.sector}
                              returnToClick={props.returnToClick}
                              toClick={props.toClick}/>
            ))}
        </div>
    )}
export default Desk