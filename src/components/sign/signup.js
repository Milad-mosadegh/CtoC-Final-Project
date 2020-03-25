import React from 'react';
import '../../App.css'
import Slide from 'react-reveal/Slide'


const Signup = () => {
    return (
        <div className="App-header ">
            <Slide bottom>
                <form className="d-flex w-50 shadow-lg p-5 flex-column">
                    <input className="form-control mb-2 " name="name" type="text" placeholder="Name" />
                    <input className="form-control mb-2 " name="lastname" type="text" placeholder="Last Name" />
                    <input className="form-control mb-2 " name="username" type="text" placeholder="Username" />
                    <input className="form-control mb-2 " name="email" type="email" placeholder="Email" />
                    <input className="form-control mb-2 " name="pass" type="password" placeholder="Password" />
                    <input className="form-control mb-2 " name="repass" type="password" placeholder="Re-Password" />
                    <button className="btn btn-primary mb-5 " type="submit">Submit</button>

                    <p>You already have an acount? <a href="/">Signin</a> </p>
                </form>
            </Slide>
        </div>
    );

}

export default Signup;

