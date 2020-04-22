import React from 'react';

import './privateCarouStyle.css'

const PrivateCarousel = ({ image }) => {
    return (
        <div className="myWrapper">
            <div className="mySlider">
                <div className="mySlide">
                    <div style={image}>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default PrivateCarousel;