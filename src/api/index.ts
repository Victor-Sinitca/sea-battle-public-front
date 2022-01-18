import axios, {AxiosRequestConfig} from "axios";
import {authAPI} from "./authApi";

/*export const API_URL = "http://localhost:7000/api"
export const API_WS = "ws://localhost:7000"*/

export const API_URL = "https://my-game-server.herokuapp.com/api"
export const API_WS = "ws://my-game-server.herokuapp.com"
/*export const API_URL = '//localhost:7000/api'*/

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
} as AxiosRequestConfig)

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(`token`)}`
    return config
})

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (!error.response) {
            console.log("Please check your internet connection.");
        }
        return Promise.reject(error)
    }
)

$api.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (!error.response) {
            console.log("Please check your internet connection.");
        }
        return Promise.reject(error)
    }
)

$api.interceptors.response.use((config) => {
    return config
}, async error => {
    const originalRequest = error.config
    if (error.response.status === 401) {
        try {
            const data = await authAPI.refresh()
            localStorage.setItem('token', data.accessToken);
            return $api.request(originalRequest)
        } catch (e) {
            console.log("не авторизован в интерсепторе")
        }

    }
})


export default $api
