import React, { useState, useEffect } from 'react';
import MyNavbar from '../navbar/navBar';
import SearchBar from '../searchBar/searchbar';
import FilterBar from '../filterBar/filterBar';
import Products from './products';
import GET from '../lib/get';


const SelectedCategories = (props) => {

    const [products, setProducts] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [showMainComponent, setShowMainComponents] = useState(true)
    const { targetCategory } = props

    useEffect(() => {
        const getProducts = async () => {
            let response = await GET(`/api/buy/${targetCategory}`)

            if (response.data.status === "success") setProducts(response.data.products)
        }
        getProducts()
    }, [])





    const interProduct = (id) => {
        setShowMainComponents(false)
        setShowModal(true)
        setProductId(id)
    }

    return (
        <div>
            <MyNavbar {...props} />
            <div className='container'>
                <SearchBar />
                <FilterBar />
                <Products products={products} interProduct={interProduct} />

            </div>
        </div>
    );
}

export default SelectedCategories;