function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const lookAroundNoProperty = (i, j, userMap, property) => { //проверка клеток вокруг сектора на наличие свойства fire ли ship
    return (!userMap[i + 1]?.[j].sector[property]) &&
        (!userMap[i + 1]?.[j + 1]?.sector[property]) &&
        (!userMap[i + 1]?.[j - 1]?.sector[property]) &&
        (!userMap[i - 1]?.[j].sector[property]) &&
        (!userMap[i - 1]?.[j + 1]?.sector[property]) &&
        (!userMap[i - 1]?.[j - 1]?.sector[property]) &&
        (!userMap[i][j].sector[property]) &&
        (!userMap[i][j + 1]?.sector[property]) &&
        (!userMap[i][j - 1]?.sector[property]);
}
const lookRightNoShip = (i, j, x, userMap) => { //проверка нет ля справа корабля
    return (
        (!userMap[i + 1]?.[j + x]?.sector.ship) &&
        (!userMap[i - 1]?.[j + x]?.sector.ship) &&
        (!userMap[i][j + x]?.sector.ship));
}
const lookDownNoShip = (i, j, x, userMap) => { //проверка нет ли внизу корабля
    return (
        (!userMap[i + x]?.[j].sector.ship) &&
        (!userMap[i + x]?.[j + 1]?.sector.ship) &&
        (!userMap[i + x]?.[j - 1]?.sector.ship)
    )
}
export const lockMap = (map) => { // заблокировать карту
    let userMap = map
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            userMap[i][j].sector.unlock = false
        }
    }
    return userMap
}


export const checkForShipInput = (map, horizon, shipValue, human) => { //разблокировка клеток, куда можно установить корабль
    let userMap = map
    let shipInputState = [] //массив для запоминания
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) { //проверка клетки
            if (horizon) { //если корабль горизонтальный
                if (lookAroundNoProperty(i, j, userMap,"ship") && //проверка есть ли рядом корабль
                    (j < (11 - shipValue)) &&
                    (shipValue < 2 || lookRightNoShip(i, j, 2, userMap)) && // если двойной дополнительная  проверка
                    (shipValue < 3 || lookRightNoShip(i, j, 3, userMap)) && // если тройной дополнительная  проверка
                    (shipValue < 4 || lookRightNoShip(i, j, 4, userMap)) // если четверной дополнительная  проверка
                ) {
                    human ? userMap[i][j].sector.unlock = true  //разблокировка клетки если человек
                          : shipInputState.push(userMap[i][j].sector) //запоминание клетки если ИИ

                }
            } else { //если корабль вертикальный
                if (lookAroundNoProperty(i, j, userMap,"ship") &&
                    (i < (11 - shipValue)) &&
                    (shipValue < 2 || lookDownNoShip(i, j, 2, userMap)) &&
                    (shipValue < 3 || lookDownNoShip(i, j, 3, userMap)) &&
                    (shipValue < 4 || lookDownNoShip(i, j, 4, userMap))
                ) {
                    human ? userMap[i][j].sector.unlock = true  //разблокировка клетки если человек
                        : shipInputState.push(userMap[i][j].sector) //запоминание клетки если ИИ
                }
            }
        }
    }
    if(human){
        return userMap //вернуть карту если человек
    }else{
        return shipInputState //вернуть массив для случайной расстановки если ИИ
    }
}

const fire2Cells = (i, j, userMap) => { // огонь в полосу 2
    return (!userMap[i][j].sector.shot) &&
        (!userMap[i + 1]?.[j].sector.shot || !userMap[i][j + 1]?.sector.shot)
}
const fireCenter3Cells = (i, j, userMap, horizon) => { //огонь в центр полосы 3
    if (horizon) {
        return (!userMap[i][j].sector.shot) &&
            (!userMap[i][j + 1]?.sector.shot) &&
            (!userMap[i][j - 1]?.sector.shot)
    } else {
        return (!userMap[i + 1]?.[j].sector.shot) &&
            (!userMap[i - 1]?.[j].sector.shot) &&
            (!userMap[i][j].sector.shot)
    }
}
const fireCenter5Cells = (i, j, userMap, horizon) => {//огонь в центр полосы 5
    if (horizon) {
        return (!userMap[i][j].sector.shot) &&
            (!userMap[i][j + 1]?.sector.shot) &&
            (!userMap[i][j + 2]?.sector.shot) &&
            (!userMap[i][j - 1]?.sector.shot) &&
            (!userMap[i][j - 2]?.sector.shot)
    } else {
        return (!userMap[i][j].sector.shot) &&
            (!userMap[i + 1]?.[j].sector.shot) &&
            (!userMap[i + 2]?.[j].sector.shot) &&
            (!userMap[i - 1]?.[j].sector.shot) &&
            (!userMap[i - 2]?.[j].sector.shot)
    }
}


export const checkForShipFireComp = (map,) => {
    let userMap = map
    let shipInputState = []
    let turn = true
    let randomValue = 8

    while (turn) {
        let random
        if (randomValue === 8) {
            random = randomValue - 1
        }
        if (randomValue === 7) {
            random = getRandomInt(2) + 5
        }
        if (randomValue === 6) {
            random = 5
        }
        if (randomValue === 5) {
            random = getRandomInt(2) + 3
        }
        if (randomValue === 4) {
            random = 3
        }
        if (randomValue === 3) {
            random = getRandomInt(2) + 1
        }
        if (randomValue === 2) {
            random = 1
        }
        if (randomValue === 1) {
            random = 0
        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (random === 0) {
                    if (!userMap[i][j].sector.shot) {
                        shipInputState.push(userMap[i][j].sector)
                    }
                } else if (random === 1) {
                    if (fire2Cells(i, j, userMap, false)) {
                        shipInputState.push(userMap[i][j].sector)
                    }
                } else if (random === 2) {
                    if (fire2Cells(i, j, userMap, false)) {
                        shipInputState.push(userMap[i][j].sector)
                    }
                } else if (random === 3) {
                    if (fireCenter3Cells(i, j, userMap, false)) {
                        shipInputState.push(userMap[i][j].sector)
                    }
                } else if (random === 4) {
                    if (fireCenter3Cells(i, j, userMap, true)) {
                        shipInputState.push(userMap[i][j].sector)
                    }
                } else if (random === 5) {
                    if (fireCenter5Cells(i, j, userMap, true)) {
                        shipInputState.push(userMap[i][j].sector)
                    }
                } else if (random === 6) {
                    //поиск и сохранения массива для стрельбы в центр полосы 5
                    if (fireCenter5Cells(i, j, userMap, false)) {
                        shipInputState.push(userMap[i][j].sector)
                    }
                } else if (random === 7) {
                    //поиск и сохранения массива для стрельбы в центр пустого кврадраат 3*3
                    if (lookAroundNoProperty(i, j, userMap,"shot")) {
                        shipInputState.push(userMap[i][j].sector)
                    }
                }
            }
        }
        if (shipInputState.length > 0) {
            turn = false
        } else randomValue--
    }
    return shipInputState
}
