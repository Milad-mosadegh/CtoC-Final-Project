import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css'
import POST from "../lib/post";
import Zoom from 'react-reveal/Zoom'
import unknown from 'react-reveal/Zoom'

import './style.css'
import MyNavbar from '../navbar/navBar';


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',

        },

    },
}));

export default function MaterialSignup(props) {
    const classes = useStyles();
    console.log("these are props", props)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setconfirmPass] = useState("");
    const [error, setError] = useState(true);
    const [formError, setFormError] = useState(unknown);

    const formData = { firstName, lastName, email, pass };


    const changeHandler = e => {

        const regexName = new RegExp(/^[a-zA-ZäöüÄÖÜß]*$/)
        const regexEmail = new RegExp(/^([a-zA-Z0-9_\-.äöüÄÖÜß_]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)

        switch (e.target.name) {
            case "firstName":
                if ((!regexName.test(e.target.value)) || (e.target.value.length < 3)) setError(e.target.name)
                else setError("")
                setFirstName(e.target.value)
                break;
            case "lastName":
                if ((!regexName.test(e.target.value)) || (e.target.value.length < 3)) setError(e.target.name)
                else setError("")
                setLastName(e.target.value)
                break;
            case "email":
                if (!regexEmail.test(e.target.value)) setError(e.target.name)
                else setError("")
                setEmail(e.target.value)
                break;
            case "pass":
                setPass(e.target.value)
                if ((e.target.value.length < 6) || (e.target.value.length > 12)) {
                    setError(e.target.name)
                }
                else if (e.target.value !== confirmPass) setError("confirmPass")
                else setError("")
                break;
            case "confirmPass":
                setconfirmPass(e.target.value)
                if (pass !== e.target.value) setError(e.target.name)
                else setError("")
                break;
            default:
                break;
        }
        let hasEmptyFields = false;
        Object.keys(formData).forEach(d => {
            hasEmptyFields = hasEmptyFields || !formData[d]
        });
        setFormError(hasEmptyFields);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!error) {
            if (!formError) {
                const response = await POST("/api/auth/signup", formData)
                if (response.data.status === "success") {
                    props.history.push(`/signin`);
                }
                else if (response.data.status === "failed") alert("sorry this email address is already registered with us")
            }
        }
    }
    return (
        <div>
            <MyNavbar {...props} />
            <div id="signup" className='App-header bg-full'>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={submitHandler}>
                    <Zoom >

                        <div className="d-flex bg-light flex-column gerd ">
                            {/* <TextField required id="standard-required" label="Required" defaultValue="Hello World" /> */}
                            <h2 className="mb-5" >Sign Up</h2>
                            <TextField
                                id="standard-name-input"
                                label="First Name"
                                type="name"
                                autoComplete="current-name"
                                name="firstName"
                                value={firstName}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{error === "firstName" ? <p>Attention! name must consist on 3 or more alphabets</p> : null}</smail>

                            <TextField
                                id="standard-name-input"
                                label="Last Name"
                                type="name"
                                autoComplete="current-name"
                                name="lastName"
                                value={lastName}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{error === "lastName" ? <p>Attention! name must consist on 3 or more alphabets</p> : null}</smail>
                            <TextField
                                id="standard-email-input"
                                label="Email"
                                type="email"
                                autoComplete="current-email"
                                name="email"
                                value={email}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{error === "email" ? <p>Attention! please provide a valid email address</p> : null}</smail>
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                name="pass"
                                value={pass}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{error === "pass" ? <p>Attention! password length must be from 6 to 12 characters.</p> : null}</smail>

                            <TextField
                                id="standard-password-input"
                                label="Confirm Password"
                                type="password"
                                autoComplete="current-password"
                                name="confirmPass"
                                value={confirmPass}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{error === "confirmPass" ? <p>Attention! password and confirm passowrd must be same.</p> : null}</smail>

                            <button className="btn btn-primary mt-4" type='submit'>Submit</button>
                            <small className="sText">{formError === true ? <p>Attention! please fill all fields.</p> : null}</small>
                            <small className="mt-5 myText text-dark">You have already Account? <a href="/signin">Signin</a> </small>

                        </div>

                    </Zoom>
                </form>
                </div>
        </div>
    );
}
