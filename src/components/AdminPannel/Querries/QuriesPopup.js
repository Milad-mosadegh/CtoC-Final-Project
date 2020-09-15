import React, { useEffect, useState } from 'react'
import '../../styles/main.css'


function QueriesPopup({ closeHandler, title, userId, name, description }) {

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
                    <strong>Name:</strong> {name}
                </div>
            </div>
            <div className="bg-gray mb-5">
                <strong>Description:</strong> <br /> {description}
            </div>

            <div className="p-2">
                <textarea style={{ width: "100%", height: "200px", padding: "10px" }} placeholder="Write answer"></textarea>
            </div>

            <button style={{ float: "left" }}
                // onClick={closeHandler}
                className="myBlueButton-lg m-1">
                Send
                </button>
            <button style={{ float: "right" }}
                onClick={closeHandler}
                className="myRedButton-lg m-1">
                Close
                </button>
        </div>
    )
}

export default QueriesPopup
