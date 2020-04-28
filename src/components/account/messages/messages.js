import React,{useState} from 'react';
import Inbox from './inbox';
import MessagePopup from './messagePopup';

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
            
            <Inbox
                showPopUp           ={showPopUp}
                setActiveChatId     ={setActiveChatId}
                setTargetId         ={setTargetId}
            />
            
            {showConversation?
            <MessagePopup
                hidePopUp    = {hidePopUp}
                activeChatId = {activeChatId}
            />
            :null}
        </div>



    );
}

export default Messages;