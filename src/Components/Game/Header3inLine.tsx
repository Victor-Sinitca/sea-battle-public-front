import React, {FC} from "react";
import {initMapGame3inLine} from "./gameLogic/initMapGame3inLine";
import {checkMap} from "./gameLogic/checkMap";
import {findBonusBumFunc} from "./gameLogic/findBonusBumFunc";
import {checkMapOnMove} from "./gameLogic/checkMapOnMove";
import {initMapGame3inLineFalseGame} from "./gameLogic/initMapGame3inLineFalseGame";
import {useDispatch, useSelector} from "react-redux";
import {
    getAddScore,
    getDeskState,
    getIsDevMode,
    getIsEndTurn,
    getMap,
    getScore
} from "../../redux/threeInLine-selectors";
import {threeInLineAction} from "../../redux/threeInLine-reduser";
import {MapsGameType} from "./DeskGame";
import {boomFunc1} from "./gameLogic/boomFunc1";
import s from "./Game.module.css";

type PropsType = {
    map: MapsGameType
    gemsCount: number
    setEndMove: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header3inLine: FC<PropsType> = React.memo(({map, setEndMove, gemsCount}) => {
    const dispatch = useDispatch()
    const score = useSelector(getScore)
    const addScore = useSelector(getAddScore)
    const deskState = useSelector(getDeskState)
    const isDevMode = useSelector(getIsDevMode)
    const isEndTurn = useSelector(getIsEndTurn)

    const onClickBum = () => {
        dispatch(threeInLineAction.setPrevMap(JSON.parse(JSON.stringify(map))))
        let boomFuncState = boomFunc1(map, gemsCount)
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
            dispatch(threeInLineAction.setMap(initMapGame3inLine(deskState.x, deskState.y, gemsCount)))
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


    return <div className={s.displayHeader}>
        <div className={s.buttonHeader}>
            <FieldChangeButtons label={`вертикаль: ${map.length} `} value={"x"} addLine={addLine}
                                takeAwayLine={takeAwayLine}/>
            <FieldChangeButtons label={`горизонталь: ${map[0].length}`} value={"y"} addLine={addLine}
                                takeAwayLine={takeAwayLine}/>
            <div> масштаб:
                <div>
                    <button style={{width: "50%"}} onClick={() => {
                        changeSizeSector(true)
                    }}>+
                    </button>
                    <button style={{width: "50%"}} onClick={() => {
                        changeSizeSector(false)
                    }}>-
                    </button>
                </div>
            </div>
            <div> количество камней: {gemsCount}
                <div>
                    <button style={{width: "50%"}} disabled={gemsCount > 7} onClick={() => {
                        changeCountGems(true)
                    }}>+
                    </button>
                    <button style={{width: "50%"}} disabled={gemsCount < 5} onClick={() => {
                        changeCountGems(false)
                    }}>-
                    </button>
                </div>
            </div>
        </div>
        <div className={s.infoBar}>
            <div>
                <div className={s.header}>очки:{score}</div>
                <div className={s.header}>+{addScore}</div>
            </div>
            <div>
                <div className={s.header}>
                    {isDevMode ? <>РАЗРАБОТЧИК</> : <>ИГРА</>}
                </div>
                <div className={s.header}>
                    {isEndTurn
                        ? <>ждите</>
                        : <>ваш ход</>}
                </div>
            </div>
            <div>
                <div>
                    <button onClick={() => dispatch(threeInLineAction.setIsDevMode(!isDevMode))}>установка режима
                    </button>
                </div>
                {isDevMode && <div>
                    <div>
                        <button onClick={onClickCheckIsBum}>check bum</button>
                        <button onClick={onClickFindBonus}>find bonus</button>
                        <button onClick={onClickBum}>bum</button>
                    </div>
                    <div>
                        <button onClick={newMap}>new map</button>
                        <button onClick={setMapOnClick}>set map</button>
                    </div>
                </div>}
            </div>

        </div>
    </div>
})

type FieldChangeButtonsType = {
    label: string,
    addLine: (value: "x" | "y") => void,
    takeAwayLine: (value: "x" | "y") => void,
    value: "x" | "y"
}
const FieldChangeButtons: FC<FieldChangeButtonsType> = React.memo(({label, addLine, takeAwayLine, value}) => {
    return <div> {label}
        <div>
            <button style={{width: "50%"}} onClick={() => {
                addLine(value)
            }}>+
            </button>
            <button style={{width: "50%"}} onClick={() => {
                takeAwayLine(value)
            }}>-
            </button>
        </div>
    </div>
})
