import React, { useState , useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom"
import '../../App.css'
import './style.css'
import Zoom from 'react-reveal/Zoom'
import {POST} from '../lib/post';
import Errors from "../lib/errors"
import MyNavbar from '../navbar/navBar';
import {Button, Modal, } from "react-bootstrap"


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },

    },
}));

export default function MaterialSignin(props) {
    const classes = useStyles();
    const regexEmail = new RegExp(/^([a-zA-Z0-9_\-.äöüÄÖÜß_]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)


    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [errors, setErrors] = useState("")
    const [show, setShow] = useState(false)
    const [resetPass, setResetPass]=useState("")
    const [resetResponse, setResetResponse]=useState("")

    useEffect(()=>{
            setErrors(Errors)
    },[])
    const handleOpen = () => {
        setShow(true);
    };

    const handleClose = () => {
        setResetPass("")
        setShow(false);
    };
    const resetPassword=async()=>{
        if(errors.resetPass.status) return console.log("you got error in email")
        if(resetPass==="") return setErrors({...errors,form:{...errors.form, status:true}})
        const formData = {
            email:resetPass
        }
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const response = await POST("/api/auth/resetpass", formData,config)
        if (response.data.status === "success") {
            setResetResponse(response.data.message)
        }
        else setResetResponse(response.data.message)
    }

    const changeHandler = (e) => {
        setErrors({...errors,form:{...errors.form, status:false}})
        switch (e.target.name) {
            case "email":
                if (!regexEmail.test(e.target.value)) setErrors({...errors,[e.target.name]:{...errors[e.target.name], status:true}})
                else setErrors({...errors,[e.target.name]:{...errors[e.target.name], status:false}})
                setEmail(e.target.value)
                break;
            case "pass":
                setPass(e.target.value)
                break;
            case "resetPass":
                setResetResponse("")
                if (!regexEmail.test(e.target.value)) setErrors({...errors,[e.target.name]:{...errors[e.target.name], status:true}})
                else setErrors({...errors,[e.target.name]:{...errors[e.target.name], status:false}})
                setResetPass(e.target.value)
                break;
            default:
                break;
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if(errors.email.status) return console.log("you got error in email")
        if((email==="") || (pass==="")) return setErrors({...errors,form:{...errors.form, status:true}})
        
        if(errors.form.status) return console.log("you got form error")
            else{
                const formData = {
                    email: email,
                    pass: pass
                }
                const config={
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
                const response = await POST("/api/auth/signin", formData,config)
                if (response.data.status === "success") {
                    localStorage.setItem("c2c-token", response.data.token)
                    props.history.push(`/dashboard`)
                }
                else setErrors({...errors,authentication:{...errors.authentication, status:true}})
        }
    }
    return (
        <div>
            <MyNavbar {...props} />
            
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
                            {errors.email? errors.email.status?<smail className="sText"><p>{errors.email.value}</p></smail>:null: null}
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
                            {errors.form? errors.form.status?<smail className="sText"><p>{errors.form.value}</p></smail>:null: null}
                            {errors.authentication? errors.authentication.status?<smail className="sText"><p>{errors.authentication.value}</p></smail>:null: null}

                            <small className="mt-3 myText">You are not registered yet? <Link to="/signup">Signup</Link></small>
                            <small className="mt-2 myText">Forgot Password? <strong className="text-danger" onClick={handleOpen}>Click here</strong></small>
                    <>
                      <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                          <Modal.Title>Reset Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form className={classes.root} noValidate autoComplete="off" >
                        <TextField
                                                id="standard-email-input"
                                                label="Email"
                                                type="email"
                                                autoComplete="none"
                                                name="resetPass"
                                                value={resetPass}
                                                onChange={changeHandler}
                                            />
                            {errors.resetPass? errors.resetPass.status?<smail className="sText"><p>{errors.resetPass.value}</p></smail>:null: null}
                            <small className="mt-2 myText"><p><strong className="text-warning">Please provide your email address to reset password.</strong></p></small>
                            {resetResponse? <smail className="sText text-success"><p>{resetResponse}</p></smail>: null}


                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary" onClick={resetPassword}>
                            Send Link
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>

                        </div>

                    </Zoom>
                </form>
            </div>
            
            
        </div>
    );
}


