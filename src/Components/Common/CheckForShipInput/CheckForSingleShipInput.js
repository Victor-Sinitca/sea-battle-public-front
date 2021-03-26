const lookAroundNoShip = (i, j, userMap) => {
    return (i === 9 || !userMap[i + 1][j].sector.ship) &&
        (i === 9 || j === 9 || !userMap[i + 1][j + 1].sector.ship) &&
        (i === 9 || j === 0 || !userMap[i + 1][j - 1].sector.ship) &&
        (i === 0 || !userMap[i - 1][j].sector.ship) &&
        (i === 0 || j === 9 || !userMap[i - 1][j + 1].sector.ship) &&
        (i === 0 || j === 0 || !userMap[i - 1][j - 1].sector.ship) &&
        (!userMap[i][j].sector.ship) &&
        (j === 9 || !userMap[i][j + 1].sector.ship) &&
        (j === 0 || !userMap[i][j - 1].sector.ship);
}

export const lockMap =(Map)=>{
    let userMap = Map
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            userMap[i][j].sector.unlock = false
        }
    }
    return userMap
}


export const checkForSingleShipInput = (Map) => {
    let userMap = Map
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (lookAroundNoShip(i, j, userMap)) {
                userMap[i][j].sector.unlock = true
            }
        }
    }
    return userMap
}

export const checkForDoubleShipInput = (Map) => {
     let userMap = Map
     for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
               if ((lookAroundNoShip(i, j, userMap)) &&
                   ( (!(i===0) && lookAroundNoShip(i - 1, j, userMap)) ||
                       (!(i === 9) && lookAroundNoShip(i+1, j, userMap)) ||
                       (!(j === 0) &&lookAroundNoShip(i, j - 1, userMap)) ||
                       (!(j === 9) && lookAroundNoShip(i, j+1, userMap)))) {
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
                    ((!(i===0) && lookAroundNoShip(i - 1, j, userMap))&&(!(i === 9) &&lookAroundNoShip(i + 1, j, userMap)))||
                    ((!(j===0) && lookAroundNoShip(i , j-1, userMap))&&(!(j === 9) &&lookAroundNoShip(i , j+ 1, userMap)))||
                    (!(i===0) && !(i === 1) && lookAroundNoShip(i - 2, j, userMap)) ||
                    (!(i === 9) && !(i === 8) && lookAroundNoShip(i + 2, j, userMap)) ||
                    (!(j === 0) && !(j === 1) && lookAroundNoShip(i, j - 2, userMap)) ||
                    (!(j === 9) && !(j === 8) && lookAroundNoShip(i, j + 2, userMap))
                ))
            {userMap[i][j].sector.unlock = true}
        }
    }
    return userMap
}

export const checkForFourShipInput = (Map) => {
     let userMap = Map
     for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
               if ((lookAroundNoShip(i + 1, j, userMap)) &&
                   ( (i>0 && lookAroundNoShip(i - 1, j, userMap)) ||
                       (i<9 && lookAroundNoShip(i, j + 1, userMap)) ||
                       (j>0 &&lookAroundNoShip(i, j - 1, userMap)) ||
                       (j<9 && lookAroundNoShip(i+1, j, userMap)))) {
                    userMap[i][j].sector.unlock = true
               }
          }
     }
     return userMap
}