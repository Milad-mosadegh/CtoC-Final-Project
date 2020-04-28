const Coversation = require("../model/conversationModel")
const User = require("../model/userModel")


exports.createMessage=async(req,res)=>{
    const {message, senderId, productId, recipentId, title}=req.body.data
    if(!message) return
    let conversationResult = await Coversation
                                .findOne({$and:[{senderId, productId}]})
    if(!conversationResult){
        const newConversation = new Coversation({
            messages:[{
                senderId,
                message,
            }],
            senderId,
            productId,
            recipentId,
            title})
        await newConversation.save((err,doc)=>{
            if(err) {
                res.json({status:"failed", message:"Currently unable to send your meesage please try again"})
                throw err
            }
            else{
                res.json({status:"success", message:"Successfully sent!, Conversation created", data:doc})
            }

        })
    } else{

            const{_id} = conversationResult._id
           await Coversation.findByIdAndUpdate(_id,
             {"$push":{messages:{
               senderId,
               message
             }}},(err,doc)=>{
                 if(err) res.json({status:"failed", message:"Unable to send your message, please try again",doc:err})
                    else res.json({status:'success', message:"added in previous conversation", data:doc})
             })
           

    }

}
exports.messagesList=async(req,res)=>{
    let senderId=req.userId
    let recipentId=req.userId
    let conversationResult = await Coversation
    .find({$or:[{senderId}, {recipentId}]})
    if(!conversationResult)  {
        res.json({status:"failed", message:"You have no active conversation", data:[]})}
        else {
            res.json({status:"success", message:"successfully retrieved", data:conversationResult})
        }

}
exports.deleteMessage=async(req,res)=>{

}
exports.getconversation=async(req,res)=>{
    let conversationResult = await Coversation.findById(req.params.id,{messages:1})
    console.log(conversationResult)
    res.json({status:"success", message:"you reached getconversation", data:conversationResult.messages})
    
}