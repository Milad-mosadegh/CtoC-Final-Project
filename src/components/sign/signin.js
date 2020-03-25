import React from 'react';
import '../../App.css'
import Zoom from 'react-reveal/Zoom'

const Signin = () => {
    return (
        <div className="App-header">
            <Zoom botoom>
                <form className="d-flex w-50 shadow-lg p-5 flex-column">
                    <input className="form-control mb-2 " name="email" type="email" placeholder="Email" />
                    <input className="form-control mb-2 " name="pass" type="password" placeholder="Password" />
                    <button className="btn btn-primary mb-5 " type="submit">Submit</button>
                    <p>You are not registered yet? <a href="/">Signup</a> </p>
                </form>
            </Zoom>

        </div>
    );

}

export default Signin;


