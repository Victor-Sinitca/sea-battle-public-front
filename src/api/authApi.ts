import {instance, setToken} from "./api";


type MeType = {
    user: {
        _id: string,
        email: string,
        token: string
    }
}

export const authAPI = {
    getMe(token:string) {
        return instance.get<MeType>(`/users/current`, {
            headers: {
                "Authorization": `Token ${token} `
            }
        }).then(response =>  response.data)},

    getToLogin(email: string, password: string,) {
        return instance.post<MeType>(`/users/login`, {
            user: {
                email: email,
                password: password
            }
        }).then(response => response.data)
    },

    getAuthorization(email: string, password: string,) {
        debugger
        return instance.post<MeType>(`/users/`, {
            user: {
                email: email,
                password: password
            }
        })
            .then(response => {
                return response.data
            });
    },
}
