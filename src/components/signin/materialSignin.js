import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css'
import './style.css'
import { POST } from '../lib/post';
import Errors from "../lib/errors"
import MyNavbar from '../navbar/navBar';
import SigninForm from "./signinForm"
import { Link } from 'react-router-dom'


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


    useEffect(() => {
        setErrors(Errors)
    }, [])
    const handleOpen = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };
    const changeHandler = (e) => {
        setErrors({ ...errors, form: { ...errors.form, status: false } })
        switch (e.target.name) {
            case "email":
                if (!regexEmail.test(e.target.value)) setErrors({ ...errors, [e.target.name]: { ...errors[e.target.name], status: true } })
                else setErrors({ ...errors, [e.target.name]: { ...errors[e.target.name], status: false } })
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
        if (errors.email.status) return console.log("you got error in email")
        if ((email === "") || (pass === "")) return setErrors({ ...errors, form: { ...errors.form, status: true } })

        if (errors.form.status) return console.log("you got form error")
        else {
            const formData = {
                email: email,
                pass: pass
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await POST("/api/auth/signin", formData, config)
            if (response.data.status === "success") {
                localStorage.setItem("c2c-token", response.data.token)
                props.history.push(`/dashboard`)
            }
            else setErrors({ ...errors, authentication: { ...errors.authentication, status: true } })
        }
    }
    return (
        <div>

            <MyNavbar {...props} />
            <SigninForm {...props}
                classes={classes}
                submitHandler={submitHandler}
                changeHandler={changeHandler}
                email={email}
                errors={errors}
                pass={pass}
                handleClose={handleClose}
                handleOpen={handleOpen}
                show={show}

            />

        </div>
    );
}


