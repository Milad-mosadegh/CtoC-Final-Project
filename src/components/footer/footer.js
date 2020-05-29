import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/main.css';

import logo from '../../logo/1.png'
const MyFooter = (props) => {
    return (
        <div className="footer">
            <div className="footerLogo ">
                <img src={logo} alt="logo" />
            </div>
            <div className="container">
                <div className="footerInfo">
                    <div className="footerBox col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <Link className="footerLink" to='/sellitems'>Sell</Link>
                        <Link className="footerLink" to='/buyitems'>Buy</Link>
                        <Link className="footerLink" to='/contact'>Contact</Link>
                    </div>
                    <div className="footerBox col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <Link className="footerLink" to='/account'>Profile</Link>
                        <Link className="footerLink" to='/messages'>Message</Link>
                        <Link className="footerLink" to='/signin'>Signin</Link>
                        <Link className="footerLink" to='/signup'>Signup</Link>
                    </div>

                    <div className="footerBox col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <h3>Find us ...</h3>
                        <a className="footerLink" href='https://github.com/Milad-mosadegh'>Milad Mosadegh</a>
                        <a className="footerLink" href='https://github.com/atherahmad'>Ather Ahmad</a>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default MyFooter;