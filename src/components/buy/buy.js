import React, {useEffect, useState} from 'react';

import MyNavbar from '../navbar/navBar';
import SearchBar from '../searchBar/searchbar';
import Products from "./products"

import SlideShow from './slideShow';
import GET from '../lib/get';





const BuyComponent = (props) => {

    const [products, setProducts] = useState("")

    useEffect(()=>{

        const fetchData=async()=>{

            let response= await GET("/api/buy/allproducts")
            console.log("response from buy", response)
            setProducts(response.data.data)
        }
        fetchData()
        
    },[])
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
                />
            </div>
            <div>

            </div>
        </div>
    );
}

export default BuyComponent;    