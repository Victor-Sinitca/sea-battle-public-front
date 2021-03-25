import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import PlaceBattle from "./PlaceBattle";
import {
    finishSettingShip,
    setFirstUserMap,
    setSecondUserMap,
    setShip, setShipFirstUser, setShipSecondUser, setShotFirstUser, setShotSecondUser,
    toBeginSettingShip, toggleSettingShip,
    userShot
} from "../../redux/battleMap-reduсer";

/*

if (!this.props.firstUserMap){
    let UserMap = [], i, j
    for (i=0; i<10; i++){
        UserMap[i]=[]
        for (j=0; j<10; j++){
            UserMap[i][j]=1
        }
    }
    this.props.setFirstUserMap(UserMap)
}
if (!this.props.secondUserMap){
    let UserMap = [[]], i, j
    for (i=0; i<10; i++){
        UserMap[i]=[]
        for (j=0; j<10; j++){
            UserMap[i][j]=1
        }
    }
    this.props.setSecondUserMap(UserMap)
}

*/


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
        setShipFirstUser,setShipSecondUser,setShotFirstUser,setShotSecondUser,toggleSettingShip}))(PlaceBattleContainer)