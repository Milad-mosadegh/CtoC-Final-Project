import React from 'react';

import '../styles/main.css'
import Zoom from 'react-reveal/Zoom'
import Fade from 'react-reveal/Fade'
import PictureSlider from './pictureSlider';


const ProductDetailsForm = ({ handleBgImage, images, description, postedBy, productId, color, condition, quantity, title, bgImage }) => {
    return (
        <div>
            <div className="pd-row-1">
                <div className="largImage">
                    <img src={`http://localhost:5000/avatars/${bgImage}`} alt="" />
                </div>

                <div className="thumbNailImage">
                    <PictureSlider
                        images={images}
                        handleBgImage={handleBgImage}
                    />
                </div>
            </div>

            <div className="content">
                <h2>{title}</h2>
                <Zoom righ>
                    <div className="myLine"></div>
                </Zoom>
                <Fade right cascade duration={1000}>
                    <div className="innerContent">
                        <h4>Posted By :{postedBy}</h4>
                        <h4>Product Id :{productId}</h4>
                        <h4>Color :{color}</h4>
                        <h4>Condition :{condition}</h4>
                        <h4>Quantity :{quantity}</h4>
                    </div>
                </Fade>
                <Zoom righ duration={2500}>
                    <div className="myLine2"></div>
                </Zoom>
                <h4>{description}</h4>
            </div>
        </div>
    );
}

export default ProductDetailsForm;


{/* <div className="largImage"
    style={{
        backgroundImage: `url(${`http://localhost:5000/avatars/${bgImage}`})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        outline: "none"
    }}
>
</div>
    <div className="content">
        <h2>{productDetail.title}</h2>
        <Zoom righ>
            <div className="myLine"></div>
        </Zoom>
        <Fade right cascade duration={1000}>
            <div className="innerContent">
                <h4>Posted By :{productDetail ? productDetail.creator.firstName : null}</h4>
                <h4>Product Id :{productDetail ? productDetail.creator._id : null}</h4>
                <h4>Color :{productDetail.color}</h4>
                <h4>Condition :{productDetail.condition}</h4>
                <h4>Quantity :{productDetail.quantity}</h4>
            </div>
        </Fade>
        <Zoom righ duration={2500}>
            <div className="myLine2"></div>
        </Zoom>
        <h4>{productDetail.description}</h4>
    </div> */}






/*
style = {{
    backgroundImage: `url(${`http://localhost:5000/avatars/${bgImage}`})`,
        backgroundPosition: 'center',
            backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                    outline: "none"
}} */