import React, {FC} from "react";
import s from "./Button.module.scss"

type ButtonType={
    value:string;
    callback:()=>void;
    className?:string
}
export const Button :FC<ButtonType> = ({value, callback,className})=>{
    return <button className={`${s.buttonStyle} ${className}`} onClick={callback}>{value}</button>

}
