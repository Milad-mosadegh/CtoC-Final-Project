import React from 'react';

import TextField from '@material-ui/core/TextField';
import { Link, } from "react-router-dom"
import Zoom from 'react-reveal/Zoom'

const ResetFile = (props) => {
    const { submitHandler, pass, changeHandler, inputErrors, confirmPass } = props

    return (
        <form noValidate autoComplete="off" onSubmit={submitHandler}>

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
                    <smail className="sText">{inputErrors.pass ? inputErrors.pass.status ? inputErrors.pass.value : null : null}</smail>
                    <TextField
                        id="standard-password-input"
                        label="Confirm New Password"
                        type="password"
                        autoComplete="current-password"
                        name="confirmPass"
                        value={confirmPass}
                        onChange={changeHandler}
                        className="mb-2"
                    />
                    <smail className="sText">{inputErrors.confirmPass ? inputErrors.confirmPass.status ? inputErrors.confirmPass.value : null : null}</smail>
                    <div className="mt-5 d-flex">
                        <div className="col-md-6 co-sm-12">
                            <button className="btn btn-warning btn-block" type="submit">Submit</button>
                        </div>
                        <div className="col-md-6 co-sm-12">
                            <Link to={"/"} className="btn btn-danger btn-block" type="submit">
                                Cancel
                                    </Link>
                        </div>

                    </div>


                </div>

            </Zoom>
        </form>
    );
}

export default ResetFile;