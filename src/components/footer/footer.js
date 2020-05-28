import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/main.css';

import logo from '../../logo/1.png'
const Footer = (props) => {
    return (
        <div>

            <img src={logo} alt="logo" />
            <div className="footer">
                <div className="footerBox">
                    <Link className="footerLink" to='/sell'>Sell</Link>
                    <Link className="footerLink" to='/sell'>Sell</Link>
                    <Link className="footerLink" to='/sell'>Sell</Link>
                </div>
                <div className="footerBox">
                    <Link className="footerLink" to='/sell'>Sell</Link>
                    <Link className="footerLink" to='/sell'>Sell</Link>
                    <Link className="footerLink" to='/sell'>Sell</Link>

                </div>
                <div className="footerBox">
                    <Link className="footerLink" to='/sell'>Sell</Link>
                    <Link className="footerLink" to='/sell'>Sell</Link>
                    <Link className="footerLink" to='/sell'>Sell</Link>
                    <Link className="footerLink" to='/sell'>Sell</Link>

                </div>
                <div className="footerBox">
                    <h3>Wo Made This?</h3>
                    <Link className="footerLink" to='/miladmosadegh'>Milad Mosadegh</Link>
                    <Link className="footerLink" to='/atherahmad'>Ather Ahmad</Link>
                </div>
            </div>
        </div>

    );
}

export default Footer;