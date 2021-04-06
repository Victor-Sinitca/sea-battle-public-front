import React from "react";

import s from "./Desk.module.css"
import ReturnSector from "../../Common/ReturnSector/ReturnSector";


const Desk = (props) => {
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
                <div>A</div>
                <div>B</div>
                <div>C</div>
                <div>D</div>
                <div>E</div>
                <div>F</div>
                <div>G</div>
                <div>H</div>
                <div>I</div>
                <div>J</div>
            </div>
            <div className={s.display2}>
                <div className={s.display3}>
                    <div>0</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>

                </div>
                <div className={s.displayMap}>
                    {props.userMap.map(a => a.map(b =>
                        <ReturnSector firstDesk={props.firstDesk} sector={b.sector}
                                      returnToClick={props.returnToClick}
                                      toClick={props.toClick} deleteShipUser={props.deleteShipUser}/>
                    ))}
                </div>
            </div>
        </div>

    )}
export default Desk