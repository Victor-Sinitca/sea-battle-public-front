import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import PlaceBattle from "./PlaceBattle";
import {
    finishSettingShip,
    setFirstUserMap,
    setSecondUserMap,
    setShipFirstUser, setShipSecondUser, setShotFirstUser, setShotSecondUser,
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
})




export default compose(connect(mapStateToProps,
    {setFirstUserMap,setSecondUserMap,toBeginSettingShip,finishSettingShip,
        setShipFirstUser,setShipSecondUser,setShotFirstUser,setShotSecondUser,toggleSettingShip,
        unlockForSetShip}))(PlaceBattleContainer)