import React, {FC} from "react";
import Desk from "./DeskGame";


function initMap() {
    let map = Array.from(Array(10), () => new Array(10))
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            map[i][j] = {
                sector: {
                    x: j,
                    y: i,
                    color: "red"
                }
            }
        }
    }
    return map
}


export const Game: FC = () => {
    const map = initMap()
    const click = ()=>{
        console.log("click enter")

    }


    return <div>
        <Desk userMap={map} returnToClick={click}/>
    </div>
}
