export const initializeTheMapFunction=(userMap)=>{
    let map = userMap, i, j
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            map[i][j] = {
                sector: {
                    ship: false,
                    shot: false,
                    x: j,
                    y: i,
                    unlock: false,
                    img: null
                }
            }
        }
    }
    return  map
}