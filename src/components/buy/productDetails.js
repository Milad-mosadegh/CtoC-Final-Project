import React, { useState, useEffect } from 'react';
import '../styles/main.css'
import Zoom from 'react-reveal/Zoom'


import NewMessage from "../messages/newMessage";
import '../styles/main.css';
import GET from '../lib/get';
import ProductDetailsForm from './productDetailsForm';
import { POST } from '../lib/post';

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
        return (async()=>{
            const config = {
                headers:{
                    'x-auth-token':localStorage.getItem('c2c-token'),
                    'Content-Type': 'application/json'
                }
            }
            let response = await POST("/api/account/lastseen",id,config )
            console.log(response)
        })

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

            <Zoom>
                <div>
                    <ProductDetailsForm
                        description={productDetail.description}
                        postedBy={productDetail ? productDetail.creator.firstName : null}
                        productId={productDetail ? productDetail.creator._id : null}
                        color={productDetail.color}
                        condition={productDetail.condition}
                        quantity={productDetail.quantity}
                        title={productDetail.title}
                        bgImage={bgImage}
                        images={productDetail.images}
                        handleBgImage={handleBgImage}
                        productDetail={productDetail}
                    />

                </div>

            </Zoom>



        </div>

    );
}

export default ProductDetails;