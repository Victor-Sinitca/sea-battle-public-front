import $api from "./index";


export type ProfileType = {
    name:string,
    id:string,
    status:string,
    photo:string,
    gameSBState:{
        numberOfGamesSB:number,
        numberOfWinsSB:number,
    }
}

export const profileAPI = {
    getProfile(userID: string) {
        debugger
        return $api.get<ProfileType>(`/profile/` + userID).then(response => response.data)
    },

    updateProfile(token: string, email: string, password: string,) {
        return $api.post<ProfileType>(`/users/profile`,
            {
                user: {
                    email: email,
                    password: password
                },
            },
            {
                headers: {
                    "Authorization": `Token ${token} `
                }
            }).then(response => response.data)
    },
}
