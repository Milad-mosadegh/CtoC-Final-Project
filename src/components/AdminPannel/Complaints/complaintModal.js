import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../../styles/main.css'


function ComplaintModal({ closeHandler, complainId}) {

    const [complainData, setComplainData]=useState({})

    useEffect(() => {

        axios.get(`/api/admin/complaindetails/${complainId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setComplainData(res.data.success) })
            .catch(err => err)

    }, [])

    return (
        <div className="adminRedBox">

            <div className="adminBlueBox-head"></div>

            <div className="active-message-text">
                <h1>{complainData.title}</h1>
            </div>

            <div className="adminPopupContent">

                <div className="bg-gray m-1">
                    <strong>User-ID:</strong> {complainData._id}
                </div>
                <div className="bg-gray m-1">
                    <strong>Product-ID:</strong> {complainData.productId}
                </div>
            </div>
            <div className="bg-gray mb-5">
                <strong>Costumer Comments:</strong> <br /> {complainData.message}
            </div>

            <div className="p-2">
                <textarea style={{ width: "100%", height: "200px", padding: "10px" }} placeholder="Write a Comment"></textarea>
            </div>

            <button style={{ float: "left" }}
                // onClick={closeHandler}
                className="myBlueButton-lg m-1">
                Resolved
                </button>
            <button
                // onClick={closeHandler}
                className="myOrabgeButton-lg m-1">
                Invalid
                </button>
            <button style={{ float: "right" }}
                onClick={closeHandler}
                className="myRedButton-lg m-1">
                Close
                </button>
        </div>
    )
}

export default ComplaintModal
