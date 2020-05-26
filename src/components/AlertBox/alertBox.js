import React from 'react'

import '../styles/main.css'

function AlertBox({ alertBoxTitle, alertBoxBody, proceedHandler, hideAlertBox , simpleAlert}) {
    return (
        <div className="alertBox">
            <div className="alertBox-head">
            </div>
            <div className="alertBox-head-title">
                {alertBoxTitle}
            </div>

            <div className="alertBoxTilte">
                {alertBoxBody}
            </div>
            {simpleAlert?
                <button type="button" className="myBlueButton-sm"       onClick={hideAlertBox }>Ok</button>
            :
            <div className="alertBox-body">
                <button type="button" className="myBlueButton-sm"       onClick={proceedHandler }>Yes   </button>
                <button type="button" className="myRedButton-sm ml-1"   onClick={hideAlertBox   }>Cancel</button>
            </div>
        }
        </div>
    )
}

export default AlertBox
