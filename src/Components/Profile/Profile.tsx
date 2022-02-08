import React, {ChangeEvent, FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIsUpdateProfile, getProfile} from "../../redux/profile-selectors";
import s from "./Profile.module.scss"
import {useHistory, useParams} from "react-router-dom";
import {actionProfile, getProfileThunk, updateUserStatusThunk, uploadPhotoThink} from "../../redux/profile-reducer";
import {getAuthUser} from "../../redux/authHttp-selectors";
import EditableInputElement from "../../commen/EditableInputElement/EditableInputElement";
import Preloader1 from "../../commen/Preloader1/Preloader1";
import {ProfilePhoto} from "./ProfilePhoto/ProfilePhoto";
import {toLogout} from "../../redux/authHttp-reducer";
import {Button} from "../../commen/Button/Button";

export const Profile: FC = () => {
    const profile = useSelector(getProfile)
    const authUser = useSelector(getAuthUser)
    const isUpdateProfile = useSelector(getIsUpdateProfile)
    const dispatch = useDispatch()

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
    const handlerLogout = () => {
        dispatch(toLogout())
        history.push('/authorization')
    }
    const handlerSetStatus=(value:string)=>{
        dispatch(updateUserStatusThunk(value))
    }

    useEffect(() => {
        return()=>{
            dispatch(actionProfile.setUsersProfile(null))
        }
    }, [])


    useEffect(() => {
        refreshProfile()
    }, [userID])

    if (isUpdateProfile || !profile) {
        return <Preloader1/>
    }
    return <div className={s.profile}>
        <div className={s.profileHeader}>
            <div>{profile.name}</div>
            {isOwner && <Button value={"logout"} callback={handlerLogout} className={s.buttonLogout}/>}
        </div>
        <div className={s.profileBlock}>
            <ProfilePhoto photo={profile.photo} download={onMainPhotoSelect} isOwner={isOwner}/>
            <div className={s.profileDescriptions}>
                <div className={s.statusBlock}>
                    <div>status:</div>
                    <EditableInputElement isEditable={isOwner} value={profile.status} setValue={handlerSetStatus}/>
                </div>

                <div className={s.gamesBlock}>
                    <div>Морской бой, статистика</div>
                    <div>игр:{profile.gameSBState.numberOfGamesSB} </div>
                    <div>побед: {profile.gameSBState.numberOfWinsSB}</div>
                </div>
            </div>
        </div>
    </div>

}

