import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom"
import Zoom from 'react-reveal/Zoom'
import PasswordReset from './resetModal';

export default function SigninForm(props) {

    const { classes, submitHandler, changeHandler, email, errors, pass, handleClose, handleOpen, show } = props

    return (
        <div>
            <div id="signin" className='App-header bg-full '>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={submitHandler}>

                    <Zoom >
                        <div className="d-flex bg-full bg-light flex-column gerd">
                            {/* <TextField required id="standard-required" label="Required" defaultValue="Hello World" /> */}
                            <h2 className="mb-5" >Sign In</h2>
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

                            <button className="btn btn-primary mt-4 mb-2" type="submit">Sign in</button>
                            {errors.form ? errors.form.status ? <smail className="sText"><p>{errors.form.value}</p></smail> : null : null}
                            {errors.authentication ? errors.authentication.status ? <smail className="sText"><p>{errors.authentication.value}</p></smail> : null : null}

                            <small className="mt-3 myText">You are not registered yet? <Link to="/signup">Signup</Link></small>
                            <small className="mt-2 myText">Forgot Password? <strong className="text-danger" style={{ cursor: "pointer" }} onClick={handleOpen}>Click here</strong></small>
                            <PasswordReset handleClose={handleClose} handleOpen={handleOpen} show={show} classes={classes} />

                        </div>

                    </Zoom>
                </form>
            </div>
        </div>
    )
}
