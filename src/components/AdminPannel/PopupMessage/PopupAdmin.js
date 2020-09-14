import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../styles/main.css'


function AdminRedAlertBox({ adminRedBoxTitle, closeHandler, productId, adminRedBoxImage, adminRedCreator }) {
    const [product, setProduct] = useState(false)
    const [bgImage, setBgImage] = useState(false)


    useEffect(() => {
        axios.get(`/api/buy/activeproductdetails/${productId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.data.success) {
                    setProduct(res.data.success)
                        (res.data.success.images.length > 0 ? setBgImage(res.data.success.images[0]) : null)
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
                <img src={bgImage} width="200px" height="200px" />
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

            </div>

            <div className="bg-gray mb-5">
                <strong>Description:</strong> {product.description}
            </div>

            <button style={{ float: "left" }}
                onClick={closeHandler}
                className="myRedButton-sm m-1">
                Close
                </button>

        </div>
    )
}

export default AdminRedAlertBox
