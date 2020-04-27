import React from 'react';

import '../styles/main.css';


const Footer = (props) => {
    return (
        <div className="footer">

            <div className="row footer-combine">
                <div className="footer-info col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <h3>Milad Mosadegh</h3>
                    <div className="footer-links">
                        <a href="/" className="fa fa fa-envelope-o" />
                        <a href="/" className="fa fa-instagram " />
                        <a href="/" className="fa fa-facebook " />
                    </div>
                </div>
                <div className="footer-info col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                    <h3>Ather Ahmad</h3>
                    <div className="footer-links">
                        <a href="/" className="fa fa fa-envelope-o" />
                        <a href="/" className="fa fa-instagram " />
                        <a href="/" className="fa fa-facebook " />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Footer;