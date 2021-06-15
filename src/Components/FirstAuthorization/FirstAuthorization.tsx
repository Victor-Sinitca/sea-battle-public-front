import React, {FC,} from "react";
import {useDispatch} from "react-redux";
import {Form, Formik, FormikHelpers} from "formik";
import {createFieldFormik} from "../../commen/FormikControls/FormikControls";
import s from "./FirstAuthorization.module.css"
import {useHistory} from "react-router-dom";
import {authorization} from "../../redux/auth-reducer";


type InitialValuesType = {
    email: string,
    password: string,
}

const userSearchFormValidate = (values: InitialValuesType) => {
    let errors = {} as InitialValuesType;
    if (!values.email) {
        errors.email = 'Required';
    } else if (values.email.length > 40) {
        errors.email = 'fullName very long';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length > 40) {
        errors.password = 'fullName very long';
    }
    return errors;
}


export const FirstAuthorization: FC = () => {
    let history = useHistory();
    const dispatch = useDispatch()
    const initialProfile = {
        email: "",
        password: "",
    }
    type  InitialValuesType = typeof initialProfile
    const submitForm = (values: InitialValuesType,
                        {setSubmitting}: FormikHelpers<InitialValuesType>,) => {
        debugger
        dispatch(authorization(values.email, values.password))
        setSubmitting(false)
        history.push("/placeBattleMan")
    }


    return <div>
        <div>Заполните форму для авторизации</div>
        <Formik
            initialValues={initialProfile as InitialValuesType}
            validate={userSearchFormValidate}
            onSubmit={submitForm}
        >
            {({errors, isSubmitting, isValidating}) => (
                <Form className={s.displayForm}>
                    <div className={s.field}>{createFieldFormik<InitialValuesType>("enter your email",
                        "email", "email")}</div>
                    <div>{createFieldFormik<InitialValuesType>("enter your password",
                        "password", "password")}</div>
                    <button type="submit" disabled={isSubmitting || (Object.keys(errors).length != 0)}>
                        send
                    </button>
                    <button type="reset"> refresh</button>
                </Form>
            )}
        </Formik>
    </div>
}

