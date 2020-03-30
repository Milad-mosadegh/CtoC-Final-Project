import React from 'react';
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

export default function MaterialSignin() {
    const classes = useStyles();

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
                        />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            name="pass"
                        />

                        <button className="btn btn-primary mt-4" type="submit">Submit</button>
                        <small className="mt-5 myText">You are not registered yet? <a href="/">Signup</a></small>

                    </div>

                </Zoom>
            </form>
        </div>
    );
}

const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
        email: e.target.email.value,
        pass: e.target.pass.value
    }
    const response = await POST("/api/auth/signin", formData)
    console.log(response)
}
