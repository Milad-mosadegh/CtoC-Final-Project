import React, { useState, useEffect } from 'react';
import Errors from "../../lib/errors"
import { POST } from '../../lib/post';
import ChangePassform from './changepassform';
import MyAlert from '../../lib/alert';



export default function PasswordChange(props) {
    const { derenderModal, showModal } = props
    let [inputErrors, setInputErrors] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [oldPass, setOldPass] = useState("")

    const [alertId, setAlertId] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState('')


    useEffect(() => {
        setInputErrors(Errors)
    }, [])
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = {
            pass,
            confirmPass,
            oldPass
        }


        // else setErrors({ ...errors, authentication: { ...errors.authentication, status: true } })
        if (!Object.keys(formData).every(key => formData[key]))
            return setInputErrors({ ...inputErrors, form: { ...inputErrors.form, status: true } })
        else setInputErrors({ ...inputErrors, form: { ...inputErrors.form, status: false } })
        if (pass !== confirmPass)
            return setInputErrors({ ...inputErrors, confirmPass: { ...inputErrors.confirmPass, status: true } })

        else {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('c2c-token'),
                    'Content-Type': 'application/json'
                }
            }
            const response = await POST(`/api/auth/changepassword`, formData, config)
            if (response.data.status === "success") {
                // alert("you have succesfully changed your password, Please relogin")
                setAlertId("A")
                setAlertText("you have succesfully changed your password, Please relogin")
                setShowAlert(true)
                derenderModal()
                localStorage.removeItem("c2c-token")
                localStorage.removeItem("c2c-profile")

                props.history.push("/signin")


            }
            else if (response.data.status === "failed") {
                setInputErrors({ ...inputErrors, backend: { ...inputErrors.backend, status: true, value: response.data.message } })
                // alert("sorry request failed try again later")
                setAlertId("B")
                setAlertText('sorry request failed try again later')
                setShowAlert(true)
            }
        }

    }
    const changeHandler = e => {
        inputErrors = { ...inputErrors, form: { ...inputErrors.form, status: false } };

        switch (e.target.name) {

            case "oldPass":
                setOldPass(e.target.value)
                break;

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
                setConfirmPass(e.target.value)

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
        <>
            <ChangePassform
                derenderModal={derenderModal}
                showModal={showModal}
                submitHandler={submitHandler}
                changeHandler={changeHandler}
                pass={pass}
                confirmPass={confirmPass}
                inputErrors={inputErrors}
                oldPass={oldPass}

            />
            {showAlert ? <MyAlert id={alertId} alertText={alertText} /> : null}
        </>
    );
}

