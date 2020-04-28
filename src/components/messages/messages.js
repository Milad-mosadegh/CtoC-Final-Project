import React,{useState} from 'react';
import AllConversations from "./allConversations"
import ActiveConversation from "./activeConversation"
import { Navbar } from 'react-bootstrap';

const Messages = (props) => {

    const [conversationId, setConversationId]=useState("")
    const [showConversation, setShowConversation]=useState(false)

    const setTargetConversation=(id)=>{
        setConversationId(id)
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
            <AllConversations
                showPopUp           ={showPopUp}
                setTargetConversation         ={setTargetConversation}
            />
            </div>
            
            {showConversation?
            <ActiveConversation
                hidePopUp    = {hidePopUp}
                conversationId = {conversationId}
            />
            :null}
            <div>
           
            </div>
        </div>



    );
}

export default Messages;