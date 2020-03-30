import React, {useState}            from 'react';
import TextField        from '@material-ui/core/TextField';
import { makeStyles }   from '@material-ui/core/styles';
import '../../App.css';
import Zoom             from 'react-reveal/Zoom';
import POST             from "../lib/post";
import './style.css'



const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',

        },

    },
}));

export default function MaterialSignup() {
    const classes = useStyles();

    const [firstName,       setFirstName] = useState("");
    const [lastName,         setLastName] = useState("");
    const [email,               setEmail] = useState("");
    const [pass,                 setPass] = useState("");
    const [confirmPass,   setconfirmPass] = useState("");
    const [error,               setError] = useState("");
    const [formError,       setFormError] = useState(true);



    const changeHandler=e=>{

        const regexName  = new RegExp(/^[a-zA-ZäöüÄÖÜß]*$/) 
        const regexEmail = new RegExp(/^([a-zA-Z0-9_\-.äöüÄÖÜß_]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)

        switch(e.target.name){
            case "firstName":
                    if((!regexName.test(e.target.value)) || (e.target.value.length<3)) setError(e.target.name)
                    else setError("")
                    setFirstName(e.target.value) 
                    break;
            case "lastName": 
                    if((!regexName.test(e.target.value)) || (e.target.value.length<3)) setError(e.target.name)
                    else setError("")
                    setLastName(e.target.value) 
                    break;
            case "email":
                    if(!regexEmail.test(e.target.value)) setError(e.target.name)
                    else setError("")
                    setEmail(e.target.value) 
                    break; 
            case "pass":
                    setPass(e.target.value)
                    if((e.target.value.length < 6) || (e.target.value.length > 12)){
                        setError(e.target.name) 
                    } 
                    else if(e.target.value!==confirmPass)setError("confirmPass")
                            else setError("")
                    break;
            case "confirmPass":
                    setconfirmPass(e.target.value)
                    if(pass!== e.target.value) setError(e.target.name) 
                    else setError("")
                    break;
            default:
                    break;
        }
     }

    const submitHandler = async(e)=>{
    
            e.preventDefault();

            if(!error) {
                const formData ={firstName,lastName,email, pass}
                Object.keys(formData).map(d=>{
                            if(formData[d]==="") setFormError(true)
                                else setFormError(false)})
                if(formError===true) return
                    else {
                        const response = await POST("/api/auth/signup",formData)
                        console.log(response)
                }
            }
        }

    return (
        <div className='App-header backc'>
        
            <form   className={classes.root} 
                    noValidate autoComplete="off" 
                    onSubmit={submitHandler}>
                <Zoom >
                    <div className="d-flex 
                                    shadow-lg p-5 flex-column 
                                    gerd text-light">
                        {/* <TextField required id="standard-required" label="Required" defaultValue="Hello World" /> */}

                        <TextField
                            id="standard-name-input"
                            label="First Name"
                            type="name"
                            autoComplete="current-name"
                            name="firstName"
                            value={firstName}
                            onChange={changeHandler}
                        />
                        {error==="firstName"?<p>Attention! name must consist on 3 or more alphabets</p>:null}
                        
                        <TextField
                            id="standard-name-input"
                            label="Last Name"
                            type="name"
                            autoComplete="current-name"
                            name="lastName"
                            value={lastName}
                            onChange={changeHandler}
                        />
                        {error==="lastName"?<p>Attention! name must consist on 3 or more alphabets</p>:null}
                        <TextField
                            id="standard-email-input"
                            label="Email"
                            type="email"
                            autoComplete="current-email"
                            name="email"
                            value={email}
                            onChange={changeHandler}
                        />
                        {error==="email"?<p>Attention! please provide a valid email address</p>:null}
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            name="pass"
                            value={pass}
                            onChange={changeHandler}
                        />
                        {error==="pass"?<p>Attention! password length must be from 6 to 12 characters.</p>:null}

                        <TextField
                            id="standard-password-input"
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            name="confirmPass"
                            value={confirmPass}
                            onChange={changeHandler}
                        />
                        {error==="confirmPass"?<p>Attention! password and confirm passowrd must be same.</p>:null}

                        <button className="btn btn-primary mt-4" type="submit">Submit</button>
                        <small className="mt-5">Already Registered? <a href="/">Signin</a> </small>
                    </div>
                </Zoom>
            </form>
        </div>
    );
}

