import axios, {AxiosRequestConfig} from "axios";

export const instance = axios.create({
/*    baseURL: 'http://localhost:8000/api',*/
    baseURL: 'http://192.168.35.2:8000/api',

   /* withCredentials: true,*/
} as AxiosRequestConfig)

export function setToken(token:string) {
    axios.defaults.headers.common.Authorization =`Token ${token}`
}









