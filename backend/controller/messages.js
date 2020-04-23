const Coversation = require("../model/conversationModel")
const User = require("../model/userModel")


exports.createMessage=async(req,res)=>{
    const {message, senderId, productId, recipentId}=req.body.data
    const messageData={message, senderId, productId, recipentId}

    let conversationResult = await Coversation
                                .findOneAndDelete({$and:[{senderId, productId}]})
    if(!conversationResult){
        const newConversation = new Coversation()
        await newConversation.save(messageData,(err,doc)=>{
            if(err) {
                res.json({status:"failed", message:"Currently unable to send your meesage please try again"})
                throw err
            }
            else{
                res.json({status:"success", message:"Successfully sent!, Conversation created", data:doc})
            }

        })
    }

}
exports.messagesList=async(req,res)=>{

}
exports.deleteMessage=async(req,res)=>{

}
exports.retrieveMessage=async(req,res)=>{
    
}