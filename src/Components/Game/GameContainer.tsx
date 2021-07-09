import React, {FC, useEffect} from "react";
import {initMapGame3inLine} from "./gameLogic/initMapGame3inLine";
import {useDispatch, useSelector} from "react-redux";
import {getDeskState, getMap} from "../../redux/threeInLine-selectors";
import {threeInLineAction} from "../../redux/threeInLine-reduser";
import {Game} from "./Game";


export const GameContainer: FC = () => {
    const dispatch = useDispatch()
    const map = useSelector(getMap)
    const deskState = useSelector(getDeskState)

    useEffect(() => {
        if (!map) {
            dispatch(threeInLineAction.setMap(initMapGame3inLine(deskState.x, deskState.y)))
        }
    }, [])

    return <>
        {map && <Game map = {map}/>}
    </>

}

