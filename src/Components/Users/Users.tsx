import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/usersHttp-selectors";
import {User} from "./User/User";
import {addUsers} from "../../redux/users-reducer";


export const Users:FC<{}>=()=>{
    const dispatch=useDispatch()

    const users = useSelector(getUsers)
    const usersPrint= users?.map(u=> <User key={u.id}  userProfile={u}/>)

    useEffect(()=>{
        dispatch(addUsers())
    },[])

    return <div>
        {usersPrint}
    </div>
}
