import React, {FC,} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Form, Formik, FormikHelpers} from "formik";
import {createFieldFormik} from "../../commen/FormikControls/FormikControls";
import s from "./Authorization.module.scss"
import {NavLink, Redirect, useHistory} from "react-router-dom";
import {login} from "../../redux/authHttp-reducer";
import {getIsAuthorization} from "../../redux/authHttp-selectors";


type InitialValuesType = {
    email: string,
    password: string,
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
    return errors;
}


export const Authorization: FC = () => {
    let history = useHistory();
    const dispatch = useDispatch()
    const isAuthorization = useSelector(getIsAuthorization)
    const initialProfile = {
        email: "",
        password: "",
    }
    type  InitialValuesType = typeof initialProfile
    const submitForm = (values: InitialValuesType,
                        {setSubmitting,}: FormikHelpers<InitialValuesType>,) => {
        dispatch(login(values.email, values.password,))
        setSubmitting(false)
    }

    if (isAuthorization) {
        return <Redirect to={'/placeBattleMan'}/>
    }
    return <div className={s.display}>
            <div style={{justifySelf: "center"}}>Войти в систему</div>
            <Formik
                initialValues={initialProfile as InitialValuesType}
                validate={userSearchFormValidate}
                onSubmit={submitForm}
            >
                {({errors, isSubmitting, isValidating, isValid}) => (
                    <Form className={s.displayForm}>
                        <div className={s.field}>{createFieldFormik<InitialValuesType>("enter your email",
                            "email",)}</div>
                        <div>{createFieldFormik<InitialValuesType>("enter your password",
                            "password",)}</div>
                        <div className={s.displayButton}>
                            <button type="submit" disabled={isSubmitting || !isValid}>
                                войти
                            </button>
                            <NavLink to='/registration'>регистрация</NavLink>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>

}

