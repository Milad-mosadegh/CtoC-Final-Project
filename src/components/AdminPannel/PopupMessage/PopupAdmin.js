import React, { useState } from 'react'
import '../../styles/main.css'

function AdminRedAlertBox({ adminRedBoxTitle, closeHandler, adminRedId, adminredBoxImage, adminRedCreator }) {

    return (
        <div className="adminRedBox">
            <div className="adminRedBox-head">
                {/* <button style={{ float: "left", borderRadius: "100px", width: "50px", margin: "20px" }} onClick={closeHandler} className="btn-danger">X</button> */}
            </div>
            <div className="active-message-text">
                <h1>{adminRedBoxTitle}</h1>
            </div>

            <div>
                <img src={adminredBoxImage} width="200px" height="200px" />
            </div>
            <div className="adminredBox">
                ID:{adminRedId}
            </div>
            <div className="adminredBox">
                Creator:{adminRedCreator}
            </div>
        </div>
    )
}

export default AdminRedAlertBox
