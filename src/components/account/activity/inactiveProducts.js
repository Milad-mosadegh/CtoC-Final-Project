import React,{useEffect, useState} from 'react'
import Zoom from 'react-reveal/Zoom';
import Products from '../../buy/products';
import axios from "axios"

function InactiveProducts({setTargetProduct, favorit, favoritHandler}) {

    const [inActiveProducts, setInActiveProducts] = useState("")
    useEffect(() => {
        axios.get("/api/account/inactiveproducts")
        .then(res=>setInActiveProducts(res.data.products))
        .catch(err=>err)
    }, [])
    return (
        <Zoom>
                <Products
                    products={inActiveProducts}
                    setTargetProduct={setTargetProduct}
                    url={`/api/account/inactiveproductdetails`}
                    favorit={favorit}
                    favoritHandler={favoritHandler}
                />
        </Zoom>
    )
}

export default InactiveProducts
