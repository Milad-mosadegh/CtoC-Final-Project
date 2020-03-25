import React from 'react';

import { ArrowRight } from 'react-bootstrap-icons'

const Footer = () => {
    return (
        <div className='fixed-bottom bg-dark text-light' >
            <h3>You Can Find Us Here</h3>
            <div className="d-flex justify-content-around">

                <h3><a href="/">Milad Mosadegh</a></h3>
                <h3><a href="/">Ather Ahmad</a></h3>

            </div>
        
    );
}

export default Footer;