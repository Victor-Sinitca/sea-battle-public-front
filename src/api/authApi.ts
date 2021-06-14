import { instance } from "./api";

export const authAPI = {
    getMe() {
        return instance.get<any>(`auth/me`)
            .then(response => response.data)
    },
    getToLogout() {
        return instance.delete<any>(`auth/login`)
            .then(response => response.data)
    },
    getToLogin(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        return instance.post<any>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data);
    },
}
