import React, {ChangeEvent, FC, useState} from "react";
import s from "./ProfilePhoto.module.css"
import pngD from "../../../assets/img/png-download.png";

type  PropsType = {
    photo: string
    ava: string
    height?: number
    isOwner?: boolean
    download?: (e: ChangeEvent<HTMLInputElement>) => void
}
export const ProfilePhoto: FC<PropsType> = ({photo, ava, height = 180, isOwner=false, download}) => {
    const [anim, setAnim] = useState(false)
    const onMouseOver = () => {
            setAnim(true)
    }
    const onMouseLeave = () => {
            setAnim(false)
    }
    return <div style={{height: height, width: "min-content", position: "relative"}}>
        <img onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className={s.imgPhoto} src={photo || ava}
             alt={"avatar"}/>
        {isOwner && <>
            <input className={s.inputPhoto} type={"file"} id="inputFile"
                   onChange={download}/>
            <label htmlFor="inputFile">
                <img className={anim ? s.downloadImg1 : s.downloadImg} src={pngD}
                     alt={"download"}/>
            </label>
        </>}
    </div>
}
