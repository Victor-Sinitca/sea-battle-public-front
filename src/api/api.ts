import axios, {AxiosRequestConfig} from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
   /* withCredentials: true,*/
} as AxiosRequestConfig)

export function setToken(token:string) {
    debugger
    axios.defaults.headers.common.Authorization =`Token ${token}`
}









