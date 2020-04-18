import React from 'react'
import Zoom from 'react-reveal/Zoom'
import TextField from '@material-ui/core/TextField';
import { Modal } from "react-bootstrap"

export default function ChangePassform(props) {

    const {derenderModal,showModal, submitHandler, changeHandler, pass, confirmPass, inputErrors} = props
    return (
        <Modal show={showModal} onHide={derenderModal} animation={false} >
                        
                        <Modal.Body className="bg-warning">
                        <form noValidate autoComplete="off" onSubmit={submitHandler}>

            <Zoom className="shadow-lg">
                
                <div className="d-flex bg-full bg-light flex-column gerd">
                    {/* <TextField required id="standard-required" label="Required" defaultValue="Hello World" /> */}
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Title>Change Password</Modal.Title>

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
                <smail className="sText">{inputErrors.form ? inputErrors.form.status ? inputErrors.form.value : null : null}</smail>
                    
                    <div className="mt-5 d-flex">
                        <div className="col-md-6 co-sm-12">
                            <button className="btn btn-warning btn-block" type="submit">Submit</button>
                        </div>
                        <div className="col-md-6 co-sm-12">
                            <button onClick={derenderModal} className="btn btn-danger btn-block" type="submit">
                                Cancel
                            </button>
                        </div>

                    </div>



                </div>

            </Zoom>
        </form>
                        </Modal.Body>

                      </Modal>
    )
}
