const user= require("../model/userModel")

exports.myAccount=async(req,res)=>{

    await user.findById(req.userId, (err, doc)=>{
        if(err) return res.json({status:"failed", message:"Unable to retrieve your data please try again"})
        console.log(doc)
        res.json({status:"success", message:"You have been authorized", data:doc})

    })
    
}