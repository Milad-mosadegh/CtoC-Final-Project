import React, { useState, useEffect } from 'react';
import '../styles/main.css'
import Zoom from 'react-reveal/Zoom'
import Fade from 'react-reveal/Fade'
import PictureSlider from './pictureSlider';
import NewMessage from "../messages/newMessage";
import '../styles/main.css';
import GET from '../lib/get';

const ProductDetails = ({ id, showModel, handleClose }) => {
    const [productDetail, setProductDetail] = useState("")
    const [bgImage, setBgImage] = useState("noimage.png")
    useEffect(() => {
        const getProductDetails = async () => {
            let response = await GET(`/api/buy/productDetails/${id}`)
            setProductDetail(response.data.data)
            if (response.data.data.images.length > 0) setBgImage(response.data.data.images[0])
            
        }
        getProductDetails()
        console.log("Product id :", id);

    }, [])


    const handleBgImage = (backgroundImage) => {
        console.log("backgroundImage Image", backgroundImage);
        setBgImage(backgroundImage)
    }


    console.log(productDetail, "in details")
    return (
        
        <div className="my-container" show={showModel} onHide={handleClose}>
            <button className='btn cancelBtn' onClick={handleClose}>
                X
            </button>
            <div className="myCenter">
                <div className="imageBox">
                    <Zoom>
                        <div>
                            <div className="largImage"
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
                                        <h4>Posted By :{productDetail.creator?productDetail.creator.firstName:null}</h4>
                                        <h4>Color :{productDetail.color}</h4>
                                        <h4>Condition :{productDetail.condition}</h4>
                                        <h4>Quantity :{productDetail.quantity}</h4>
                                    </div>
                                </Fade>
                                <Zoom righ duration={2500}>
                                    <div className="myLine2"></div>
                                </Zoom>
                                <h4>{productDetail.description}</h4>
                            </div>
                {productDetail.creator?
                    productDetail.creator._id===JSON.parse(localStorage.getItem("c2c-profile")).id?
                        <button className='btn btn-warning'>Edit</button>
                        :<div>
                            <div className="myIcon">
                                <div className="myIcons fa fa-thumbs-o-up"></div>

                                <NewMessage
                                    title={productDetail.title}
                                    productId={productDetail._id}
                                    recipentId={productDetail.creator?productDetail.creator._id:null} />
                                <div className="myIcons fa fa-phone"></div>

                            </div>
                            <a href="/" className='btn but-big'>Buy</a>
                        </div>
                :null}
                    </div>

                    </Zoom>


                    <div className="thumbNailImage">
                        <PictureSlider
                            images={productDetail.images}
                            handleBgImage={handleBgImage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;