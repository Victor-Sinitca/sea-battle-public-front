import {MapsType} from "../../../../Types/Types";

export const initializeTheMapFunction=(userMap:MapsType | null):MapsType=>{
    let map:MapsType ,
        i:number ,
        j:number
    if(userMap){
        map=userMap
    } else  map=[[]]

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