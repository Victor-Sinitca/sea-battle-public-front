export const initializeTheMapFunction=(userMap)=>{
    let userMap1 = userMap, i, j
    for (i = 0; i < 10; i++) {
        userMap[i] = []
        for (j = 0; j < 10; j++) {
            userMap1[i][j] = {
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
    return  userMap1
}