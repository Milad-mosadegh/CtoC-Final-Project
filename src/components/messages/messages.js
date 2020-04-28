import React, { useState } from 'react';
import AllConversations from "./allConversations"
import ActiveConversation from "./activeConversation"
import MyNavbar from '../navbar/navBar';


const Messages = (props) => {

    const [conversationId, setConversationId] = useState("")
    const [showConversation, setShowConversation] = useState(false)

    const setTargetConversation = (id) => {
        setConversationId(id)
        console.log(id, "in messages")
    }

    const showPopUp = () => setShowConversation(true)
    const hidePopUp = () => setShowConversation(false)

    return (

        <div>
            <div>
                <MyNavbar {...props} />
            </div>
            <div className="container mt-5">
                <AllConversations
                    showPopUp={showPopUp}
                    setTargetConversation={setTargetConversation}
                />
            </div>

            {showConversation ?
                <ActiveConversation
                    hidePopUp={hidePopUp}
                    conversationId={conversationId}
                />
                : null}
            <div>

            </div>
        </div>



    );
}

export default Messages;