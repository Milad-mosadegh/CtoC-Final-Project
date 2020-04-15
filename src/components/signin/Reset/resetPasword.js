import React, { useState, useEffect } from 'react'

import { POST } from '../../lib/post';
import Errors from "../../lib/errors"

import '../style.css'
import ResetFile from './resetfile';


export default function ResetPassword(props) {

    const [pass, setPass] = useState("")
    const [confirmPass, setconfirmPass] = useState("")
    let [inputErrors, setInputErrors] = useState("");

    useEffect(() => setInputErrors(Errors), [])


    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = {
            pass: pass,
            confirmPass: confirmPass
        }


        // else setErrors({ ...errors, authentication: { ...errors.authentication, status: true } })
        if (!Object.keys(formData).every(key => formData[key]))
            return setInputErrors({ ...inputErrors, form: { ...inputErrors.form, status: true } })
        else setInputErrors({ ...inputErrors, form: { ...inputErrors.form, status: false } })
        if (pass !== confirmPass)
            return setInputErrors({ ...inputErrors, confirmPass: { ...inputErrors.confirmPass, status: true } })

        if (inputErrors.form.status) return
        else {
            const response = await POST("/api/auth/resetpass", formData)
            if (response.data.status === "success") {
                props.history.push(`/signin`);
            }
            else if (response.data.status === "failed")
                setInputErrors({ ...inputErrors, backend: { ...inputErrors.backend, status: true, value: response.data.message } })

        }

    }


    const changeHandler = e => {
        inputErrors = { ...inputErrors, form: { ...inputErrors.form, status: false } };

        switch (e.target.name) {


            case "pass":
                setPass(e.target.value)

                if ((e.target.value.length > 12) || (e.target.value.length < 6))
                    inputErrors = { ...inputErrors, [e.target.name]: { ...inputErrors[e.target.name], status: true } }
                else
                    inputErrors = { ...inputErrors, [e.target.name]: { ...inputErrors[e.target.name], status: false } }
                if (e.target.value !== confirmPass && confirmPass !== "")
                    inputErrors = { ...inputErrors, confirmPass: { ...inputErrors.confirmPass, status: true } }
                else
                    inputErrors = { ...inputErrors, confirmPass: { ...inputErrors.confirmPass, status: false } }
                setInputErrors(inputErrors);
                break;

            case "confirmPass":
                setconfirmPass(e.target.value)

                if (pass !== e.target.value)
                    setInputErrors({ ...inputErrors, [e.target.name]: { ...inputErrors[e.target.name], status: true } })
                else
                    setInputErrors({ ...inputErrors, [e.target.name]: { ...inputErrors[e.target.name], status: false } })
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <div className='App-header bg-full '>
                <ResetFile
                    submitHandler={submitHandler}
                    pass={pass}
                    changeHandler={changeHandler}
                    inputErrors={inputErrors}
                    confirmPass={confirmPass}
                />
            </div>
        </div>
    )
}
