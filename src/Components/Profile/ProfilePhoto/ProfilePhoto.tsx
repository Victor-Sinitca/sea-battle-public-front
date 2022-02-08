import React, {ChangeEvent, FC, useState} from "react";
import s from "./ProfilePhoto.module.scss"
import pngD from "../../../assets/img/png-download.png";
import defaultAva from "../../../assets/img/ava.jpeg";


type  PropsType = {
    photo: string
    className?: string
    ava?: string
    isOwner?: boolean
    download?: (e: ChangeEvent<HTMLInputElement>) => void
}

const emptyDownloadFunction=()=>{
    console.log("не передана функция для загрузки изображения")
}

export const ProfilePhoto: FC<PropsType> = ({ photo, className = "", ava = defaultAva,
                                                isOwner = false, download = emptyDownloadFunction}) => {
    return <div className={`${s.profilePhoto} ${className}`}>
        <img className={s.imgPhoto} src={photo || ava} alt="avatar"/>
        {isOwner && <>
            <input className={s.inputPhoto} type={"file"} id="inputFileForAvatar"
                   onChange={download}/>
            <label htmlFor="inputFileForAvatar">
                <img className={s.downloadImg} src={pngD} alt="download"/>
            </label>
        </>}
    </div>
}
