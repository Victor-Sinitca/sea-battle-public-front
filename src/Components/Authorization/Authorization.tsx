import React, {FC,} from "react";
import {Redirect} from "react-router-dom";
import {getAuthorization, getCaptchaUrl} from "../../redux/auth-selectors";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";


export type LoginFormDataType = {
    captcha: string;
    rememberMe: boolean;
    password: string;
    email: string;
}

export const Authorization: FC = () => {
    const dispatch = useDispatch()
    const authorization = useSelector(getAuthorization)
    const captchaUrl = useSelector(getCaptchaUrl)


    const onSubmit = (formData: LoginFormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (authorization) {
        return <Redirect to={'/profile/'}/>
    }
    return <div>

         {/*<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>*/}
        {captchaUrl && <div>
            <img src={captchaUrl} alt={"empty"}/>
            <div style={{padding: "10px"}}>
                <button onClick={() => {}}>
                    get captcha
                </button>
            </div>
        </div>}
    </div>
}

