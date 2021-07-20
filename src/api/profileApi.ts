import $api from "./index";


export type ProfileType = {
    name:string,
    id:string,
    status:string,
    photo:string,
    gameSBState:{
        numberOfGamesSB:number,
        numberOfWinsSB:number,
    }
}

export const profileAPI = {
    getProfile(userID: string) {
        return $api.get<ProfileType>(`/profile/` + userID).then(response => response.data)
    },
    updateStatus(status: string) {
        return $api.post<string>(`/profile/status`, {status: status})
            .then(response => response.data)
    },
    uploadPhoto(file: File) {
        let data = new FormData();
        data.append("wallpaper", file);
        return $api.post<string>(`/profile/uploadPhoto`, data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => response.data)
    },
    updateProfile(token: string, email: string, password: string,) {
        return $api.post<ProfileType>(`/users/profile`,
            {
                user: {
                    email: email,
                    password: password
                },
            },
            {
                headers: {
                    "Authorization": `Token ${token} `
                }
            }).then(response => response.data)
    },
}
