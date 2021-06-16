import React, {FC} from "react";
import s from "./SetShipBar.module.css";
import SetShip from "./SetShip/SetShip";
import ship1 from "../../../assets/img/1.png"
import ship2 from "../../../assets/img/20.png"
import ship3 from "../../../assets/img/3.png"
import ship4 from "../../../assets/img/40.png"
import {useDispatch} from "react-redux";
import {ShipsType} from "../../../../Types/Types";


type PropsType = {
    FUShips: ShipsType
    firstUser: boolean
    whatSetShip: number

    lockAllMap: (firstUser: boolean) => void
    setWhatSetShip: (ship: number, firstUser: boolean) => void
    startGame: (firstUser: boolean) => void
    setHorizon: (horizon: boolean, firstUser: boolean) => void
    unlockForSetShip: (shipValue: number, horizon: boolean, firstUser: boolean) => void


}
const SetShipBar: FC<PropsType> = ({FUShips, firstUser, whatSetShip,
                                       lockAllMap,setWhatSetShip,startGame,setHorizon,unlockForSetShip}) => {
    const dispatch = useDispatch()

    const SetShip1 = (): void => {
        dispatch(lockAllMap(firstUser))
        dispatch(setWhatSetShip(1, firstUser))
    }
    const SetShip2 = (): void => {
        dispatch(lockAllMap(firstUser))
        dispatch(setWhatSetShip(2, firstUser))
    }
    const SetShip3 = (): void => {
        dispatch(lockAllMap(firstUser))
        dispatch(setWhatSetShip(3, firstUser))
    }
    const SetShip4 = (): void => {
        dispatch(lockAllMap(firstUser))
        dispatch(setWhatSetShip(4, firstUser))
    }

    const startGameDispatch = (): void => {
        dispatch(startGame(firstUser))
    }

    return <div className={s.displaySetShip}>
        <div>
            <div className={s.ship1}>
                <div>
                    <button disabled={!FUShips.ship1} onClick={SetShip1}
                            className={whatSetShip === 1 ? s.active : s.deActive}>
                        <img className={s.ship} src={ship1} alt="no img"/>
                    </button>
                </div>
                <div className={s.number}> {FUShips.ship1} </div>
            </div>
            <div className={s.ship2}>
                <div>
                    <button disabled={!FUShips.ship2} onClick={SetShip2}
                            className={whatSetShip === 2 ? s.active : s.deActive}>
                        <img className={s.ship} src={ship2} alt="no img"/>
                    </button>
                </div>
                <div className={s.number}> {FUShips.ship2} </div>
            </div>
            <div className={s.ship3}>
                <div>
                    <button disabled={!FUShips.ship3} onClick={SetShip3}
                            className={whatSetShip === 3 ? s.active : s.deActive}>
                        <img className={s.ship} src={ship3} alt="no img"/>
                    </button>
                </div>
                <div className={s.number}> {FUShips.ship3} </div>
            </div>
            <div className={s.ship4}>
                <div>
                    <button disabled={!FUShips.ship4} onClick={SetShip4}
                            className={whatSetShip === 4 ? s.active : s.deActive}>
                        <img className={s.ship} src={ship4} alt="no img"/>
                    </button>
                </div>
                <div className={s.number}> {FUShips.ship4} </div>
            </div>
        </div>
        {(FUShips.ship1 || FUShips.ship2 || FUShips.ship3 || FUShips.ship4)
            ? <div>
                <SetShip ship={whatSetShip} firstUser={firstUser}
                         setHorizon={setHorizon} unlockForSetShip={unlockForSetShip}/>
            </div>
            :
            <div className={s.startGameButton}>
                <button onClick={startGameDispatch}> Start game</button>
            </div>
        }
    </div>
}
export default SetShipBar;
