import React, { useState, useEffect } from 'react';
import '../styles/main.css';
import LastSeenDescription from './lastSeenDescription';
import GET from "../lib/get"
import Products from "../buy/products"


const LastSeen = (props) => {
    const [lastSeenProducts, setLastSeenProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            let response = await GET("/api/account/lastseen")
            if (response.data.status === "success") setLastSeenProducts(response.data.data)
            else {
                localStorage.removeItem("c2c-token")
                localStorage.removeItem("c2c-profile")
                props.unAuthenticated()
            }

        }
        if (localStorage.getItem("c2c-token")) getProducts();
        else props.unAuthenticated()


    }, [])

    return (
        <div>
            {props.auth ?
                <div className="wrapAll">
                    <h2>Last Seen</h2>
                    <div className="row wrapAll-cads">
                        <Products
                            products={lastSeenProducts}
                            setTargetProduct={props.setTargetProduct}
                        />
                    </div>
                </div>
                : <LastSeenDescription />
            }
        </div>





    );
}



export default LastSeen;