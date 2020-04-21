import React, { useState } from 'react';
import "./productstyles.css"
import PictureSlider from './pictureSlider';




const ProductDetails = ({ showModel, handleClose, title, description, images }) => {

    const [bgImage, setBgImage] = useState(images.length > 0 ? images[0] : "noimage.png");
    const handleBgImage = (backgroundImage) => {
        console.log("backgroundImage Image", backgroundImage);
        setBgImage(backgroundImage)
    }
    return (
        <div className="my-container" show={showModel} onHide={handleClose}>
            <div className="imageBox">
                <div>

                    <div className="largImage"
                        style={{
                            backgroundImage: `url(${`http://localhost:5000/avatars/${bgImage}`})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <button className='btn' onClick={handleClose}>
                            X
                        </button>
                    </div>
                    <div className="content">
                        <div>
                            {description}
                        </div>
                        <div>
                            {title}
                        </div>
                    </div>
                </div>

                <div className="thumbNailImage">
                        <PictureSlider
                            images={images}
                            handleBgImage={handleBgImage}
                        />
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;