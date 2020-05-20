import React, { useState, useEffect } from 'react';
import AllConversations from "./allConversations"
import ActiveConversation from "./activeConversation"
import MyNavbar from '../navbar/navBar';
import { CheckAuthentication } from '../lib/auth';
import GET from "../lib/get"

const Messages = (props) => {

    const [conversationId, setConversationId] = useState("")
    const [showConversation, setShowConversation] = useState(false)
    const [recipentName, setRecipentName] = useState("testing")
    const [selectedArray, setSelectedArray]= useState([])
    const [conversations, setConversations] = useState([])
    let targetArray=[]
    useEffect(() => {
        const confirmAuth = async()=>{
            let response=await CheckAuthentication()
            console.log("there is erro", response)
            if(response.data.status!=="success") props.history.push("/signin")
        }
        confirmAuth()
        const getMessages = async () => {
            let response = await GET("/api/messages/messageslist")
            console.log(response, "in all conversaions")
            if (response.data.status === "success")
                setConversations(response.data.data)
            else props.history.push("/signin")
        }
        getMessages()
    }, [])

    const setTargetConversation = id => setConversationId(id)
    const setConversationRecipent = name =>setRecipentName(name)
    const showPopUp = () => setShowConversation(true)
    const hidePopUp = () => setShowConversation(false)
    const deleteHandler=()=>console.log("delete handler called", selectedArray)

    const selectOneHandler=(id)=>{
        let index =selectedArray.indexOf(id)
        let tempArray=[...selectedArray]
        
        if(index===-1) {
            tempArray.push(id)
            setSelectedArray(tempArray)
        }
        else {
            targetArray=[...selectedArray.filter(value=>value!==id)]
            setSelectedArray(targetArray)}
     
}
    const selectAllHandler=(e)=>{
                        if(!e.target.checked) setSelectedArray([])
                        else setSelectedArray(conversations.map(data=>data._id))
                    }

    return (

        <div>
            <div>
                <MyNavbar {...props} />
            </div>
            <div className="container mt-5">
                <AllConversations
                    showPopUp={showPopUp}
                    setTargetConversation={setTargetConversation}
                    setConversationRecipent={setConversationRecipent}
                    deleteHandler={deleteHandler} 
                    selectAllHandler={selectAllHandler}
                    selectOneHandler={selectOneHandler}
                    conversations={conversations}
                    selectedArray={selectedArray}
                    {...props}
                />
            </div>

            {showConversation ?
                <ActiveConversation
                    hidePopUp={hidePopUp}
                    conversationId={conversationId}
                    {...props}
                    recipentName={recipentName}

                />
                : null}
            <div>
        </div>
    </div>
    );
}
export default Messages;
