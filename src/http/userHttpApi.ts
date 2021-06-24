import $api from "./index";

export type UserType={
    email: string,
    id: string,
    isActivated: boolean
}
export type UsersResponse = Array<UserType>
export const userHttpAPI = {
    users() {
        return $api.get<UsersResponse>(`/users`).then(response => response.data)
    },
}
