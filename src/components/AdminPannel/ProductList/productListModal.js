import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../styles/main.css'


function ProductListModal({ closeHandler, productId }) {
    const [product, setProduct] = useState(false)
    const [bgImage, setBgImage] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [blocked, setBlocked]=useState(false)


    useEffect(() => {

        axios.get(`/api/admin/productdetails/${productId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.data.success) {
                    setProduct(res.data.success)
                    setBlocked(res.data.success.blocked)
                }
            })
            .catch(err => err)
    }, [])

    const updateHandler=()=>{
        axios.post("/api/admin/blockproduct", { id:productId }, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
    
            .then(res => {
                if(res.data.success) {

                    setBlocked(!blocked)
                    setShowUpdate(false)
                }
            })
            .catch(err => err)
        }
    

    return (
        <div className="adminRedBox">
            {console.log("Product in admin", product)}
            <div className="adminRedBox-head"></div>
            <div className="active-message-text">
                <h1>{product.title}</h1>
            </div>

            <div >
                <img
                    width="180px" height="200px"
                    className="modalImageShadow"
                    src={`http://localhost:5000/avatars/${bgImage}`} alt="profile Image" />
            </div>

            <div className="adminPopupContent">

                <div className="bg-gray m-1">
                    <strong>Product-ID:</strong> {product._id}
                </div>
                <div className="bg-gray m-1">
                    <strong>Creator-ID:</strong> {product.creator}
                </div>

                <div className="bg-gray m-1">
                    <strong>Price:</strong> {product.price} €
                </div>
                {product.active?<div className="bg-gray m-1 mb-2">
                    <input id="exampleCheck1" type="checkbox" className="form-check-input" value={product.admin} onChange={() => { setShowUpdate(true) }} />
                    <strong>Block It.</strong>

                </div>:null}

            </div>

            <div className="bg-gray mb-5">
                <strong>Description:</strong> <br /> {product.description}
            </div>

            <button style={{ float: "left" }}
                onClick={closeHandler}
                className="myRedButton-lg m-1">
                Close
                </button>
            {blocked?<p>You have successfully updated thie Product status!</p>:null}
            {showUpdate ? <button style={{ float: "right" }}
                onClick={updateHandler}
                className="myOrabgeButton-lg m-1">
                Update
                </button> : null}


        </div>
    )
}

export default ProductListModal
