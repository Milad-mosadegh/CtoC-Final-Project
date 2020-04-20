import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'

import MyNavbar from '../navbar/navBar';
import SearchBar from '../searchBar/searchbar';
import Products from "./products"

import SlideShow from './slideShow';
import GET from '../lib/get';
import MyModal from './modal';



const BuyComponent = (props) => {
    const [products, setProducts] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [modalId, setModalId] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            let response = await GET("/api/buy/allproducts")
            console.log("response from buy", response)
            setProducts(response.data.data)
        }
        fetchData()
    }, [])

    const interProduct = (id) => {
        console.log('show', id, modalId)
        setShowModal(true)
        setModalId(id)
    }

    const handleClose = () => {

        setShowModal(false)
    }
    return (
        <div>
            <MyNavbar {...props} />
            <SearchBar />
            <div>
                <SlideShow />
            </div>

            <div>
                {console.log("products in main component after setstate", products)}
                <Products
                    products={products}
                    interProduct={interProduct}
                />
            </div>
            <div>
                {showModal ?
                    <MyModal showModel={showModal} handleClose={handleClose}
                        {...products[modalId]}
                    /> : null}
            </div>
        </div>
    );
}

export default BuyComponent;    