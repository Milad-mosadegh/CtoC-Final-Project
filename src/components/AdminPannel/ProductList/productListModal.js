import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../styles/main.css'


function ProductListModal({ closeHandler, productId }) {
    const [product, setProduct] = useState(false)
    const [bgImage, setBgImage] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)


    useEffect(() => {
        // let response = await GET("/api/account/profile")
        axios.get(`/api/buy/activeproductdetails/${productId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.data.success) {
                    setProduct(res.data.success)
                    console.log("productListModal", res.data.data);
                }
            })
            .catch(err => err)
    }, [])

    return (
        <div className="adminRedBox">
            {console.log("Product in admin", product)}
            <div className="adminRedBox-head"></div>
            <div className="active-message-text">
                <h1>{product.title}</h1>
            </div>

            <div>
                <img
                    width="200px" height="200px"
                    src={`http://localhost:5000/avatars/${bgImage}`} alt="profile Image" />
            </div>

            <div className="adminPopupContent">

                <div className="bg-gray m-1">
                    <strong>User-ID:</strong> {product._id}
                </div>
                <div className="bg-gray m-1">
                    <strong>Name:</strong> {product.firstName}
                </div>

                <div className="bg-gray m-1">
                    <strong>Price:</strong> {product.price} €
                </div>
                <div className="bg-gray m-1">
                    <strong>Color:</strong> {product.color}
                </div>
                <div className="bg-gray m-1">
                    <strong>Access Level:</strong> {product.admin ? "Admin" : "User"}
                </div>
                <div className="bg-gray m-1 mb-2">
                    <input id="exampleCheck1" type="checkbox" className="form-check-input" value={product.admin} onChange={() => { setShowUpdate(true) }} /> <strong>Block it</strong>

                </div>

            </div>

            <div className="bg-gray mb-5">
                <strong>Description:</strong> <br /> {product.description}
            </div>

            <button style={{ float: "left" }}
                onClick={closeHandler}
                className="myRedButton-lg m-1">
                Close
                </button>

            {showUpdate ? <button style={{ float: "right" }}
                onClick={closeHandler}
                className="myOrabgeButton-lg m-1">
                Update
                </button> : null}


        </div>
    )
}

export default ProductListModal
