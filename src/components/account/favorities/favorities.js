import React, { useEffect, useState } from 'react';

import Products from '../../buy/products';
import ProductDetails from '../../buy/productDetails';
import axios from "axios"
const Favorites = (props) => {

    const {favorit, favoritHandler} = props
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")



    useEffect(() => {

        axios.get("/api/account/getfavoriteproducts", {
            headers: {
                'x-auth-token': localStorage.getItem("c2c-token")
            }
        })
            .then(res => setProducts(res.data.products))
            .catch(err => err)

    }, [])

    const setTargetProduct = (id) => {
        setShowModal(true)
        setProductId(id)
    }


    const handleClose = () => {
        setShowModal(false)

    }

    return (
        <div className='shadow'>
            <div className="d-flex">
                <div className="row">
                    <Products
                        products={products}
                        setTargetProduct={setTargetProduct}
                        favorit={favorit}
                        favoritHandler={favoritHandler}
                    />
                </div>
            </div>
            {showModal ?
                <ProductDetails showModel={showModal} handleClose={handleClose}
                    id={productId} {...props}
                /> : null}
        </div>
    )
}


export default Favorites;