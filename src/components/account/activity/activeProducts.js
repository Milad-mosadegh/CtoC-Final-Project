import React,{useEffect, useState} from 'react'
import Zoom from 'react-reveal/Zoom';
import Products from '../../buy/products';
import axios from "axios"

function ActiveProducts({setTargetProduct}) {

    const [activeProducts, setActiveProducts] = useState("")
    useEffect(() => {
        axios.get("/api/account/myproducts")
        .then(res=>setActiveProducts(res.data.products))
        .catch(err=>err)
    }, [])
    return (
        <Zoom>
                <Products
                    products={activeProducts}
                    setTargetProduct={setTargetProduct}
                    url={"/api/buy/activeproductdetails"}
                />
        </Zoom>
    )
}

export default ActiveProducts
