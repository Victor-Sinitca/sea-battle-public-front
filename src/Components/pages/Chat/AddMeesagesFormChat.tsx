import {statusType} from "../../../api/chatApi";
import React, {FC, useRef} from "react";
import {Field, Form, Formik, FormikHelpers} from "formik";
import {createFieldFormikTextarea} from "../../../commen/FormikControls/FormikControls";

const validateTerm = (values: any) => {
    const errors = {} as { term: string };
    if (values.term.length > 100) {
        errors.term = 'сообщение более 100 символов';
    }
    return errors;
}

type AddMessagesFormType = {
    statusWS: statusType
    sendMessageForm: (values: string) => void
}
export const AddMessagesFormChat: FC<AddMessagesFormType> = ({statusWS, sendMessageForm}) => {
    const refButton = useRef<HTMLButtonElement>(null)
    const submitForm = (values: { term: string },
                        {setSubmitting, resetForm}: FormikHelpers<{ term: string }>,) => {
        sendMessageForm(values.term)
        resetForm()
        setSubmitting(false)
    }
    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.key === "Enter") {
            refButton.current?.click()
        }
    }
    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: ""}}
            validate={validateTerm}
            onSubmit={submitForm}
        >
            {({errors, touched, isSubmitting, values}) => (
                <Form style={{display: "inline-flex",}}>
                    <div style={{width: "auto"}}>
                        {createFieldFormikTextarea<{ term: string }>("твое сообщение",
                            "term", undefined, "text", {onKeyDown})}
                    </div>
                    <div style={{padding: 5}}>
                        <button  ref={refButton} type="submit"
                                disabled={statusWS !== "ready" || isSubmitting || !values.term}>
                            send
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
        {statusWS !== "ready" && <div> идет соединение</div>}
    </div>
}
