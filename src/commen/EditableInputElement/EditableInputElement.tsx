import React, {ChangeEvent, FC, useEffect, useState} from "react";
import s from "./EditableInputElement.module.scss"

type PropsType = {
    value: string
    isEditable: boolean
    setValue: (value: string) => void
    className?:string
}

const EditableInputElement: FC<PropsType> = ({value = "", setValue, isEditable = false,className=""}) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(value)

    useEffect(() => {
        setStatus(value)
    }, [value])

    const activeEditMode = () => {
        if (isEditable) {
            setEditMode(true)
        }
    }
    const deActiveEditMode = () => {
        setEditMode(false)
        if (value !== status) {
            setValue(status)
        }
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div className={className}>
            {editMode
                ? <input className={s.inputElement} onChange={onStatusChange} autoFocus={true} onBlur={deActiveEditMode}
                         value={status}/>
                : <span className={s.spanElement} onDoubleClick={activeEditMode}>{value || "empty status"}</span>
            }
        </div>
    );
}

export default EditableInputElement;
