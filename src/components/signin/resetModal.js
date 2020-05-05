import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Modal } from "react-bootstrap"
import Errors from "../lib/errors"
import { POST } from '../lib/post';

import '../styles/main.css';

export default function PasswordReset(props) {
  const { handleClose, show, classes } = props
  const [resetResponse, setResetResponse] = useState("")
  const [errors, setErrors] = useState("")
  const [email, setEmail] = useState("");



  const regexEmail = new RegExp(/^([a-zA-Z0-9_\-.äöüÄÖÜß_]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)

  useEffect(() => {
    setErrors(Errors)
  }, [])
  const resetPassword = async () => {
    if (errors.resetPass.status) return console.log("you got error in email")
    if (email === "") return setErrors({ ...errors, form: { ...errors.form, status: true } })
    const formData = {
      email: email
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await POST("/api/recovery/resetlink", formData, config)
    if (response.data.status === "success") {
      setResetResponse(response.data.message)
    }
    else setResetResponse(response.data.message)
  }
  const changeHandler = (e) => {
    setErrors({ ...errors, form: { ...errors.form, status: false } })
    switch (e.target.name) {
      case "email":
        setResetResponse("")
        if (!regexEmail.test(e.target.value)) setErrors({ ...errors, [e.target.name]: { ...errors[e.target.name], status: true } })
        else setErrors({ ...errors, [e.target.name]: { ...errors[e.target.name], status: false } })
        setEmail(e.target.value)
        break;
      default:
        break;
    }
  }
  return (
    <>
      <Modal size="md" show={show} onHide={handleClose} animation={false} centered={true}>
        {/* <Modal.Header closeButton></Modal.Header> */}
        <div className='resetModal'>
          <form className={classes.root} noValidate autoComplete="off" >
            <div className="resetModal-form">
              <div className="h2-box"></div>
              <h2 clsassName="mb-5 p-2" >Reset Password</h2>
              <div className="resetModal-center">

                <TextField
                  id="standard-email-input"
                  label="Email"
                  type="email"
                  autoComplete="none"
                  name="email"
                  value={email}
                  onChange={changeHandler}
                  className="mx-auto "
                />
                {errors.resetPass ? errors.resetPass.status ? <smail className="sText"><p>{errors.resetPass.value}</p></smail> : null : null}
                <small className="mt-2 myText2"><p><strong >Please provide your email address to reset password.</strong></p></small>
                {resetResponse ? <smail className="sText text-success"><p>{resetResponse}</p></smail> : null}


              </div>
              <div className="resetModal-btn">
                <button className="bigRedButton" onClick={handleClose}>Close</button>
                <button className="bigBlueButton ml-1" onClick={resetPassword}>Send </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

