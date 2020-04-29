import React, { useState, useEffect } from 'react';
import AllConversations from "./allConversations"
import ActiveConversation from "./activeConversation"
import MyNavbar from '../navbar/navBar';
import { CheckAuthentication } from '../lib/auth';


const Messages = (props) => {

    const [conversationId, setConversationId] = useState("")
    const [showConversation, setShowConversation] = useState(false)
    useEffect(() => {
        const confirmAuth = async()=>{
            let response=await CheckAuthentication()
            console.log("there is erro", response)
            if(response.data.status!=="success") props.history.push("/signin")
        }
        confirmAuth()
    }, [])

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
                    {...props}
                />
            </div>

            {showConversation ?
                <ActiveConversation
                    hidePopUp={hidePopUp}
                    conversationId={conversationId}
                    {...props}
                />
                : null}
            <div>

            </div>
        </div>



    );
}

export default Messages;