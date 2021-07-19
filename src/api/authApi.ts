import $api, {API_URL} from "./index";
import axios from "axios";

export  type UserType={
    email: string,
    id: string
    isActivated: boolean
}
export type UserProfileType={
        name: string,
        id: string,
        status: string,
        photo: string,
        gameSBState: {
            numberOfGamesSB: number,
            numberOfWinsSB: number
        }

}
type AuthResponseType = {
    accessToken:string
    refreshToken:string
    user:UserType,
    profile:UserProfileType,
}

export const authAPI = {
    login(email: string, password: string,) {
        return $api.post<AuthResponseType>(`/login`, { email, password})
            .then(response => response.data)
            .catch(err => {
                if (err.response) {

                    // client received an error response (5xx, 4xx)
                } else if (err.request) {

                    // client never received a response, or request never left
                } else {

                    // anything else
                }
            })
    },
    registration(email: string, password: string, name:string) {
        return $api.post<AuthResponseType>(`/registration`, { email, password, name})
            .then(response => response.data);
    },
    logout() {
        return $api.post<any>(`/logout`)
            .then(response => response.data)

    },
    refresh(){
        return axios.get<AuthResponseType>(`${API_URL}/refresh`,{
            withCredentials: true,
        }).then(response => response.data)
    }
}
