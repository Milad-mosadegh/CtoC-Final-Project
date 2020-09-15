import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../../styles/main.css'


function QuerryModal({ closeHandler, querryId }) {

    const [querry,setQuerry]=useState(false)
   
    useEffect(() => {
        axios.get(`/api/admin/querrydetails/${querryId}`, {
        headers: {
            'x-auth-token': localStorage.getItem('c2c-token'),
            'Content-Type': 'application/json'
        }
    })
        .then(res => { if (res.data.success) setQuerry(res.data.success) })
        .catch(err => err)

}, [])

    return (
        <div className="adminRedBox">

            <div className="adminBlueBox-head"></div>

            <div className="active-message-text">
                <h1>Querries</h1>
            </div>

            <div className="adminPopupContent">

                <div className="bg-gray m-1">
                    <strong>Query-ID:</strong> {querry._id}
                </div>
                <div className="bg-gray m-1">
                    <strong>Sender:</strong> {querry.name}
                </div>
            </div>
            <div className="adminPopupContent">

                <div className="bg-gray m-1">
                    <strong>Subject:</strong> {querry.subject   }
                </div>
                <div className="bg-gray m-1">
                    <strong>Email:</strong> {querry.email}
                </div>
            </div>
            <div className="bg-gray mb-5">
                <strong>Details</strong> <br /> {querry.message}
            </div>

            <div className="p-2">
                <textarea style={{ width: "100%", height: "200px", padding: "10px" }} placeholder="Write answer"></textarea>
            </div>

            <button style={{ float: "center" }}
                // onClick={closeHandler}
                className="myBlueButton-lg m-1">
                Send
                </button>
            <button style={{ float: "center" }}
                onClick={closeHandler}
                className="myRedButton-lg m-1">
                Close
                </button>
        </div>
    )
}

export default QuerryModal
