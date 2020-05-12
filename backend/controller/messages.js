const Coversation = require("../model/conversationModel")
const User = require("../model/userModel")
const ActiveProduct= require("../model/activeProductModel")


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
                res.json({status:"failed", message:"Currently unable to send your meesage please try again", data:err})
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
                 if(err) res.json({status:"failed", message:"Unable to send your message, please try again",data:err})
                    else res.json({status:'success', message:"added in previous conversation", data:doc})
             })
           

    }

}
exports.messagesList=async(req,res)=>{
    let senderId=req.userId
    let recipentId=req.userId
    let conversationResult = await Coversation
    .find({$or:[{senderId}, {recipentId}]})
    .populate([{path:"senderId",select:"firstName", model:User},{path:"recipentId",select:"firstName", model:User}])
    //.populate([{path:"senderId",select:"firstName", model:User},{path:"recipentId",select:"firstName", model:User}])

    if(!conversationResult)  {
        res.json({status:"failed", message:"You have no active conversation", data:[]})}
        else {
            console.log(conversationResult)
            res.json({status:"success", message:"successfully retrieved", data:conversationResult})
        }

}
exports.deleteMessage=async(req,res)=>{

}
exports.getConversation=async(req,res)=>{
    let conversationResult = await Coversation.findById(req.params.id,{messages:1,productId:1})
                                              .populate([{path:"productId",select:"title", model:ActiveProduct}])
                                              console.log(conversationResult)
    res.json({status:"success", message:"you reached getconversation", data:conversationResult})
    
}

exports.updateConversation=async(req,res)=>{
    const {conversationId,message}=req.body.data
    if(message==="") return console.log("empty msg")
    else
    await Coversation.findOneAndUpdate(
        {
                $and:[{_id:conversationId}, {$or:[{senderId:req.userId},{recipentId:req.userId}]}]
            },
                    {$addToSet:{messages:{
                                senderId:req.userId,
                                message:message
                            }}}
                ,{
                    new:true
    
                    },(err,doc)=>{
                    if(err) res.json({status:"failed", message:"Unable to send your message, please try again",data:err})
                        else {res.json({status:'success', message:"added in previous conversation", data:doc.messages})
                        console.log("show",doc, "after updating conversation")}
                })
}

