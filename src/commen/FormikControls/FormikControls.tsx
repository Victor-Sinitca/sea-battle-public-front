import React from "react";
import {Field} from "formik";
import {FieldAttributes} from "formik/dist/Field";
import s from "./FormikControls.module.css"


export function createFieldFormik<FieldTypes>(
    placeholder: string | undefined,
    name: (Extract<keyof FieldTypes, string>),
    text?: string,
    type?: string,
    props: any = {}
) {
    return <div>
        {text ? <label htmlFor={name}>{text}</label> : null}
        <Field name={name}{...props}>
            {({
                  field, // { name, value, onChange, onBlur }
                  form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
              }: FieldAttributes<any>) => {

                return <div className={s.displayFormik}>
                    <input  type={type} placeholder={placeholder} {...field} />
                    {meta.touched && meta.error && (
                        <div className={s.error}>{meta.error}</div>
                    )}
                </div>
            }}
        </Field>
        <div></div>
    </div>
}

export function createFieldFormikTextarea<FieldTypes>(
    placeholder: string | undefined,
    name: (Extract<keyof FieldTypes, string>),
    text?: string,
    type?: string,
    props: any = {},
) {
    return <div>
        {text ? <label>{text}</label> : null}
        <Field name={name}{...props} >
            {({
                  field, // { name, value, onChange, onBlur }
                  form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
              }: FieldAttributes<any>) => {

                return <div className={s.displayFormik}>
                    <div>
                        <textarea style={{width: 400}} className={meta.error ? s.formSummaryError : undefined}
                                  placeholder={placeholder} {...field} {...props}/>
                    </div>
                    {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                    )}
                </div>
            }}
        </Field>
        <div></div>
    </div>
}
