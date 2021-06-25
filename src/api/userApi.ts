import $api from "./index";
import {UserType} from "./authApi";

export type UsersResponse = Array<UserType>
export const userApi = {
    users() {
        return $api.get<UsersResponse>(`/users`).then(response => response.data)
    },
}
