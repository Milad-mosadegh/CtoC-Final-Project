import React, { useEffect, useState } from 'react'

import axios from 'axios'
import '../../styles/main.css'


function QueriesPopup({ closeHandler }) {



    return (
        <div className="adminRedBox">

            <div className="adminBlueBox-head"></div>

            <div className="active-message-text">
                <h1>Title</h1>
            </div>

            <div className="adminPopupContent">

                <div className="bg-gray m-1">
                    <strong>User-ID:</strong> 187641u3hbf17y
                </div>
                <div className="bg-gray m-1">
                    <strong>Name:</strong> Milad
                </div>
            </div>
            <div className="bg-gray mb-5">
                <strong>Description:</strong>  oaiuh ajv oiuhoanvjo naue ;ojna uibapeojvn biuv;ajfnv hi[ori jnf] oaiuh ajv oiuhoanvjo naue ;ojna uibapeojvn biuv;ajfnv hi[ori jnf]
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
