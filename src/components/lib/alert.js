import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAlert = ({ id, alertText }) => {

    toast.success(alertText, { containerId: "A" })
    toast.warn(alertText, { containerId: "B" })
    toast.info(alertText, { containerId: "C" })


    return (
        <ToastContainer
            enableMultiContainer
            containerId={id}
            position={toast.POSITION.TOP_RIGHT} />

    );
}

export default MyAlert;

/* const [alertId, setAlertId] = useState("")
const [showAlert, setShowAlert] = useState(false) */

/* setAlertId("B")
setShowAlert(true) */

/* { showAlert ? <MyAlert id={alertId} alertText="sorry request failedn try again later" /> : null } */