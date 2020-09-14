import React, { useState } from 'react'
import '../../styles/main.css'

import Modal from 'react-modal'

function PopupAdmin({ popupAdminTitle, popupAdminBody }) {

    return (
        <Modal isOpen={true}>
            <div >
                <div >
                </div>
                <div >
                    {popupAdminTitle}
                </div>

                <div >
                    {popupAdminBody}
                </div>
            </div>
        </Modal>
    )
}

export default PopupAdmin
