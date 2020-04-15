import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom"
import Zoom from 'react-reveal/Zoom'


export default function ResetPassword(props) {

    const { resetPasswordHandler, changeHandler, password, errors, pass } = props

    return (
        <div>
            <div className='App-header bg-full '>
                <form noValidate autoComplete="off" onSubmit={resetPasswordHandler}>

                    <Zoom >
                        <div className="d-flex bg-full bg-light flex-column gerd">
                            {/* <TextField required id="standard-required" label="Required" defaultValue="Hello World" /> */}
                            <h2 className="mb-3 p-1 border-bottom" >Reset Your Password</h2>

                            {/* {errors.pass ? errors.password.status ? <smail className="sText"><p>{errors.password.value}</p></smail> : null : null} */}
                            <TextField
                                id="standard-password-input"
                                label="New Password"
                                type="password"
                                autoComplete="current-password"
                                name="pass"
                                value={pass}
                                onChange={changeHandler}
                                className="mb-2"
                            />
                            <TextField
                                id="standard-password-input"
                                label="Confirm New Password"
                                type="password"
                                autoComplete="current-password"
                                name="pass"
                                value={pass}
                                onChange={changeHandler}
                                className="mb-2"
                            />
                            <div className="mt-5 d-flex">
                                <div className="col-md-6 co-sm-12">
                                    <button className="btn btn-warning btn-block" type="submit">Submit</button>
                                </div>
                                <div className="col-md-6 co-sm-12">
                                    <button className="btn btn-danger btn-block" type="submit">Cancel</button>
                                </div>

                            </div>
                            {/* {errors.form ? errors.form.status ? <smail className="sText"><p>{errors.form.value}</p></smail> : null : null} */}
                            {/* {errors.authentication ? errors.authentication.status ? <smail className="sText"><p>{errors.authentication.value}</p></smail> : null : null} */}

                            {/*   <small className="mt-3 myText">You are not registered yet? <Link to="/signup">Signup</Link></small>
                            <small className="mt-2 myText">Forgot Password? <strong className="text-danger" style={{ cursor: "pointer" }} onClick={handleOpen}>Click here</strong></small>
                            <PasswordReset handleClose={handleClose} handleOpen={handleOpen} show={show} classes={classes} /> */}

                        </div>

                    </Zoom>
                </form>
            </div>
        </div>
    )
}
