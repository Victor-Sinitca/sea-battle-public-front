import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../redux/profile-selectors";
import ava from "../../assets/img/ava.jpeg"
import {getAuthUserId} from "../../redux/auth-selectors";
import {useHistory, useParams} from "react-router-dom";
import {getProfileThunk} from "../../redux/profile-reducer";

export const Profile: FC = () => {
    const profile = useSelector(getProfile)
    const authUserId=useSelector(getAuthUserId)
    const dispatch =useDispatch()

    let history = useHistory();
    const {userID} = useParams<{ userID: string }>();
    let userId = userID || null;
    const isOwner = !userID || userID === authUserId

    const refreshProfile = () => {
        if (!userId) {
            userId = authUserId
            if (!userId) {
                history.push("/authorization")
            } else {
                dispatch(getProfileThunk(userId))

            }
        } else {
            dispatch(getProfileThunk(userId))
        }
    }
    useEffect(()=>{
        refreshProfile()

    },[])





    if (profile === null) {
        return <div>профиля нет</div>
    } else {
        return <div>
            <div> твой профиль</div>
            <div>name: {profile.name}</div>
            <img src={profile.photo || ava } />
            <div> status:{profile.status}</div>
            <div> number of Game:{profile.seaBattleSate.numberOfGames} </div>
            <div>number of Wins: {profile.seaBattleSate.numberOfWins}</div>
            <div>number of Losses: {profile.seaBattleSate.numberOfLosses}</div>
        </div>
    }
}
