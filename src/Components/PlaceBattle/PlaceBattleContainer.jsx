import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import PlaceBattle from "./PlaceBattle";
import {
    finishSettingShip, lockAllMap,
    setFirstUserMap, setHorizon,
    setSecondUserMap,
    setShipFirstUser, setShipSecondUser, setShotFirstUser, setShotSecondUser, setWhatSetShip,
    toBeginSettingShip, toggleSettingShip, unlockForSetShip,

} from "../../redux/battleMap-reduсer";


class PlaceBattleContainer  extends React.Component{

    render() {
        return (
            <PlaceBattle {...this.props}/>
        )
    }
}

let mapStateToProps =(state)=>({
    firstUserMap: state.battleMap.FUMap,
    secondUserMap: state.battleMap.SUMap,
    firstUserTurn: state.battleMap.firstUserTurn,
    settingShipFU: state.battleMap.settingShipFU,
    settingShipSU: state.battleMap.settingShipSU,
    FUShips: state.battleMap.FUShips,
    SUShips: state.battleMap.SUShips,
    whatSetShipFU: state.battleMap.whatSetShipFU,
    whatSetShipSU: state.battleMap.whatSetShipSU,
    horizonSetShipFU: state.battleMap.horizonSetShipFU,
    horizonSetShipSU: state.battleMap.horizonSetShipSU,
})




export default compose(connect(mapStateToProps,
    {setFirstUserMap,setSecondUserMap,toBeginSettingShip,finishSettingShip,
        setShipFirstUser,setShipSecondUser,setShotFirstUser,setShotSecondUser,toggleSettingShip,
        unlockForSetShip,lockAllMap ,setWhatSetShip,setHorizon}))(PlaceBattleContainer)