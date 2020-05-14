import React, { useState, useEffect } from 'react';
import '../styles/main.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import ItemCard from '../landingpage/itemCard';
import GET from "../lib/get"

export default function Products({ products, setTargetProduct,url }) {
    const [favourit, setFavourit]=useState([])
    useEffect(()=>{
        const getFavourities = async()=>{
            if(!localStorage.getItem("c2c-token")) return
            let response= await GET("/api/account/getfavoritelist")
            if(response.data.status==="success")
            console.log(response.data.favourities)
            setFavourit(response.data.favourities)
        }
        getFavourities()
    },[])
    return (
        <div className="container">
            <div className="myWrap mt-5">
                {products ? products.map(product =>
                    <ItemCard
                        setTargetProduct={setTargetProduct}
                        title={product.title}
                        price={product.price}
                        id={product._id}
                        images={product.images.length > 0 ? product.images[0] : 'noimage.png'}
                        favourit={favourit}
                        url={url?url:`/api/buy/activeproductdetails`}
                    />

                ) : null}
            </div>
        </div>
    )
}



