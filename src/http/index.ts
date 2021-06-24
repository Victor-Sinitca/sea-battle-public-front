import axios, {AxiosRequestConfig} from "axios";

export const API_URL = 'http://localhost:8000/api'

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
} as AxiosRequestConfig)

$api.interceptors.request.use((config) => {
    config.headers.Authorization= `Bearer ${localStorage.getItem(`token`)}`
    return config
})






export default $api
