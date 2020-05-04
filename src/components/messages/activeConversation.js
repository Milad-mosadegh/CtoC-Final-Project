import React, { useState, useEffect, useRef } from 'react';
import '../styles/main.css';
import GET from '../lib/get';
import { POST } from '../lib/post';

import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'

const ActiveConversation = (props) => {
    const { hidePopUp, conversationId } = props
    const [message, setMessage] = useState("")
    const [prevMessages, setPrevMessages] = useState("")
    const chatEndRef = useRef(null)
    const inputRef = useRef(null)


    useEffect(() => {
        const interval = setInterval(async () => {
            let res = await GET(`/api/messages/getconversation/${conversationId}`)
            if (res.data.data) {
                setPrevMessages(res.data.data)
                scrollToBottom()
            }
        }, 1000);
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
    return (
        <Fade top cascade duration={300}>
            <div className="message-wrapper">
                <div className="message-header">
                    <button onClick={hidePopUp}>X</button>
                    <h2>{props.recipentName}</h2>
                </div>
                <div className="p-id justify-content-around" >
                    <p>
                        Product Title : {prevMessages ? prevMessages.productId.title : null}
                    </p>
                    <p>
                        Product ID :{prevMessages ? prevMessages.productId._id : null}
                    </p>
                </div>
                <div className="message-box">
                    {prevMessages ? prevMessages.messages.map(msg =>
                        msg.senderId === userId ?
                            <Zoom cascade duration={100}>
                                <div className="reciver-box">
                                    <div className="reciver" >{msg.message}</div>
                                    <p>{msg.timeStamp}</p>
                                </div>
                            </Zoom>
                            : <Zoom cascade duration={100}>
                                <div className="sender-box"  >
                                    <div className="sender">{msg.message}</div>
                                </div>
                            </Zoom>

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

