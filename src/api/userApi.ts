import $api from "./index";
import {ProfileType} from "./profileApi";

export type UsersResponse = Array<ProfileType>
export const userApi = {
    users() {
        return $api.get<UsersResponse>(`/users`).then(response => response.data)
    },
}
