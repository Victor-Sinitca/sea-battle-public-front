import React, {FC, useEffect} from "react";
import {initMapGame3inLine} from "./gameLogic/initMapGame3inLine";
import {useDispatch, useSelector} from "react-redux";
import {
    getAnimationCount,
    getAnimationCountEnd,
    getDeskState,
    getGemsCount,
    getMap
} from "../../redux/threeInLine-selectors";
import {deleteAnimationsThink, threeInLineAction} from "../../redux/threeInLine-reduser";
import {ThreeInLine} from "./ThreeInLine";


export const ThreeInLineContainer: FC = React.memo(() => {
    const dispatch = useDispatch()
    const map = useSelector(getMap)
    const deskState = useSelector(getDeskState)
    const gemsCount = useSelector(getGemsCount)
    const animationCount = useSelector(getAnimationCount)
    const animationCountEnd = useSelector(getAnimationCountEnd)


    useEffect(() => {
        // выполняем удаление анимаций из секторов и обнуляем счетчик анимаций для выполнения
        if (map && !(animationCount === 0 && animationCountEnd.count === 0) &&
            (animationCount === animationCountEnd.count)) {
            dispatch(deleteAnimationsThink(map,animationCountEnd))
        }
    }, [animationCount, animationCountEnd,dispatch,map])


    useEffect(() => {
        dispatch(threeInLineAction.setMap(initMapGame3inLine(deskState.x, deskState.y, gemsCount)))
    }, [gemsCount, deskState, dispatch])


    return <>
        {map && <ThreeInLine map={map} gemsCount={gemsCount} animationCount={animationCount}/>}
    </>

})

