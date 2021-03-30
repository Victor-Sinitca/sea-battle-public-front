function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const lookAroundNoShip = (i, j, userMap) => {
    return (!userMap[i + 1]?.[j].sector.ship) &&
        (!userMap[i + 1]?.[j + 1]?.sector.ship) &&
        (!userMap[i + 1]?.[j - 1]?.sector.ship) &&
        (!userMap[i - 1]?.[j].sector.ship) &&
        (!userMap[i - 1]?.[j + 1]?.sector.ship) &&
        (!userMap[i - 1]?.[j - 1]?.sector.ship) &&
        (!userMap[i][j].sector.ship) &&
        (!userMap[i][j + 1]?.sector.ship) &&
        (!userMap[i][j - 1]?.sector.ship);
}
const lookAroundNoFire = (i, j, userMap) => {
    return (!userMap[i + 1]?.[j].sector.shot) &&
        (!userMap[i + 1]?.[j + 1]?.sector.shot) &&
        (!userMap[i + 1]?.[j - 1]?.sector.shot) &&
        (!userMap[i - 1]?.[j].sector.shot) &&
        (!userMap[i - 1]?.[j + 1]?.sector.shot) &&
        (!userMap[i - 1]?.[j - 1]?.sector.shot) &&
        (!userMap[i][j].sector.shot) &&
        (!userMap[i][j + 1]?.sector.shot) &&
        (!userMap[i][j - 1]?.sector.shot);
}



const lookRightNoShip = (i, j, x, userMap) => {
    return (
        (!userMap[i + 1]?.[j + x]?.sector.ship) &&
        (!userMap[i - 1]?.[j + x]?.sector.ship) &&
        (!userMap[i][j + x]?.sector.ship));
}
const lookDownNoShip = (i, j, x, userMap) => {
    return (
        (!userMap[i + x]?.[j].sector.ship) &&
        (!userMap[i + x]?.[j + 1]?.sector.ship) &&
        (!userMap[i + x]?.[j - 1]?.sector.ship)
    )
}
export const lockMap = (map) => {
    let userMap = map
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            userMap[i][j].sector.unlock = false
        }
    }
    return userMap
}

export const checkForShipInput = (map, horizon, shipValue) => {
    let userMap = map
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (horizon) {
                if (lookAroundNoShip(i, j, userMap) &&
                    (j<(11-shipValue))&&
                    (shipValue < 2 || lookRightNoShip(i, j, 2, userMap)) &&
                    (shipValue < 3 || lookRightNoShip(i, j, 3, userMap)) &&
                    (shipValue < 4 || lookRightNoShip(i, j, 4, userMap))
                    ) {
                    userMap[i][j].sector.unlock = true
                }
            } else {
                if (lookAroundNoShip(i, j, userMap) &&
                    (i<(11-shipValue))&&
                    (shipValue < 2 || lookDownNoShip(i, j, 2, userMap)) &&
                    (shipValue < 3 || lookDownNoShip(i, j, 3, userMap)) &&
                    (shipValue < 4 || lookDownNoShip(i, j, 4, userMap))
                    ) {
                    userMap[i][j].sector.unlock = true
                }
            }
        }
    }
    return userMap
}
export const checkForShipInputComp = (map, horizon, shipValue) => {
    let userMap = map
    let shipInputState=[]
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (horizon) {
                if (lookAroundNoShip(i, j, userMap) &&
                    (j<(11-shipValue))&&
                    (shipValue < 2 || lookRightNoShip(i, j, 2, userMap)) &&
                    (shipValue < 3 || lookRightNoShip(i, j, 3, userMap)) &&
                    (shipValue < 4 || lookRightNoShip(i, j, 4, userMap))
                ) {
                    userMap[i][j].sector.unlock = true
                    shipInputState.push(userMap[i][j].sector)
                }
            } else {
                if (lookAroundNoShip(i, j, userMap) &&
                    (i<(11-shipValue))&&
                    (shipValue < 2 || lookDownNoShip(i, j, 2, userMap)) &&
                    (shipValue < 3 || lookDownNoShip(i, j, 3, userMap)) &&
                    (shipValue < 4 || lookDownNoShip(i, j, 4, userMap))
                ) {
                    userMap[i][j].sector.unlock = true
                    shipInputState.push(userMap[i][j].sector)
                }
            }
        }
    }
    return shipInputState
}


export const checkForShipFireComp = (map) => {

    let userMap = map
    let shipInputState=[]
    let turn=true

    while (turn){
        let random =getRandomInt(2)
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (random===0) {
                    if (!userMap[i][j].sector.shot) {
                        userMap[i][j].sector.unlock = true
                        shipInputState.push(userMap[i][j].sector)
                    }
                } else if (random===1) {
                    if (lookAroundNoFire(i, j, userMap)) {
                        userMap[i][j].sector.unlock = true
                        shipInputState.push(userMap[i][j].sector)
                    }
                }
            }
        }
        if (shipInputState.length>0){
            turn=false
        }
    }
    return shipInputState
}
