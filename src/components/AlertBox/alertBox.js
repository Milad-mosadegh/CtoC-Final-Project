import React from 'react'

import '../styles/main.css'

function AlertBox({ alertBoxHead, alertBoxTitle }) {
    return (
        <div className="alertBox">
            <div className="alertBox-head">
            </div>
            <div className="alertBox-head-title">
                {alertBoxHead}
            </div>

            <div className="alertBoxTilte">
                {alertBoxTitle}
            </div>

            <div className="alertBox-body">
                <button type="button" className="myBlueButton-sm">Yes</button>
                <button type="button" className="myRedButton-sm ml-1">Cancel</button>
            </div>
        </div>
    )
}

export default AlertBox
