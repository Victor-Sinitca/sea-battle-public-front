import axios, {AxiosRequestConfig} from "axios";
import {authAPI} from "./authApi";

export const API_URL = "http://192.168.35.2:7000/api"
/*export const API_URL = '//localhost:7000/api'*/

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
} as AxiosRequestConfig)

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(`token`)}`
    return config
})

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
