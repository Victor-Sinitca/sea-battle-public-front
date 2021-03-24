import React from "react";
import styles from "./FormControls.module.css"

const FormData = ({input, meta, child, ...props}) => {
    const hasError=meta.touched&&meta.error
    return (
        <div className={styles.formControl+" "+(hasError?styles.error:null)}>
            <div>
                {props.children}
            </div>
            {hasError&&<span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps}=props
    return <FormData{...props}>   <textarea {...input} {...restProps}/>   </FormData>
}
export const Input = (props) => {
    let {input, meta, child, ...restProps}=props
    input.value= props.placeholder
    debugger
    return <FormData{...props}>   <input {...input} {...restProps}/>   </FormData>
}




/*
export const Textarea = ({input, meta, ...props}) => {
    const hasError=meta.touched&&meta.error
    return (
        <div className={styles.formControl+" "+(hasError?styles.error:null)}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            {hasError&&<span>{meta.error}</span>}
        </div>
    )
}
export const Input = ({input, meta, ...props}) => {
    const hasError=meta.touched&&meta.error
    return (
        <div className={styles.formControl+" "+(hasError?styles.error:null)}>
            <div>
                <input {...input} {...props}/>
            </div>
            {hasError&&<span>{meta.error}</span>}
        </div>
    )
}
*/
