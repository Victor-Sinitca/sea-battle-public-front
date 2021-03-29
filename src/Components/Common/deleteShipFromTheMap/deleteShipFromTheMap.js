


export const deleteShipFromTheMap=(map1, sector, ships)=>{
    let map=map1;
    let i =sector.y, j=sector.x;
    let iMax = null, iMin = null, jMax = null, jMin = null
    iMin = i;
    iMax = i;
    jMin = j;
    jMax = j;
    if (map[i][j].sector.ship){
        if (map[i - 1]?.[j].sector.ship) { //есть ли корабль слева на -1
                if (map[i - 2]?.[j].sector.ship) { // если подбит    есть ли корабль с лева на -2
                        if (map[i - 3]?.[j].sector.ship) { // если подбит    есть ли корабль с лева на -3
                                iMin = i-3; ships.ship4++ // УБИТ 000x
                        } else if (map[i +1]?.[j].sector.ship) { //если -1 подбит, -2 подбит, -3 нет корабля - есть ли корабль на +1
                                iMin = i-2 ; iMax=i+1; ships.ship4++ // УБИТ 00x0
                        }else {iMin = i-2; ships.numberShips3--} //усли  на +1  корабля нет  - УБИТ 00x
                } else if (map[i+1]?.[j].sector.ship) {  // если слева на -1 есть и подбит, далее с лева на -2 пусто, а справа на +1 есть
                        if(map[i+2]?.[j].sector.ship){  // если справан а +2 есть корабль
                                iMin =i-1; iMax=i+2; ships.ship4++  // УБИТ 0x00
                        }else  {iMin =i-1; iMax=i+1; ships.ship3++}  // если справа на +2 нет корабля - УБИТ 0x0
                }else  {iMin =i-1; ships.ship2++ } // если слева на -1 есть и подбит, далее с лева на -2 пусто, и с права на +1 нет - УБИТ 0x
        }else if(map[i+1]?.[j].sector.ship) {
                if(map[i+2]?.[j].sector.ship){
                        if(map[i+3]?.[j].sector.ship){
                                iMax =i+3; ships.ship4++ // убит x000
                        }else {iMax =i+2; ships.ship3++} //  на -1 нет  на +1 есть на +2 есть на +3 нет  -УБИТ x00
                }else {iMax =i+1; ships.ship2++} // на -1 нет  на +1 есть на +2 нет  -УБИТ x0


            //проверка по горизонтали

        } else if (map[i ][j- 1]?.sector.ship) { //есть ли корабль слева на -1
                if (map[i ][j- 2]?.sector.ship) { // если подбит    есть ли корабль с лева на -2
                        if (map[i ][j- 3]?.sector.ship) { // если подбит    есть ли корабль с лева на -3
                                jMin = j-3; ships.ship4++ // УБИТ 000x
                        } else if (map[i ][j+1]?.sector.ship) { //если -1 подбит, -2 подбит, -3 нет корабля - есть ли корабль на +1
                                jMin = j-2 ; jMax=j+1; ships.ship4++ // УБИТ 00x0
                        }else {jMin = j-2; ships.ship3++} //усли  на +1  корабля нет  - УБИТ 00x
                } else if (map[i][j+1]?.sector.ship) {  // если слева на -1 есть и подбит, далее с лева на -2 пусто, а справа на +1 есть
                        if(map[i][j+2]?.sector.ship){  // если справан а +2 есть корабль
                                jMin =j-1; jMax=j+2; ships.ship4++  // УБИТ 0x00
                        }else  {jMin =j-1; jMax=j+1; ships.ship3++}  // если справа на +2 нет корабля - УБИТ 0x0
                }else  {jMin =j-1; ships.ship2++ } // если слева на -1 есть и подбит, далее с лева на -2 пусто, и с права на +1 нет - УБИТ 0x
        }else if(map[i][j+1]?.sector.ship) {
                if(map[i][j+2]?.sector.ship){
                        if(map[i][j+3]?.sector.ship){
                                jMax =j+3; ships.ship4++ // убит x000
                        }else {jMax =j+2; ships.ship3++} //  на -1 нет  на +1 есть на +2 есть на +3 нет  -УБИТ x00
                }else {jMax =j+1; ships.ship2++} // на -1 нет  на +1 есть на +2 нет  -УБИТ x0
        }else  ships.ship1++;



        for(i=iMin; i<=iMax ; i++){
            for(j=jMin; j<=jMax ; j++){
                map[i][j].sector.ship = false
            }
        }
    }
    return map
}