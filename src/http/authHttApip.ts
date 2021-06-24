import $api from "./index";

type AuthResponse = {
    accessToken:string
    refreshToken:string
    user:{
        email: string,
        id: string
        isActivated: boolean
    }
}

export const authHttpAPI = {
    login(email: string, password: string,) {
        return $api.post<AuthResponse>(`/login`, { email, password})
            .then(response => response.data)
    },
    registration(email: string, password: string) {
        return $api.post<AuthResponse>(`/registration`, { email, password})
            .then(response => response.data);
    },
    logout() {
        return $api.get<any>(`/logout`).then(response => response.data)
    },
}
