import React, { useEffect, useState } from 'react'
import '../../styles/main.css'


function ComplainsPopup({ closeHandler, title, userId, creatorId, message }) {

    return (
        <div className="adminRedBox">

            <div className="adminBlueBox-head"></div>

            <div className="active-message-text">
                <h1>{title}</h1>
            </div>

            <div className="adminPopupContent">

                <div className="bg-gray m-1">
                    <strong>User-ID:</strong> {userId}
                </div>
                <div className="bg-gray m-1">
                    <strong>Creator:</strong> {creatorId}
                </div>
            </div>
            <div className="bg-gray mb-5">
                <strong>Costumer Comments:</strong> <br /> {message}
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

export default ComplainsPopup
