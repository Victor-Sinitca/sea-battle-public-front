import React, {FC, useEffect} from "react";
import {initAnimationList, initMapGame3inLine} from "./gameLogic/initMapGame3inLine";
import {useDispatch, useSelector} from "react-redux";
import {getAnimationList, getDeskState, getGemsCount, getMap} from "../../redux/threeInLine-selectors";
import {threeInLineAction} from "../../redux/threeInLine-reduser";
import {Game} from "./Game";


export const GameContainer: FC = () => {
    const dispatch = useDispatch()
    const map = useSelector(getMap)
    const deskState = useSelector(getDeskState)
    const gemsCount = useSelector(getGemsCount)
    const animationList = useSelector(getAnimationList)

    useEffect(() => {
            console.log(`initMapGame3inLine + ${gemsCount}`)
            dispatch(threeInLineAction.setMap(initMapGame3inLine(deskState.x, deskState.y,gemsCount)))
            dispatch(threeInLineAction.setAnimationList(initAnimationList(deskState.x, deskState.y)))
    }, [gemsCount])



    return <>
        {map && animationList && <Game map = {map} gemsCount={gemsCount} animationList={animationList}/>}
    </>

}

