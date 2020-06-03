import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import '../styles/main.css'
import {POST} from "../lib/post"

function ReportProduct(props) {

    const {hideAlertBox,title, productId, recipentId, recipentName}=props

    const [message, setMessage] = useState("")

    let senderName;
    if(localStorage.getItem("c2c-profile")) senderName= "hello"
    else senderName= "email"


    const changeHandler = (e) => {
        setMessage(e.target.value)
      }
      const submitHandler = async () => {
          console.log("submit handler called", message)
          hideAlertBox()
        /* let senderId = JSON.parse(localStorage.getItem("c2c-profile")).id
        console.log(title,productId,recipentId, "props in msg")
        const messageData = {
          productId,
          recipentId,
          title,
          senderId,
          message
        }
        const config = {
          headers: {
            'x-auth-token': localStorage.getItem('c2c-token'),
            'Content-Type': 'application/json'
          }
        }
        let response = await POST("/api/messages/sendmessage", messageData, config)
        if(response.data.status==="success") props.history.push("/messages") */
      }
    return (
        <div className="rpd">
        <div className="rpd-content">
            <div className="rpd-head">
            </div>
            <div className="rpd-head-title">
                Report Product
            </div>
            
            <div className="rpd-tilte">
                <InputLabel 
                    className="col-lg-12 col-md-12 col-sm-12"
                    fullWidth={true}
                    disabled={true}
                     >Product Title : {title}</InputLabel>
                <InputLabel 
                    className="col-lg-12 col-md-12 col-sm-12"
                    fullWidth={true}
                    disabled={true}
                     >Product Id : {productId}</InputLabel>

                <InputLabel 
                    className="col-lg-12 col-md-12 col-sm-12"
                    fullWidth={true}
                    disabled={true}
                     >To : Admin</InputLabel>
                <InputLabel 
                    className="col-lg-12 col-md-12 col-sm-12"
                    fullWidth={true}
                    disabled={true}
                     >From : {senderName}</InputLabel>

                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    name="description"
                    multiline
                    rows={4}
                    placeholder="Write Your Message Here"
                    variant="outlined"
                    className="col-lg-12 col-md-12 col-sm-12"
                    fullWidth={true}
                    onChange={changeHandler}

                />
            </div>
                <div className="alertBox-body">

                        <button type="button" className="myRedButton-lg" onClick={submitHandler}>Report</button>
                        <button type="button" className="myBlueButton-lg ml-1" onClick={hideAlertBox}>Cancel</button>

                </div>
            </div>
        </div>
    )
}

export default ReportProduct
