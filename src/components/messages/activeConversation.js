import React, { useState, useEffect } from 'react';

import '../styles/main.css';
import GET from '../lib/get';
import { POST } from '../lib/post';

const ActiveConversation = (props) => {
    const { hidePopUp, conversationId} = props
    const [message, setMessage] = useState("")
    const [prevMessages, setPrevMessages] = useState("")

    useEffect(()=>{
        const getConversation=async ()=>{
            console.log("message pop  stac rted")
            let res = await GET(`/api/messages/getconversation/${conversationId}`)
            if(res.data.data) setPrevMessages(res.data.data)
        }
        getConversation()

    },[])



    const changeHandler = (e) => {
        setMessage(e.target.value )
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if(message==="") return
            else{
                const config={
                    headers:{
                    'x-auth-token':localStorage.getItem('c2c-token'),
                    'Content-Type': 'application/json'
                }}
                const messageData ={conversationId,message}
                let res = await POST("/api/messages/updateconversation",messageData,config)
                console.log(res)
            }
                console.log(message);
    }
    let userId=JSON.parse(localStorage.getItem("c2c-profile")).id

    return (
        
        <div className="message-wrapper">
            <div className="message-header">
                <button onClick={hidePopUp}>X</button>
                <h2>Milad Mosadegh</h2>
            </div>
            <div className="p-id">
                Product ID : 123456778
            </div>
            <div className="message-box">
                {prevMessages?prevMessages.map(msg=>
                    msg.senderId===userId?
                        <div className="reciver-box">
                            <div className="reciver">{msg.message}</div>
                        </div>
                        :<div className="sender-box">
                            <div className="sender">{msg.message}</div>
                        </div>
                     
                ):null}

            </div>

            <div className="message-write" onSubmit={submitHandler}>
                <input type="text" onChange={changeHandler} value={message}/>
                <button className="fa fa-send-o" onClick={submitHandler}></button>
            </div>
        </div>
    );
}

export default ActiveConversation;
