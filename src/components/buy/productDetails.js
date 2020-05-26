import React, { useState, useEffect } from 'react';
import '../styles/main.css'
import Zoom from 'react-reveal/Zoom'
import '../styles/main.css';
import GET from '../lib/get';
import ProductDetailsForm from './productDetailsForm';
import { POST } from '../lib/post';
import axios from 'axios';


const ProductDetails = (props) => {

    const { id, showModel, handleClose, url } = props

    const [productDetail, setProductDetail] = useState("")
    const [bgImage, setBgImage] = useState("noimage.png")
    useEffect(() => {
        const getProductDetails = async () => {
            let response = await GET(`${url ? url : `/api/buy/activeproductdetails`}/${id}`)
            setProductDetail(response.data.data)
            if (response.data.data.images.length > 0) setBgImage(response.data.data.images[0])

        }

        getProductDetails()
        return (async () => {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('c2c-token'),
                    'Content-Type': 'application/json'
                }
            }
            await POST("/api/account/lastseen", id, config)
        })

    }, [])


    const handleBgImage = (backgroundImage) => {
        setBgImage(backgroundImage)
    }


    const deactivateHandler = async (id) => {
        await axios.post("/api/products/inactiveproduct", { data: { id } }, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => res)
            .catch(err => err)


    }
    const soldHandler = (id) => {
        axios.post("/api/products/soldproduct", { data: { id } }, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })

            .then(res => res)
            .catch(err => err)
    }
    const activateHandler = (id) => console.log("activate handler called", id)
    const deleteHandler = (id) => console.log("delete handler called", id)

    const editHandler = (id) => props.history.push(`./editproduct/${id}`)

    const reportHandler = (id) => console.log("Report handler called", id)
    const favoriteHandler = (id) => console.log("favorite handler called", id)


    return (
        <div className="my-container" show={showModel} onHide={handleClose}>
            <Zoom>
                <div>
                    <ProductDetailsForm
                        description={productDetail.description}
                        postedBy={productDetail ? productDetail.creator.firstName : null}
                        creatorId={productDetail ? productDetail.creator._id : null}
                        productId={productDetail._id}
                        color={productDetail.color}
                        price={productDetail.price}
                        condition={productDetail.condition}
                        quantity={productDetail.quantity}
                        title={productDetail.title}
                        bgImage={bgImage}
                        images={productDetail.images}
                        handleBgImage={handleBgImage}
                        deactivateHandler={deactivateHandler}
                        activateHandler={activateHandler}
                        deleteHandler={deleteHandler}
                        editHandler={editHandler}
                        reportHandler={reportHandler}
                        favoriteHandler={favoriteHandler}
                        soldHandler={soldHandler}
                        handleClose={handleClose}
                    />
                </div>
            </Zoom>
        </div>

    );
}

export default ProductDetails;