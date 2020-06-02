import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNavbar from '../navbar/navBar';
import SearchBar from '../searchBar/searchbar';
import Products from "./products"
import SlideShow from './slideShow';
import GET from '../lib/get';
import axios from "axios"
import FilterBar from "../filterBar/filterBar"
import ProductDetails from './productDetails';
// import { IfNotAuthenticated } from '../lib/auth';



const BuyComponent = (props) => {
    const [products, setProducts] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [filteredProducts, setFilteredProducts] = useState("")
    const [showMainComponent, setShowMainComponents] = useState(true)
    const [favorit, setFavorit] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            let response = await GET("/api/buy/allproducts")
            setProducts(response.data.data)
        }
        fetchData()
        const getFavorities = async()=>{
            if(!localStorage.getItem("c2c-token")) return
            let response= await GET("/api/account/getfavoritelist")
            if(response.data.status==="success")
            setFavorit(response.data.favourities)
        }
        getFavorities()
    }, [])

    const favoritHandler = async()=>{
        let response= await GET("/api/account/getfavoritelist")
            if(response.data.status==="success") setFavorit(response.data.favourities)
    }
    const searchHandler=(text, category)=>{
        console.log("search handler called", text, "category", category)
        axios.get(`/api/buy/categories/${category}`)
            .then(res => {if(res.data.success) setProducts(res.data.products)})
            .catch(err => err)
    }

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
            <MyNavbar {...props} />

            {showMainComponent?<><div className="container">
                <SlideShow />
            </div>


            <div style={{
                visibility: showMainComponent ? "visible" : "hidden",
                opacity: 1,
                transition: "visibility 0s 0.5s, opacity 0.5s linear"
            }}>
                <SearchBar
                    products={filteredProducts ? filteredProducts : products}
                    category={0}
                    searchHandler={searchHandler}
                    {...props}
                />

                <FilterBar
                    filterHandler={filterHandler}
                />

                <Products
                    products={filteredProducts ? filteredProducts : products}
                    setTargetProduct={setTargetProduct}
                    favorit={favorit}
                    favoritHandler={favoritHandler}
                />
            </div></>:null}
            {showModal ?
                <ProductDetails showModel={showModal} handleClose={handleClose}
                    id={productId} {...props}
                />
                : null}
        </div>
    );
}

export default BuyComponent;    