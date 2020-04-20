import React, { useState, useEffect } from 'react';

import MyCarousel from '../carousel/carousel';
import PopularProduct from './poplularproducts';
import LastSeen from './lastseen';
import SearchBar from '../searchBar/searchbar';
import MyNavbar from '../navbar/navBar';
import GET from '../lib/get';
import SlideShow from '../buy/slideShow';
import FilterBar from '../filterBar/filterBar';
import Products from "../buy/products"




const Home = (props) => {
    const [auth, setAuth] = useState(false)

    // for testing filters
    const [products, setProducts] = useState("")
    useEffect(() => {
        const fetchData = async () => {

            let response = await GET("/api/buy/allproducts")
            console.log("response from buy", response)
            setProducts(response.data.data)
        }
        fetchData()

    }, [])
    const interProduct = () => {
        console.log("Inter Product Loged");

    }
    const filterHandler =(e)=>{

        e.preventDefault();
        let colorValue      = parseInt(e.target.color.value)
        let categoryValue   = parseInt(e.target.category.value)
        let conditionValue  = parseInt(e.target.condition.value)
        let priceValue      = parseInt(e.target.price.value)
        console.log(products, "this is products array")
        let filteredProducts=products
                                .filter(product=>{
                                    if(categoryValue!==0) return product.category===categoryValue
                                    else return true
                                })
                                .filter(product=>{
                                    if(colorValue!==0) return product.color===colorValue
                                    else return true
                                })
                                .filter(product=>{
                                    if(conditionValue!==0) return product.condition===conditionValue
                                    else return true
                                })
                                .filter(product=>{
                                    if(priceValue!==0) return product.price===priceValue
                                    else return true
                                })



        console.log(filteredProducts, "it is filtered array of products")
    }
    // ending filter test here

    useEffect(() => {
        if (localStorage.getItem("c2c-token")) 
            {
            const getData =async ()=>{
                let response = await GET("/api/auth/authenticated")
                if(response.data){
                    if(response.data.status==="success") setAuth(true)
                    }
                else setAuth(false)
                }
            getData()
            }

    }, [])
    return (
        <div style={{ height: "100vh" }} >
            <MyNavbar {...props} />
            <div className="container" style={{ marginTop: "20px" }} >
                <MyCarousel />
                <SearchBar />
                <FilterBar 
                  filterHandler={filterHandler}  
                />
            </div>
            <Products
                    products={products}
                    interProduct={interProduct}
                />
            <PopularProduct />
            {auth ? <LastSeen /> : null}
            <SlideShow/>
        </div>
    );
}

export default Home;