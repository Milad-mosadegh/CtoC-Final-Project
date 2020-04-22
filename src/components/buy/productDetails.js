import React, { useState } from 'react';
import "./productstyles.css"
import Zoom from 'react-reveal/Zoom'
import Slide from 'react-reveal/Slide'
import Fade from 'react-reveal/Fade'




const ProductDetails = ({ showModel, handleClose, title, description, images, color, condition, quantity }) => {

    console.log("images i got in product detail", images)

    const [bgImage, setBgImage] = useState(images.length > 0 ? images[0] : "noimage.png");

    const handleBgImage = (backgroundImage) => {
        console.log("backgroundImage Image", backgroundImage);
        setBgImage(backgroundImage)
    }



    return (
        <div className="my-container" show={showModel} onHide={handleClose}>
            <div className="imageBox">
                <Zoom>
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
                            <h2>{title}</h2>
                            <Zoom righ>
                                <div className="myLine"></div>
                            </Zoom>
                            <Fade right cascade duration={1000}>
                                <div className="innerContent">
                                    <h3>Color :{color}</h3>
                                    <h3>Condition :{condition}</h3>
                                    <h3>Quantity : {quantity}</h3>
                                </div>
                            </Fade>
                            <Zoom righ duration={2500}>
                                <div className="myLine2"></div>
                            </Zoom>
                            <h4>{description}</h4>
                        </div>

                        <div className="myIcon">
                            <div className="myIcons fa fa-thumbs-o-up"></div>
                            <div className="myIcons fa fa-envelope-o"></div>
                            <div className="myIcons fa fa-phone"></div>

                        </div>
                        <a href="/" className='btn but-big'>Buy</a>
                    </div>

                </Zoom>


                <div className="thumbNailImage">
                    <Slide right cascade>
                        {images.map(image =>
                            <div className="thumb"
                                onClick={() => handleBgImage(image)}
                                style={{
                                    backgroundImage: `url(${`http://localhost:5000/avatars/${image ? image : null}`})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    cursor: "pointer"
                                }}
                            >
                                {/* <PrivateCarousel image={image} style={{
                            backgroundImage: `url(${`http://localhost:5000/avatars/${image ? image : null}`})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            cursor: "pointer"
                        }} /> */}

                            </div>
                        )}
                    </Slide>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;