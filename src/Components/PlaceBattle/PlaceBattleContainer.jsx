import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import PlaceBattle from "./PlaceBattle";
import {setFirstUserMap, setSecondUserMap, userShot} from "../../redux/battleMap-reduсer";

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
    firstUserMap: state.battleMap.firstUserMap,
    secondUserMap: state.battleMap.secondUserMap,
    firstUserTurn: state.battleMap.firstUserTurn,
})




export default compose(connect(mapStateToProps,{setFirstUserMap,setSecondUserMap,userShot}))(PlaceBattleContainer)