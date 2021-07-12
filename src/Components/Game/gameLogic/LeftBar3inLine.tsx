import React, {FC} from "react";
import {initMapGame3inLine} from "./initMapGame3inLine";
import {checkMap} from "./checkMap";
import {boomFunc} from "./boomFunc";
import {findBonusBumFunc} from "./findBonusBumFunc";
import {checkMapOnMove} from "./checkMapOnMove";
import {initMapGame3inLineFalseGame} from "./initMapGame3inLineFalseGame";
import {useDispatch, useSelector} from "react-redux";
import {
    getAddScore,
    getDeskState,
    getGemsCount,
    getIsDevMode,
    getMap,
    getScore
} from "../../../redux/threeInLine-selectors";
import {threeInLineAction} from "../../../redux/threeInLine-reduser";
import {MapsGameType} from "../DeskGame";

type PropsType = {
    map: MapsGameType
    gemsCount: number
    setEndMove: React.Dispatch<React.SetStateAction<boolean>>
}

export const LeftBar3inLine: FC<PropsType> = ({map, setEndMove, gemsCount}) => {
    const dispatch = useDispatch()
    const score = useSelector(getScore)
    const addScore = useSelector(getAddScore)
    /* const map = useSelector(getMap)*/
    const deskState = useSelector(getDeskState)
    const isDevMode = useSelector(getIsDevMode)

    const onClickBum = () => {
        dispatch(threeInLineAction.setPrevMap(JSON.parse(JSON.stringify(map))))
        let boomFuncState = boomFunc(map, gemsCount)
        dispatch(threeInLineAction.setMap(boomFuncState.map))
        dispatch(threeInLineAction.setAddScore(boomFuncState.score))
        dispatch(threeInLineAction.setScore(score + boomFuncState.score))
        dispatch(threeInLineAction.setIsEndTurn(false))
    }
    const onClickFindBonus = () => {
        dispatch(threeInLineAction.setPrevMap(JSON.parse(JSON.stringify(map))))
        dispatch(threeInLineAction.setMap(findBonusBumFunc(map)))
    }
    const onClickCheckIsBum = () => {
        dispatch(threeInLineAction.setPrevMap(JSON.parse(JSON.stringify(map))))
        const newMap = checkMap(map)
        if (newMap.isBum) {
            dispatch(threeInLineAction.setMap(newMap.map))
        }
    }

    const newMap = () => {
        if (!checkMapOnMove(map)) {
            dispatch(threeInLineAction.setMap(initMapGame3inLine(deskState.x, deskState.y , gemsCount)))
            setEndMove(false)
        }
    }
    const setMapOnClick = () => {
        dispatch(threeInLineAction.setMap(initMapGame3inLineFalseGame(deskState.x, deskState.y)))
    }


    const takeAwayLine = (value: "x" | "y") => {
        if (deskState[value] > 5) {
            let x = deskState[value] as number
            dispatch(threeInLineAction.setDeskState({
                ...deskState, [value]: x - 1
            }))
            dispatch(threeInLineAction.setMap(initMapGame3inLine(
                value === "x" ? deskState.x - 1 : deskState.x,
                value === "y" ? deskState.y - 1 : deskState.y,
                gemsCount
            )))
        }
    }

    const addLine = (value: "x" | "y") => {
        let x = deskState[value] as number
        dispatch(threeInLineAction.setDeskState({
            ...deskState, [value]: x + 1
        }))
        dispatch(threeInLineAction.setMap(initMapGame3inLine(
            value === "x" ? deskState.x + 1 : deskState.x,
            value === "y" ? deskState.y + 1 : deskState.y,
            gemsCount
        )))
    }
    const changeSizeSector = (add: boolean) => {
        if (add) {
            dispatch(threeInLineAction.setDeskState({
                ...deskState, length: deskState.length + 1
            }))
        } else if (deskState.length > 10) {
            dispatch(threeInLineAction.setDeskState({
                ...deskState, length: deskState.length - 1
            }))
        }

    }
    const changeCountGems = (add: boolean) => {
        if (add) {
            dispatch(threeInLineAction.setGemsCount(gemsCount + 1))
        } else if (deskState.length > 10) {
            dispatch(threeInLineAction.setGemsCount(gemsCount - 1))
        }
    }


    return <div>
        <div>
            <FieldChangeButtons label={"по вертикали:"} value={"x"} addLine={addLine} takeAwayLine={takeAwayLine}/>
            <FieldChangeButtons label={"по горизонтали:"} value={"y"} addLine={addLine} takeAwayLine={takeAwayLine}/>
            <div> маштаб:
                <div>
                    <button onClick={() => {
                        changeSizeSector(true)
                    }}>+
                    </button>
                    <button onClick={() => {
                        changeSizeSector(false)
                    }}>-
                    </button>
                </div>
            </div>
            <div> оличество камней: {gemsCount}
                <div>
                    <button disabled={gemsCount > 7} onClick={() => {
                        changeCountGems(true)
                    }}>+
                    </button>
                    <button disabled={gemsCount < 5} onClick={() => {
                        changeCountGems(false)
                    }}>-
                    </button>
                </div>
            </div>
        </div>
        <div>
            <div>очки:</div>
            <div>{score}</div>
            <div>+{addScore}</div>
        </div>
        <div>
            <div style={{paddingTop: 40, paddingBottom: 40}}>
                <button onClick={() => dispatch(threeInLineAction.setIsDevMode(!isDevMode))}>установка режима</button>
            </div>
            {isDevMode && <>
                <div>
                    <button onClick={onClickCheckIsBum}>check is bum</button>
                </div>
                <div>
                    <button onClick={onClickFindBonus}>find bonus</button>
                </div>
                <div>
                    <button onClick={onClickBum}>bum</button>
                </div>
                  <button onClick={newMap}>new map</button>
                  <button onClick={setMapOnClick}>set map</button>
            </>}
        </div>
    </div>
}

type FieldChangeButtonsType = {
    label: string,
    addLine: (value: "x" | "y") => void,
    takeAwayLine: (value: "x" | "y") => void,
    value: "x" | "y"
}
const FieldChangeButtons: FC<FieldChangeButtonsType> = ({label, addLine, takeAwayLine, value}) => {
    return <div> {label}
        <div>
            <button onClick={() => {
                addLine(value)
            }}>+
            </button>
            <button onClick={() => {
                takeAwayLine(value)
            }}>-
            </button>
        </div>

    </div>
}
