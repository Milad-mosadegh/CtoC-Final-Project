import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Categories from '../lib/categories'

import '../styles/main.css'
import MyNavbar from '../navbar/navBar';
import SearchBar from '../searchBar/searchbar';
import FilterBar from '../filterBar/filterBar';
import Products from '../buy/products';
import GET from '../lib/get';




function SubCategories(props) {
    const type = props.match.params.type
    const title = Categories.filter(data => data.linkName === type)[0].value

    const [products, setProducts] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [filteredProducts, setFilteredProducts] = useState("")
    const [showMainComponent, setShowMainComponents] = useState(true)
    const [favorit, setFavorit] = useState([])


    useEffect(() => {
        axios.get(`/api/buy/categories/${type}`)
            .then(res => setProducts(res.data.products))
            .catch(err => err)
    }, [])



    const favoritHandler = async () => {
        let response = await GET("/api/account/getfavoritelist")
        if (response.data.status === "success") setFavorit(response.data.favourities)
    }

    const setTargetProduct = (id) => {
        setShowMainComponents(false)
        setShowModal(true)
        setProductId(id)
    }

    return (
        <div>
            <MyNavbar {...props} />
            <div className="container">
                <div className="active-message-head"></div>
                <div className="active-message-text">
                    <h1>{title}</h1>
                </div>
            </div>
            <FilterBar />
            <SearchBar />
            <div className="container">
                <Products
                    products={filteredProducts ? filteredProducts : products}
                    setTargetProduct={setTargetProduct}
                    favorit={favorit}
                    favoritHandler={favoritHandler}
                />
            </div>

        </div>
    )
}

export default SubCategories
