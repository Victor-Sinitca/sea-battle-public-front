import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import PlaceBattle from "./PlaceBattle";
import {
    deleteShipFUonMap, deleteShipSUonMap,
    finishSettingShip, increaseSectorFire, lockAllMap, setCompGame,
    setFirstUserMap, setHorizon,
    setSecondUserMap,
    setShipFirstUser, setShipSecondUser, setShotFirstUser, setShotSecondUser, setWhatSetShip, startGame,
    toBeginSettingShip, toggleDeleteShip, toggleLookSecondUser, toggleSettingShip, unlockForSetShip,

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
    FUShips: state.battleMap.FUShips,
    SUShips: state.battleMap.SUShips,
    whatSetShipFU: state.battleMap.whatSetShipFU,
    whatSetShipSU: state.battleMap.whatSetShipSU,
    horizonSetShipFU: state.battleMap.horizonSetShipFU,
    horizonSetShipSU: state.battleMap.horizonSetShipSU,
    deleteShipFU: state.battleMap.deleteShipFU,
    deleteShipSU: state.battleMap.deleteShipSU,
    settingShipUser: state.battleMap.settingShipUser,
    FUTurn: state.battleMap.FUTurn.turn,
    comp: state.battleMap.comp,
    lookSecondUser: state.battleMap.lookSecondUser,

})




export default compose(connect(mapStateToProps,
    {setFirstUserMap,setSecondUserMap,toBeginSettingShip,finishSettingShip,
        setShipFirstUser,setShipSecondUser,setShotFirstUser,setShotSecondUser,toggleSettingShip,
        unlockForSetShip,lockAllMap ,setWhatSetShip,setHorizon,toggleDeleteShip,deleteShipFUonMap,deleteShipSUonMap,
        startGame,increaseSectorFire,setCompGame,toggleLookSecondUser}))(PlaceBattleContainer)