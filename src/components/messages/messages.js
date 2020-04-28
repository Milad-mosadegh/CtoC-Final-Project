import React,{useState} from 'react';
import Conversations from "./conversations"
import ActiveConversation from "./activeConversation"
import { Navbar } from 'react-bootstrap';

const Messages = (props) => {

    const [activeChatId, setActiveChatId]=useState("")
    const [showConversation, setShowConversation]=useState(false)

    const setTargetId=(id)=>{
        setActiveChatId(id)
        console.log(id, "in messages")
    }

    const showPopUp =()=>setShowConversation(true)
    const hidePopUp =()=>setShowConversation(false)

    return (

        <div>
            <div className="mt-1 mb-2">
            <Navbar  {...props}/>
            </div>
            <div>
            <Conversations
                showPopUp           ={showPopUp}
                setActiveChatId     ={setActiveChatId}
                setTargetId         ={setTargetId}
            />
            </div>
            
            {showConversation?
            <ActiveConversation
                hidePopUp    = {hidePopUp}
                activeChatId = {activeChatId}
            />
            :null}
            <div>
           
            </div>
        </div>



    );
}

export default Messages;