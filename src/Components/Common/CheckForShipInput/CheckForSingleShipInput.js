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

export const checkForSingleShipInput = (map) => {
    let userMap = map
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (lookAroundNoShip(i, j, userMap)) {
                userMap[i][j].sector.unlock = true
            }
        }
    }
    return userMap
}

export const checkForDoubleShipInput = (map, horizon) => {
    let userMap = map
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (horizon) {
                if (lookAroundNoShip(i, j, userMap) &&
                    lookRightNoShip(i, j, 1, userMap)) {
                    userMap[i][j].sector.unlock = true
                }
            } else {
                if (lookAroundNoShip(i, j, userMap) &&
                    lookDownNoShip(i, j, 1, userMap)) {
                    userMap[i][j].sector.unlock = true
                }
            }
        }
    }
    return userMap
}


export const checkForThreeShipInput = (map, horizon) => {
    let userMap = map
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (horizon) {
                if (lookAroundNoShip(i, j, userMap) &&
                    lookRightNoShip(i, j, 1, userMap) &&
                    lookRightNoShip(i, j, 2, userMap)) {
                    userMap[i][j].sector.unlock = true
                }
            } else {
                if (lookAroundNoShip(i, j, userMap) &&
                    lookDownNoShip(i, j, 1, userMap) &&
                    lookDownNoShip(i, j, 2, userMap)) {
                    userMap[i][j].sector.unlock = true
                }
            }
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


/*
export const checkForDoubleShipInput = (Map) => {
    let userMap = Map
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if ((lookAroundNoShip(i, j, userMap)) &&
                ((!(i === 0) && lookAroundNoShip(i - 1, j, userMap)) ||
                    (!(i === 9) && lookAroundNoShip(i + 1, j, userMap)) ||
                    (!(j === 0) && lookAroundNoShip(i, j - 1, userMap)) ||
                    (!(j === 9) && lookAroundNoShip(i, j + 1, userMap)))
            )
            {
                userMap[i][j].sector.unlock = true
            }
        }
    }
    return userMap
}
export const checkForThreeShipInput = (Map) => {
    let userMap = Map
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if ((lookAroundNoShip(i, j, userMap)) &&
                (
                    ((!(i === 0) && lookAroundNoShip(i - 1, j, userMap)) && (!(i === 9) && lookAroundNoShip(i + 1, j, userMap))) ||
                    ((!(j === 0) && lookAroundNoShip(i, j - 1, userMap)) && (!(j === 9) && lookAroundNoShip(i, j + 1, userMap))) ||
                    (!(i === 0) && !(i === 1) && lookAroundNoShip(i - 2, j, userMap)) ||
                    (!(i === 9) && !(i === 8) && lookAroundNoShip(i + 2, j, userMap)) ||
                    (!(j === 0) && !(j === 1) && lookAroundNoShip(i, j - 2, userMap)) ||
                    (!(j === 9) && !(j === 8) && lookAroundNoShip(i, j + 2, userMap))
                )) {
                userMap[i][j].sector.unlock = true
            }
        }
    }
    return userMap
}
const lookLeftNoShip = (i, j, x, userMap) => {
    return (
        (!userMap[i + 1]?.[j - x]?.sector.ship) &&
        (!userMap[i - 1]?.[j - x]?.sector.ship) &&
        (!userMap[i][j - x]?.sector.ship));
}

const lookUpNoShip = (i, j, x, userMap) => {
    return (
        (!userMap[i - x]?.[j].sector.ship) &&
        (!userMap[i - x]?.[j + 1]?.sector.ship) &&
        (!userMap[i - x]?.[j - 1]?.sector.ship)
    );

}*/
