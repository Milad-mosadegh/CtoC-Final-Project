import React, { useState , useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css'
import {POST} from "../lib/post";
import Zoom from 'react-reveal/Zoom'
import Errors from "../lib/errors"
import './style.css'
import {Link} from "react-router-dom"
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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setconfirmPass] = useState("");
    const [inputErrors, setInputErrors] = useState("");
    const formData = { firstName, lastName, email, pass };
    useEffect(()=>setInputErrors(Errors),[])

    const regexName = new RegExp(/^[a-zA-ZäöüÄÖÜß]*$/)
    const regexEmail = new RegExp(/^([a-zA-Z0-9_\-.äöüÄÖÜß_]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)

    const changeHandler = e => {

        switch (e.target.name) {
            
            case "firstName":
                if ((!regexName.test(e.target.value)) || (e.target.value.length < 3)) 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:true}})
                else 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:false}})

                setFirstName(e.target.value)
                break;
            case "lastName":
                if ((!regexName.test(e.target.value)) || (e.target.value.length < 3)) 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:true}})
                else 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:false}})

                setLastName(e.target.value)
                break;
            case "email":
                if (!regexEmail.test(e.target.value)) 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:true}})
                else 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:false}})

                setEmail(e.target.value)
                break;

            case "pass":
                setPass(e.target.value)

                if((e.target.value.length >12 ) || (e.target.value.length < 6)) 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:true}})
                else 
                     setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:false}}) 
                break;
           
            case "confirmPass":
                setconfirmPass(e.target.value)

                if (pass !== e.target.value) 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:true}})
                else 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:false}})
                break;
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if(!Object.keys(formData).every(key=>formData[key])) 
            return setInputErrors({...inputErrors,form:{...inputErrors.form, status:true}})
            else   setInputErrors({...inputErrors,form:{...inputErrors.form, status:false}})
        if(pass!== confirmPass) 
            return setInputErrors({...inputErrors,confirmPass:{...inputErrors.confirmPass, status:true}})
        
        if(inputErrors.form.status) return 
            else{
                const response = await POST("/api/auth/signup", formData) 
                if (response.data.status === "success") {
                    props.history.push(`/signin`);
                    }
                else if (response.data.status === "failed") 
                            setInputErrors({...inputErrors,backend:{...inputErrors.backend, status:true, value:response.data.message}})
        
                    }
        }
    return (
        <div>
            <MyNavbar {...props} />
            <div id="signup" className='App-header bg-full'>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={submitHandler}>
                    <Zoom >

                        <div className="d-flex bg-light flex-column gerd ">
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
                            <smail className="sText">{inputErrors.firstName?inputErrors.firstName.status?inputErrors.firstName.value:null:null}</smail>

                            <TextField
                                id="standard-name-input"
                                label="Last Name"
                                type="name"
                                autoComplete="current-name"
                                name="lastName"
                                value={lastName}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{inputErrors.lastName?inputErrors.lastName.status?inputErrors.lastName.value:null:null}</smail>
                            <TextField
                                id="standard-email-input"
                                label="Email"
                                type="email"
                                autoComplete="current-email"
                                name="email"
                                value={email}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{inputErrors.email?inputErrors.email.status?inputErrors.email.value:null:null}</smail>
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                name="pass"
                                value={pass}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{inputErrors.pass?inputErrors.pass.status?inputErrors.pass.value:null:null}</smail>

                            <TextField
                                id="standard-password-input"
                                label="Confirm Password"
                                type="password"
                                autoComplete="current-password"
                                name="confirmPass"
                                value={confirmPass}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{inputErrors.confirmPass?inputErrors.confirmPass.status?inputErrors.confirmPass.value:null:null}</smail>

                            <button className="btn btn-primary mt-4" type='submit'>Submit</button>
                            <small className="sText">{inputErrors.form?inputErrors.form.status?inputErrors.form.value:null:null}</small>
                            <small className="sText">{inputErrors.backend?inputErrors.backend.status?inputErrors.backend.value:null:null}</small>
                            <small className="mt-5 myText text-dark">Are you already registered with us? <Link to="/signin">Signin</Link> </small>

                        </div>

                    </Zoom>
                </form>
                </div>
        </div>
    );
}
