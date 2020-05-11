import React, { useEffect, useState } from 'react';

import Products from '../../buy/products';
import ProductDetails from '../../buy/productDetails';
import GET from '../../lib/get';
import axios from "axios"
const Favorites = (props) => {

    const [products, setProducts] = useState([])
    const [showMainComponent, setShowMainComponents] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")



    useEffect(() => {
     
            axios.get("/api/account/getfavoriteproducts", {headers:{
                'x-auth-token':localStorage.getItem("c2c-token")
            }})
            .then(res=>setProducts(res.data.products))
            .catch(err=>err)
     
    },[])

    const setTargetProduct = (id) => {
        setShowMainComponents(false)
        setShowModal(true)
        setProductId(id)
    }


    const handleClose = () => {
        setShowModal(false)
        setShowMainComponents(true)

    }

    return (
        <div>
            <div className="d-flex">
                <div className="row">
                    <Products
                        products={products}
                        setTargetProduct={setTargetProduct}
                    />
                </div>
            </div>
            {showModal ?
                <ProductDetails showModel={showModal} handleClose={handleClose}
                    id={productId}
                /> : null}
        </div>
    )
}


export default Favorites;