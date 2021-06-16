import React, {FC, useEffect} from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./BattleRoom.module.css"
import {useDispatch, useSelector} from "react-redux";
import {actionBattleMap} from "../../redux/battleWithMan-reduсer";
import {
    getComp,
    getDeleteShipFU,
    getFirstUserMap,
    getFUShips,
    getFUTurn,
    getSecondUserMap,
    getSettingShipUser,
    getSUShips,
    getWhatSetShipFU
} from "../../redux/battleWithMan-selectors";
import {initializeTheMapFunction} from "../../commen/logics/initializeTheMapFunction/initializeTheMapFunction";
import DeskUserWithMan from "../DeskUser/DeskUserWithMan";


const PlaceBattle:FC = ()  => {
    const firstUserMap = useSelector(getFirstUserMap);
    const secondUserMap = useSelector(getSecondUserMap);
    const settingShipUser = useSelector(getSettingShipUser);
    const FUTurn = useSelector(getFUTurn);
    const FUShips = useSelector(getFUShips);
    const SUShips = useSelector(getSUShips);
    const whatSetShipFU = useSelector(getWhatSetShipFU);
    const deleteShipFU = useSelector(getDeleteShipFU);

    const dispatch = useDispatch()


    useEffect(() => { //инициализация карт первого и второго игрока
        if (!firstUserMap.length || !secondUserMap.length) {
            dispatch(actionBattleMap.setFirstUserMap(initializeTheMapFunction(null)))
            dispatch(actionBattleMap.setSecondUserMap(initializeTheMapFunction(null)))
        }
    });

    if (!firstUserMap.length || !secondUserMap.length) return <Preloader/>
    return <div className={s.displayMapBattle}>
        <DeskUserWithMan firstUser={true} firstMap={firstUserMap} secondMap={secondUserMap}
                  SUShips={SUShips} FUShips={FUShips}
                  whatSetShip={whatSetShipFU} UserTurn={FUTurn}
                  deleteShipUser={deleteShipFU} settingShipUser={settingShipUser}/>

    </div>
}
export default PlaceBattle
