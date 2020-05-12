import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Modal } from "react-bootstrap"
import Zoom from 'react-reveal/Zoom'
import {Link} from "react-router-dom"
import PasswordReset from "../resetModal"

export default function SigninForm(props) {

    const { classes, submitHandler, changeHandler, email, errors, pass, handleClose, handleOpen, show, handleCloseReset,handleOpenReset,showReset } = props

    return (
        <Modal size="md" show={show} onHide={handleClose} animation={false} centered={true}>
<div id="signin" className='mySignin'>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={submitHandler}>

<Zoom >
    <div className="mySignin-form">
        <div className="h2-box">
        </div>
        <h2 clsassName="mb-5 p-2" >Sign In</h2>
        <TextField
            id="standard-email-input"
            label="Email"
            type="email"
            autoComplete="current-email"
            name="email"
            value={email}
            onChange={changeHandler}
        />
        {errors.email ? errors.email.status ? <smail className="sText"><p>{errors.email.value}</p></smail> : null : null}
        <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="pass"
            value={pass}
            onChange={changeHandler}

        />

        <button className="bigBlueButton" type="submit">Sign in</button>
        {errors.form ? errors.form.status ? <smail className="sText"><p>{errors.form.value}</p></smail> : null : null}
        {errors.authentication ? errors.authentication.status ? <smail className="sText"><p>{errors.authentication.value}</p></smail> : null : null}

        <small className="mt-3 myText">You are not registered yet? <Link to="/signup" className="L">Signup</Link></small>
        <small className="mt-2 myText">Forgot Password?
        <strong className="L" style={{ cursor: "pointer" }} onClick={handleOpenReset}> Click here</strong></small>
        

    </div>
</Zoom>

</form>
          </div>
</Modal>
    )
}
