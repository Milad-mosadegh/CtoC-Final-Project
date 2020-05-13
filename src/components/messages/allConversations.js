import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'
import GET from '../lib/get';

import '../styles/main.css'

const AllConversations = (props) => {
    const [conversations, setConversations] = useState("")
    const { showPopUp, setTargetConversation, setConversationRecipent } = props


    useEffect(() => {
        const getMessages = async () => {
            let response = await GET("/api/messages/messageslist")
            console.log(response, "in all conversaions")
            if (response.data.status === "success")
                setConversations(response.data.data)
            else props.history.push("/signin")
        }
        getMessages()

    }, [])
    let currentUserId = JSON.parse(localStorage.getItem("c2c-profile")).id
    const setConversationDetails = (data) => {
        setTargetConversation(data._id)
        data.senderId._id === currentUserId ?
            setConversationRecipent(data.recipentId.firstName)
            : setConversationRecipent(data.senderId.firstName)
        showPopUp()
    }
    return (
        <div>
            <div className="active-message-head"></div>
            <div className="active-message-text">
                <h1>Message</h1>
            </div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Subject</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log(conversations, "in list ")}
                    {conversations ? conversations.map(data => {
                        let myDate = new Date(data.timeStamp)
                        return <tr style={{ cursor: "pointer" }} onClick={() => setConversationDetails(data)}>
                            <td>{data.senderId._id === currentUserId ? "Me" : data.senderId.firstName}</td>
                            <td>{data.recipentId._id === currentUserId ? "Me" : data.recipentId.firstName}</td>
                            <td onClick={() => {

                                setTargetConversation(data._id)
                                showPopUp()
                            }}>{data.title}</td>
                            <td>{myDate.toLocaleString()}</td>
                            {/* <button className="btn btn-danger">Reply</button> */}
                        </tr>
                    }
                    ) : null}


                </tbody>
            </Table>
        </div>
    );
}

export default AllConversations;