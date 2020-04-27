import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap'
import GET from '../../lib/get';

const Inbox = (props) => {
    const [conversations, setConversations]=useState("")

    useEffect(()=>{
        const getMessages=async()=>{
            let response = await GET("/api/messages/messageslist")
            setConversations(response.data.data)
        }
        getMessages()

    },[])
    const myDate = new Date().toLocaleTimeString()
    return (
        <div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>{props.of}</th>
                        <th>Date</th>
                        <th>Subject</th>
                    </tr>
                </thead>
                <tbody>
                {conversations? conversations.map(data=>
                    {
                        let myDate = new Date(data.timeStamp)
                        return <tr>
                        <td>{data.senderId===JSON.parse(localStorage.getItem("c2c-profile")).id?"Me":data.senderId}</td>
                        <td>{myDate.toLocaleString()}</td>
                        <td>{data.title}</td>
                        <button className="btn btn-danger">Reply</button>
                    </tr>}
                ):null}
                    

                </tbody>
            </Table>
        </div>
    );
}

export default Inbox;