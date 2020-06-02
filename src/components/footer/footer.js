import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/main.css';

import logo from '../../logo/1.png'
const MyFooter = (props) => {
    return (
        <div className="footer p-2">
            <div className="footerLogo col-lg-2 col-md-2 col-sm-12">
                <img src={logo} alt="logo" />
            </div>
            <div className=" footerInfo col-lg-4 col-md-4 col-sm-4">
                <Link className="footerLink" to='/sellitems'>Sell</Link>
                <Link className="footerLink" to='/buyitems'>Buy</Link>
                <Link className="footerLink" to='/contact'>Contact</Link>
                <Link className="footerLink" to='/signin'>Signin</Link>
            </div>

            <div className="footerInfo col-lg-4 col-md-4 col-sm-4">
                <h5 className="mt-2">&copy; {new Date().getFullYear()} Copyright :</h5>
                <a className="footerLink2 ml-2" href='https://github.com/Milad-mosadegh'>Milad Mosadegh</a>
                <a className="footerLink2 ml-2" href='https://github.com/atherahmad'>Ather Ahmad</a>
            </div>
        </div>


    );
}

export default MyFooter;