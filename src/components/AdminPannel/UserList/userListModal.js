import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../styles/main.css'


function UserListModal({ closeHandler }) {
    const [product, setProduct] = useState('')
    const [bgImage, setBgImage] = useState('')
    const [showUpdate, setShowUpdate] = useState(false)


    useEffect(() => {

        axios.get(`/api/account/profile/`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.data.data) {
                    setProduct(res.data.data)
                        (res.data.data.profileImage ? setBgImage(res.data.data.profileImage) : null)
                }
            })
            .catch(err => err)
    }, [])
    console.log(product);
    return (
        <div className="adminRedBox">
            <div className="adminRedBox-head"></div>
            <div className="active-message-text">
                <h3>{product.firstName} {product.lastName}</h3>
            </div>
            <div>
                <img
                    width="200px" height="200px"
                    src={`http://localhost:5000/avatars/${bgImage}`} alt="profile Image" />
            </div>

            <div className="adminPopupContent">

                <div className="bg-gray m-1">
                    <strong>City:</strong> {product.city}
                </div>
                <div className="bg-gray m-1">
                    <strong>Email:</strong> {product.email}
                </div>

                <div className="bg-gray m-1">
                    <strong>Phone:</strong> {product.phoneNumber}
                </div>
                <div className="bg-gray m-1">
                    <strong>ZipCode:</strong> {product.zipCode}
                </div>
                <div className="bg-gray m-1">
                    <strong>Street:</strong> {product.street}
                </div>
                <div className="bg-gray m-1">
                    <strong>Access Level:</strong> {product.admin ? "Admin" : "User"}
                </div>


            </div>

            <div className="bg-gray m-1 mb-2">
                <input id="exampleCheck1"
                    type="checkbox"
                    className="form-check-input"
                    value={product.admin}
                    onChange={() => { setShowUpdate(true) }} /> <strong>Mark him/her Admin</strong>

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

export default UserListModal
