import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap'
import GET from '../lib/get';

const AllConversations = (props) => {
    const [conversations, setConversations]=useState("")
    const {showPopUp,setTargetConversation} = props


    useEffect(()=>{
        const getMessages=async()=>{
            let response = await GET("/api/messages/messageslist")
            setConversations(response.data.data)
        }
        getMessages()

    },[])
    return (
        <div>
            <Table striped bordered hover >
          
                <thead>
                    <tr>
                        <th>From</th>
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
                        <td onClick={()=>{setTargetConversation(data._id)
                                         showPopUp()}}>{data.title}</td>
                        <button className="btn btn-danger">Reply</button>
                    </tr>}
                ):null}
                    
                            
                </tbody>
            </Table>
        </div>
    );
}

export default AllConversations;