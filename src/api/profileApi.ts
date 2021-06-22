import {instance, setToken} from "./api";


export type ProfileType = {
    _id: string,
    name: string,
    photo: string,
    status: string,
    seaBattleSate: {
        numberOfGames: number,
        numberOfWins: number,
        numberOfLosses: number
    }
}

export const profileAPI = {
    getProfile(token: string, userID: string) {
        debugger
        return instance.get<ProfileType>(`/users/profile/` + userID, {
            headers: {
                "Authorization": `Token ${token} `
            }
        }).then(response => response.data)
    },

    updateProfile(token: string, email: string, password: string,) {
        return instance.post<ProfileType>(`/users/profile`,
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
