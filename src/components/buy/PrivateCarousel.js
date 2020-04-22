import React from 'react';

import './privateCarouStyle.css'

import pic1 from '../../images/art.jpg'
const PrivateCarousel = ({ image }) => {
    return (
        <div className="myWrapper">
            <div className="mySlider">
                <div className="mySlide">
                    <div >
                        <img src={pic1} alt="" />
                        <img src={pic1} alt="" />
                        <img src={pic1} alt="" />
                        <img src={pic1} alt="" />
                        <img src={pic1} alt="" />
                        <img src={pic1} alt="" />
                        <img src={pic1} alt="" />
                        <img src={pic1} alt="" />
                        <img src={pic1} alt="" />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PrivateCarousel;