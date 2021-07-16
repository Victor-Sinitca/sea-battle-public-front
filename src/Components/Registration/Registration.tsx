import React, {FC,} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Form, Formik, FormikHelpers} from "formik";
import {createFieldFormik} from "../../commen/FormikControls/FormikControls";
import s from "./Registration.module.css"
import {Redirect, useHistory} from "react-router-dom";

import {getIsAuthorization} from "../../redux/authHttp-selectors";
import {registration} from "../../redux/authHttp-reducer";


type InitialValuesType = {
    name:string,
    email: string,
    password: string,
    repeatPassword: string,
}

const userSearchFormValidate = (values: InitialValuesType) => {
    let errors = {} as InitialValuesType;
    let emailValidator = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    if (!values.email) {
        errors.email = 'введите email';
    } else if (!emailValidator.test(values.email)) {
        errors.email = 'введите правильный email';
    }
    if (!values.password) {
        errors.password = 'введите пароль';
    } else if (values.password.length < 8) {
        errors.password = 'пароль должен быть больше восьми символов';
    }
    if (!values.repeatPassword) {
        errors.repeatPassword = 'повторите пароль';
    } else if (values.password !== values.repeatPassword) {
        errors.repeatPassword = 'пароли должны совпадать';
    }
    return errors;
}


export const Registration: FC = () => {
    let history = useHistory();
    const dispatch = useDispatch()
    const isAuthorization = useSelector(getIsAuthorization)


    const initialProfile = {
        name:"",
        email: "",
        password: "",
        repeatPassword: "",
    }
    type  InitialValuesType = typeof initialProfile
    const submitForm = (values: InitialValuesType,
                        {setSubmitting}: FormikHelpers<InitialValuesType>,) => {
        dispatch(registration(values.email, values.password , values.name))
        setSubmitting(false)
       /* if(isAuthorization){
            history.push("/placeBattleMan")
        }*/
    }
    if(isAuthorization){
       return <Redirect to={'/placeBattleMan'}/>
    }

    return <div className={s.display} >
        <div style={{padding:10, justifySelf:"center"} } >Регистрация</div>
        <Formik
            initialValues={initialProfile as InitialValuesType}
            validate={userSearchFormValidate}
            onSubmit={submitForm}
        >
            {({errors, isSubmitting, isValidating,isValid}) => (
                <Form className={s.displayForm}>
                    <div className={s.field}>{createFieldFormik<InitialValuesType>("enter your name",
                        "name", )}</div>
                    <div className={s.field}>{createFieldFormik<InitialValuesType>("enter your email",
                        "email", )}</div>
                    <div>{createFieldFormik<InitialValuesType>("enter your password",
                        "password", )}</div>
                    <div>{createFieldFormik<InitialValuesType>("repeat your password",
                        "repeatPassword", )}</div>
                    <div className={s.displayButton}>
                        <button  type="submit" disabled={isSubmitting || !isValid}>
                            регистрация
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
}

