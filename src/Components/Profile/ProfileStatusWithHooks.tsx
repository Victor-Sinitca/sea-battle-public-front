import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateUserStatusThunk} from "../../redux/profile-reducer";


type PropsType={
    status: string
    isOwner: boolean
}
const ProfileStatusWithHooks:FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const [editMode,setEditMode] = useState(false as boolean)
    const [status,setStatus ]= useState(props.status as string)

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

    const activeEditMode = () => {
        if(props.isOwner){
            setEditMode(true)
        }
    }
    const deActiveEditMode = () => {
        debugger
        setEditMode(false)
        if (props.status !== status) {
            dispatch(updateUserStatusThunk(status))
        }
    }
    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {editMode
                ? <div>
                    <input  onChange={onStatusChange} autoFocus={true} onBlur={deActiveEditMode}
                           value={status}/>
                </div>
                : <div>
                    <span  style={{fontSize:24, color: "blue"}}  onDoubleClick={activeEditMode}>{
                        props.status || "empty status"}</span>
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks;
