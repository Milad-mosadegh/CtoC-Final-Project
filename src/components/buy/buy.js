import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNavbar from '../navbar/navBar';
import SearchBar from '../searchBar/searchbar';
import Products from "./products"
import SlideShow from './slideShow';
import GET from '../lib/get';

import FilterBar from "../filterBar/filterBar"
import ProductDetails from './productDetails';
import { Link } from 'react-router-dom';


const BuyComponent = (props) => {
    const [products, setProducts] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [modalId, setModalId] = useState(0)
    const [filteredProducts, setFilteredProducts] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            let response = await GET("/api/buy/allproducts")
            console.log("response from buy", response)
            setProducts(response.data.data)
        }
        fetchData()
    }, [])

    const filterHandler = (e) => {

        e.preventDefault();
        let colorValue = parseInt(e.target.color.value)
        let categoryValue = parseInt(e.target.category.value)
        let conditionValue = parseInt(e.target.condition.value)
        let priceValue = parseInt(e.target.price.value)
        setFilteredProducts(products
            .filter(product => {
                if (categoryValue !== 0) return product.category === categoryValue
                else return true
            })
            .filter(product => {
                if (colorValue !== 0) return product.color === colorValue
                else return true
            })
            .filter(product => {
                if (conditionValue !== 0) return product.condition === conditionValue
                else return true
            })
            .filter(product => {
                if (priceValue !== 0) return product.priceRange === priceValue
                else return true
            }))

    }

    const interProduct = (id) => {
        /*    <Link to='/productdetails'>
   
           </Link> */
        setShowModal(true)
        setModalId(id)
    }

    const handleClose = () => {

        setShowModal(false)
    }
    return (
        <div>
            <MyNavbar {...props} />
            <SearchBar
                products={filteredProducts ? filteredProducts : products}
            />
            <SlideShow />
            <FilterBar
                filterHandler={filterHandler}
            />
            {console.log("filtered products", filteredProducts)}
            {console.log("all products", products)}

            <Products
                products={filteredProducts ? filteredProducts : products}
                interProduct={interProduct}
            />
            <div>
                {showModal ?
                    <ProductDetails showModel={showModal} handleClose={handleClose}
                        {...products[modalId]}
                    /> : null}
            </div>
        </div>
    );
}

export default BuyComponent;    