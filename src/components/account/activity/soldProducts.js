import React,{useEffect, useState} from 'react'
import Zoom from 'react-reveal/Zoom';
import Products from '../../buy/products';
import axios from "axios"

function SoldProducts({setTargetProduct, favoritHandler,favorit}) {
    const [soldProducts, setSoldProducts] = useState("")
    useEffect(() => {
        axios.get("/api/account/soldproducts")
        .then(res=>setSoldProducts(res.data.products))
        .catch(err=>err)
    }, [])

    return (
            <Zoom>
                <Products
                    products={soldProducts}
                    setTargetProduct={setTargetProduct}
                    url={`/api/account/soldproductdetails`}
                    favorit={favorit}
                    favoritHandler={favoritHandler}
                    status="sold"
                />
                
            </Zoom>
    )
}

export default SoldProducts
