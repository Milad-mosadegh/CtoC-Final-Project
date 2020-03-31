import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css'
import './style.css'
import Zoom from 'react-reveal/Zoom'
import POST from '../lib/post';


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
    const [error, setError] = useState("")

    const changeHandler = (e) => {
        switch (e.target.name) {
            case "email":
                if (!regexEmail.test(e.target.value)) setError(e.target.name)
                else setError("")
                setEmail(e.target.value)
                break;
            case "pass":
                setPass(e.target.value)
                break;
            default:
                break;
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!error) {
            if ((email !== "") && (pass !== "")) {
                const formData = {
                    email: email,
                    pass: pass
                }
                const response = await POST("/api/auth/signin", formData)
                console.log("this is response", response)
                if (response.data.status === "success") {
                    localStorage.setItem("c2c-token", { "value": "jkjasdjflkajdslkfja" })
                    props.history.push(`/dashboard`)
                }

            }
            else setError("formError")
        }
    }
    return (
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

                        <button className="btn btn-primary mt-4 mb-2" type="submit">Sign in</button>
                        <smail className="sText">{error === "formError" ? <p>Attention! please fill all fields.</p> : null}</smail>

                        <small className="mt-5 myText">You are not registered yet? <a href="/">Signup</a></small>

                    </div>

                </Zoom>
            </form>
        </div>
    );
}


