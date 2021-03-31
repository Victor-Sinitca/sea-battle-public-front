const pushShip = (left, right) => {
    let stateShip = []
    stateShip.push(left)
    if (right) {
        stateShip.push(right)
    }
    return stateShip
}

export const killShip = (sector, map1, ships, FUTurn, comp) => {
    let stateShip = []
    let map = map1;
    let i = sector.y, j = sector.x;
    let kill = true, iMax = null, iMin = null, jMax = null, jMin = null
    if (map[i][j].sector.ship) {
        iMin = i - 1;
        iMax = i + 1;
        jMin = j - 1;
        jMax = j + 1;


        //проверка по вертикали
        if (map[i - 1]?.[j].sector.ship) { //есть ли корабль слева на -1
            if (map[i - 1][j].sector.shot) { // подбит ли
                if (map[i - 2]?.[j].sector.ship) { // если подбит    есть ли корабль с лева на -2
                    if (map[i - 2][j].sector.shot) { //подбит ли корабль с лева на -2
                        if (map[i - 3]?.[j].sector.ship) { // если подбит    есть ли корабль с лева на -3
                            if (map[i - 3][j].sector.shot) { //если есть корабль на -3 подбит ли он
                                kill = true;
                                iMin = i - 4;
                                ships.numberShips4-- // УБИТ 000x
                            } else {
                                kill = false;
                                comp.sector = pushShip(map[i - 3][j].sector, map[i + 1]?.[j].sector)
                            } // если слева на -3 не подбит - НЕ УБИТ k00x
                        } else if (map[i + 1]?.[j].sector.ship) { //если -1 подбит, -2 подбит, -3 нет корабля - есть ли корабль на +1
                            if (map[i + 1][j].sector.shot) { //если есть корабль на +1 подбит ли он
                                kill = true;
                                iMin = i - 3;
                                iMax = i + 2;
                                ships.numberShips4-- // УБИТ 00x0
                            } else {
                                kill = false
                            } // если  на +1 не подбит - НЕ УБИТ
                        } else {
                            kill = true;
                            iMin = i - 3;
                            ships.numberShips3--
                        } //усли  на +1  корабля нет  - УБИТ 00x
                    } else {
                        kill = false
                    } // если слева ан а -2 не подбит - НЕ УБИТ
                } else if (map[i + 1]?.[j].sector.ship) {  // если слева на -1 есть и подбит, далее с лева на -2 пусто, а справа на +1 есть
                    if (map[i + 1][j].sector.shot) { // если справан а +1 подбит
                        if (map[i + 2]?.[j].sector.ship) {  // если справан а +2 есть корабль
                            if (map[i + 2][j].sector.shot) { //если справан а +2  подбит
                                kill = true;
                                iMin = i - 2;
                                iMax = i + 3;
                                ships.numberShips4--  // УБИТ 0x00
                            } else {
                                kill = false
                            } // если справан а +2 не подбит - НЕ УБИТ
                        } else {
                            kill = true;
                            iMin = i - 2;
                            iMax = i + 2;
                            ships.numberShips3--
                        }  // если справа на +2 нет корабля - УБИТ 0x0
                    } else {
                        kill = false
                    } // если справан а +1 не подбит - НЕ УБИТ
                } else {
                    kill = true;
                    iMin = i - 2;
                    ships.numberShips2--
                } // если слева на -1 есть и подбит, далее с лева на -2 пусто, и с права на +1 нет - УБИТ 0x
            } else {
                kill = false
            }  //корабль есть но не подбит - НЕ УБИТ
        } else if (map[i + 1]?.[j].sector.ship) {
            if (map[i + 1][j].sector.shot) {
                if (map[i + 2]?.[j].sector.ship) {
                    if (map[i + 2][j].sector.shot) {
                        if (map[i + 3]?.[j].sector.ship) {
                            if (map[i + 3][j].sector.shot) {
                                kill = true;
                                iMax = i + 4;
                                ships.numberShips4-- // убит x000
                            } else {
                                kill = false
                            } // на -1 нет корабля на +1 есть на +2 на+3 есть но не убит  - НЕ УБИТ
                        } else {
                            kill = true;
                            iMax = i + 3;
                            ships.numberShips3--
                        } //  на -1 нет  на +1 есть на +2 есть на +3 нет  -УБИТ x00
                    } else {
                        kill = false
                    } // на -1 нет корабля на +1 есть на +2 есть но не убит  - НЕ УБИТ
                } else {
                    kill = true;
                    iMax = i + 2;
                    ships.numberShips2--
                } // на -1 нет  на +1 есть на +2 нет  -УБИТ x0
            } else {
                kill = false
            } //на -1 нет корабля на +1 есть но не убит  - НЕ УБИТ


            //проверка по горизонтали

        } else if (map[i][j - 1]?.sector.ship) { //есть ли корабль слева на -1
            if (map[i][j - 1].sector.shot) { // подбит ли
                if (map[i][j - 2]?.sector.ship) { // если подбит    есть ли корабль с лева на -2
                    if (map[i][j - 2].sector.shot) { //подбит ли корабль с лева на -2
                        if (map[i][j - 3]?.sector.ship) { // если подбит    есть ли корабль с лева на -3
                            if (map[i][j - 3].sector.shot) { //если есть корабль на -3 подбит ли он
                                kill = true;
                                jMin = j - 4;
                                ships.numberShips4-- // УБИТ 000x
                            } else {
                                kill = false
                            } // если слева на -3 не подбит - НЕ УБИТ
                        } else if (map[i][j + 1]?.sector.ship) { //если -1 подбит, -2 подбит, -3 нет корабля - есть ли корабль на +1
                            if (map[i][j + 1].sector.shot) { //если есть корабль на +1 подбит ли он
                                kill = true;
                                jMin = j - 3;
                                jMax = j + 2;
                                ships.numberShips4-- // УБИТ 00x0
                            } else {
                                kill = false
                            } // если  на +1 не подбит - НЕ УБИТ
                        } else {
                            kill = true;
                            jMin = j - 3;
                            ships.numberShips3--
                        } //усли  на +1  корабля нет  - УБИТ 00x
                    } else {
                        kill = false
                    } // если слева ан а -2 не подбит - НЕ УБИТ
                } else if (map[i][j + 1]?.sector.ship) {  // если слева на -1 есть и подбит, далее с лева на -2 пусто, а справа на +1 есть
                    if (map[i][j + 1].sector.shot) { // если справан а +1 подбит
                        if (map[i][j + 2]?.sector.ship) {  // если справан а +2 есть корабль
                            if (map[i][j + 2].sector.shot) { //если справан а +2  подбит
                                kill = true;
                                jMin = j - 2;
                                jMax = j + 3;
                                ships.numberShips4--  // УБИТ 0x00
                            } else {
                                kill = false
                            } // если справан а +2 не подбит - НЕ УБИТ
                        } else {
                            kill = true;
                            jMin = j - 2;
                            jMax = j + 2;
                            ships.numberShips3--
                        }  // если справа на +2 нет корабля - УБИТ 0x0
                    } else {
                        kill = false
                    } // если справан а +1 не подбит - НЕ УБИТ
                } else {
                    kill = true;
                    jMin = j - 2;
                    ships.numberShips2--
                } // если слева на -1 есть и подбит, далее с лева на -2 пусто, и с права на +1 нет - УБИТ 0x
            } else {
                kill = false
            }  //корабль есть но не подбит - НЕ УБИТ
        } else if (map[i][j + 1]?.sector.ship) {
            if (map[i][j + 1].sector.shot) {
                if (map[i][j + 2]?.sector.ship) {
                    if (map[i][j + 2].sector.shot) {
                        if (map[i][j + 3]?.sector.ship) {
                            if (map[i][j + 3].sector.shot) {
                                kill = true;
                                jMax = j + 4;
                                ships.numberShips4-- // убит x000
                            } else {
                                kill = false
                            } // на -1 нет корабля на +1 есть на +2 на+3 есть но не убит  - НЕ УБИТ
                        } else {
                            kill = true;
                            jMax = j + 3;
                            ships.numberShips3--
                        } //  на -1 нет  на +1 есть на +2 есть на +3 нет  -УБИТ x00
                    } else {
                        kill = false
                    } // на -1 нет корабля на +1 есть на +2 есть но не убит  - НЕ УБИТ
                } else {
                    kill = true;
                    jMax = j + 2;
                    ships.numberShips2--
                } // на -1 нет  на +1 есть на +2 нет  -УБИТ x0
            } else {
                kill = false
            } //на -1 нет корабля на +1 есть но не убит  - НЕ УБИТ
        } else ships.numberShips1--

        if (kill) { //если корабль убит отрисовываеются поподания по периметру
            if (iMin < 0) iMin = 0;
            if (iMax > 9) iMax = 9;
            if (jMin < 0) jMin = 0;
            if (jMax > 9) jMax = 9;
            for (i = iMin; i <= iMax; i++) {
                for (j = jMin; j <= jMax; j++) {
                    map[i][j].sector.shot = true
                }
            }
            comp.damaged = false //если комп убил, стреляет случайно

        } else {
            debugger
            if (comp.game) {//если комп попал, но не убил, продолжает стрелять рядом
                comp.sectorFire.length = 0
                if (map[i - 1]?.[j].sector.ship && map[i - 1]?.[j].sector.shot) { //Ищем части поврежденного корабля слева и запоминаем координаты следующих выстрелов
                    if (map[i - 2]?.[j].sector.ship && map[i - 2]?.[j].sector.shot) {
                        if ((i > 2) && !map[i - 3][j].sector.shot) {
                            comp.sectorFire.push(map[i - 3][j].sector)
                        }
                        if ((i < 9)&& !map[i +1][j].sector.shot) {
                            comp.sectorFire.push(map[i + 1][j].sector)
                        }
                    } else if (map[i + 1]?.[j].sector.ship && map[i + 1]?.[j].sector.shot) {
                        if ((i > 1) && !map[i - 2][j].sector.shot) {
                            comp.sectorFire.push(map[i - 2][j].sector)
                        }
                        if ((i < 8) && !map[i +2][j].sector.shot) {
                            comp.sectorFire.push(map[i + 2][j].sector)
                        }
                    } else {
                        if ((i > 1) && !map[i - 2][j].sector.shot) {
                            comp.sectorFire.push(map[i - 2][j].sector)
                        }
                        if ((i < 9) && !map[i +1][j].sector.shot) {
                            comp.sectorFire.push(map[i + 1][j].sector)
                        }
                    }
                } else if (map[i + 1]?.[j].sector.ship && map[i + 1]?.[j].sector.shot) { //Ищем части поврежденного корабля справа и запоминаем координаты следующих выстрелов
                    if (map[i + 2]?.[j].sector.ship && map[i + 2]?.[j].sector.shot) {
                        if ((i > 0) && !map[i - 1][j].sector.shot) {
                            comp.sectorFire.push(map[i - 1][j].sector)
                        }
                        if ((i < 7) && !map[i + 3][j].sector.shot) {
                            comp.sectorFire.push(map[i + 3][j].sector)
                        } else {
                            if ((i > 1) && !map[i - 1][j].sector.shot) {
                                comp.sectorFire.push(map[i - 1][j].sector)
                            }
                            if ((i < 8) && !map[i + 2][j].sector.shot) {
                                comp.sectorFire.push(map[i + 2][j].sector)
                            }
                        }
                    }else { //проверить
                        if ((i > 1) && !map[i - 1][j].sector.shot) {
                            comp.sectorFire.push(map[i - 1][j].sector)
                        }
                    }
                } else  if (map[i][j - 1]?.sector.ship && map[i][j - 1]?.sector.shot) { //Ищем части поврежденного корабля сверху и запоминаем координаты следующих выстрелов
                    if (map[i][j - 2]?.sector.ship && map[i][j - 2]?.sector.shot) {
                        if ((j > 2) && !map[i][j - 3].sector.shot) {
                            comp.sectorFire.push(map[i][j - 3].sector)
                        }
                        if ((j < 9) && !map[i][j + 1].sector.shot) {
                            comp.sectorFire.push(map[i][j + 1].sector)
                        }
                    } else if (map[i][j + 1]?.sector.ship && map[i][j + 1]?.sector.shot) {
                        if ((j > 1) && !map[i][j - 2].sector.shot) {
                            comp.sectorFire.push(map[i][j - 2].sector)
                        }
                        if ((j < 8) && !map[i][j + 2].sector.shot) {
                            comp.sectorFire.push(map[i][j + 2].sector)
                        }
                    } else {
                        if ((j > 1) && !map[i][j - 2].sector.shot) {
                            comp.sectorFire.push(map[i][j - 2].sector)
                        }
                        if ((j < 9) && !map[i][j + 1].sector.shot) {
                            comp.sectorFire.push(map[i][j + 1].sector)
                        }
                    }
                } else if (map[i][j + 1]?.sector.ship && map[i][j + 1]?.sector.shot) { //Ищем части поврежденного корабля снизу и запоминаем координаты следующих выстрелов
                    if (map[i][j + 2]?.sector.ship && map[i][j + 2]?.sector.shot) {
                        if ((j > 0) && !map[i][j - 1].sector.shot) {
                            comp.sectorFire.push(map[i][j - 1].sector)
                        }
                        if ((j < 7) && !map[i][j + 3].sector.shot) {
                            comp.sectorFire.push(map[i][j + 3].sector)
                        } else {
                            if ((j > 0) && !map[i][j - 1].sector.shot) {
                                comp.sectorFire.push(map[i][j - 1].sector)
                            }
                            if ((j < 8) && !map[i][j + 2].sector.shot) {
                                comp.sectorFire.push(map[i][j + 2].sector)
                            }
                        }
                    }else { //проверить
                        if ((j > 1) && !map[i][j - 1].sector.shot) {
                            comp.sectorFire.push(map[i][j - 1].sector)
                        }
                    }
                } else {
                    if ((j > 0) && !map[i][j - 1].sector.shot) {
                        comp.sectorFire.push(map[i][j-1].sector)
                    }
                    if ((j < 9) && !map[i][j + 1].sector.shot) {
                        comp.sectorFire.push(map[i][j+1].sector)
                    }
                    if ((i > 0) && !map[i-1][j].sector.shot) {
                        comp.sectorFire.push(map[i-1][j].sector)
                    }
                    if ((i < 9) && !map[i+1][j].sector.shot) {
                        comp.sectorFire.push(map[i+1][j].sector)
                    }
                }
                comp.damaged = true // корабль поврежден и не убит - стреляем рандомно  по запомненным коорднатам.
            }
        }
    } else { //если не попал в корабль - передается ход другому игроку
        if (!map[i][j].sector.ship.shot) { //передается ход только если попал в пустую от выстрела клетку (проверка для ручного ввода)
            FUTurn.turn = !FUTurn.turn;
        }
    }
    return map
}