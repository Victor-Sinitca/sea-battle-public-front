import React, {ChangeEvent, FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../redux/profile-selectors";
import ava from "../../assets/img/ava.jpeg"
import {useHistory, useParams} from "react-router-dom";
import {getProfileThunk, uploadPhotoThink} from "../../redux/profile-reducer";
import {getAuthUser} from "../../redux/authHttp-selectors";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

export const Profile: FC = () => {
    const profile = useSelector(getProfile)
    const authUser=useSelector(getAuthUser)
    const dispatch =useDispatch()

    let history = useHistory();
    const {userID} = useParams<{ userID: string }>();
    let userId = userID || null;
    const isOwner = !userID || userID === authUser?.id

    const refreshProfile = () => {
        if (!userId) {
            if (!authUser?.id) {
                history.push("/authorization")
            } else {
                dispatch(getProfileThunk(authUser.id))
            }
        } else {
            dispatch(getProfileThunk(userId))
        }
    }
    const onMainPhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            let file = e.target.files[0]
            dispatch(uploadPhotoThink(file))
        }

    }



    useEffect(()=>{
        refreshProfile()
    },[])





    if (profile === null) {
        return <div>профиля нет</div>
    } else {
        return <div>
            {isOwner && <div> твой профиль</div>}
            <div>name: {profile.name}</div>
            <img src={profile.photo || ava } />
            {isOwner && <input type={"file"} onChange={onMainPhotoSelect}/>}
            <div> status:{profile.status}</div>
            <ProfileStatusWithHooks isOwner={isOwner} status={profile.status}/>
            <div> number of Game:{profile.gameSBState.numberOfGamesSB} </div>
            <div>number of Wins: {profile.gameSBState.numberOfWinsSB}</div>
            <div>number of Losses: {profile.gameSBState.numberOfGamesSB - profile.gameSBState.numberOfWinsSB}</div>
        </div>
    }
}
