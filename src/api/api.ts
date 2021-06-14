import axios, {AxiosRequestConfig} from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "1507513b-81e2-4247-a472-80db1a3a25c5  "}
} as AxiosRequestConfig)
//1507513b-81e2-4247-a472-80db1a3a25c5     patron000 google
//0f0449e0-2e9d-4d6b-b73c-ae7838178e5f     patron  mail









