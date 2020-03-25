import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css'
import Zoom from 'react-reveal/Zoom'

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

    return (
        <div className='App-header backc'>
            <form className={classes.root} noValidate autoComplete="off">
                <Zoom >
                    <div className="d-flex shadow-lg p-5 flex-column gerd text-light">
                        {/* <TextField required id="standard-required" label="Required" defaultValue="Hello World" /> */}

                        <TextField
                            id="standard-name-input"
                            label="First Name"
                            type="name"
                            autoComplete="current-name"
                            name="fname"

                        />
                        <TextField
                            id="standard-name-input"
                            label="Last Name"
                            type="name"
                            autoComplete="current-name"
                            name="lname"

                        />
                        <TextField
                            id="standard-name-input"
                            label="Last Name"
                            type="name"
                            autoComplete="current-name"
                            name="lname"
                        />

                        <TextField
                            id="standard-username-input"
                            label="Username"
                            type="username"
                            autoComplete="current-username"
                            name="username"
                        />
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
                        <TextField
                            id="standard-password-input"
                            label="Re-Password"
                            type="password"
                            autoComplete="current-password"
                            name="repass"
                        />

                        <button className="btn btn-primary mt-4">Submit</button>
                        <small className="mt-5">You have already Account? <a href="/">Signin</a> </small>

                    </div>

                </Zoom>
            </form>
        </div>
    );
}
