import React, { useState, useEffect } from 'react';
import Products from '../buy/products';
import GET from '../lib/get';



const LatestProduct = (props) => {

    const [latestProducts, setLatestProducts] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [showMainComponent, setShowMainComponents] = useState(true)
    const setTargetProduct = (id) => {
        setShowMainComponents(false)
        setShowModal(true)
        setProductId(id)
    }

    const handleClose = () => {
        setShowModal(false)
        setShowMainComponents(true)

    }

    useEffect(() => {
        const getData = async () => {
            let response = await GET("api/buy/latestprdoucts")
            if (response.data.status === "success") setLatestProducts(response.data.data)
        }
        getData()
    }, [])

    return (
        <div className="popProBox">
            <div className="popProBox-content ">
                <h2>Latest Product</h2>
                <div className="popProBox-cards row ">
                    <Products
                        products={latestProducts}
                        setTargetProduct={props.setTargetProduct}
                    />
                </div>
            </div>
        </div>
    );
}

export default LatestProduct;