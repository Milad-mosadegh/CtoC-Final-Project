import React, { useState, useEffect, useRef } from 'react';
import '../styles/main.css';
import GET from '../lib/get';
import { POST } from '../lib/post';

import Fade from 'react-reveal/Fade'

const ActiveConversation = (props) => {
    const { hidePopUp, conversationId } = props
    const [message, setMessage] = useState("")
    const [prevMessages, setPrevMessages] = useState("")
    const chatEndRef = useRef(null)
    const inputRef = useRef(null)


    /* useEffect(() => {
        const getConversation = async () => {
            let res = await GET(`/api/messages/getconversation/${conversationId}`)
            if (res.data.data) {setPrevMessages(res.data.data)
                scrollToBottom()}
        }
        setTimeout(getConversation, 500);
        getConversation()
        
      
    }, []) */
    useEffect(() => {
        const interval = setInterval(async () => {
            let res = await GET(`/api/messages/getconversation/${conversationId}`)
            if (res.data.data) {
                setPrevMessages(res.data.data)
                scrollToBottom()
            }
            console.log("i am being called")
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const focusInput = () => {
        inputRef.current.focus()

    }

    const scrollToBottom = () => {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }


    const changeHandler = (e) => {
        setMessage(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (message === "") return
        else {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('c2c-token'),
                    'Content-Type': 'application/json'
                }
            }
            const messageData = { conversationId, message }
            let res = await POST("/api/messages/updateconversation", messageData, config)
            if (res.data.status === "success") {
                setPrevMessages(res.data.data)
                setMessage("")
                focusInput()
                scrollToBottom()
            }
        }

    }
    let userId = JSON.parse(localStorage.getItem("c2c-profile")).id
    console.log(prevMessages)
    return (
        <Fade top cascade duration={500}>
            <div className="message-wrapper">
                <div className="message-header">
                    <button onClick={hidePopUp}>X</button>
                    <h2>Milad Mosadegh</h2>
                </div>
                <div className="p-id" >
                    <p>
                        Product Title :
                    </p>
                    <p>
                        Product ID : 123456778
                    </p>
                </div>
                <div className="message-box">
                    {prevMessages ? prevMessages.map(msg =>
                        msg.senderId === userId ?
                            <div className="reciver-box">
                                <div className="reciver" >{msg.message}</div>
                                <p>{msg.timeStamp}</p>
                            </div>
                            : <div className="sender-box"  >
                                <div className="sender">{msg.message}</div>
                            </div>

                    ) : null}
                    <div ref={chatEndRef} />

                </div>

                <form className="message-write" onSubmit={submitHandler}>
                    <input type="text" onChange={changeHandler} value={message} ref={inputRef} />
                    <button className="fa fa-send-o" type="submit"></button>
                </form>
            </div>
        </Fade>
    );
}

export default ActiveConversation;

