const user = require("../model/userModel")
const multer= require("multer")
const path = require("path")
const avatarSchema = require("../model/avatarModel")
const fs = require("fs")
exports.getProfile=(req,res)=>{

    user.findById(req.userId,(err, doc)=>{

        if(err) return res.status(501).json({
            status:"failed",
            message:err
        })
        else{
            const {firstName, lastName, email, paypalId, phoneNumber, address, profileImage } = doc
            const profile = {firstName, lastName, email, paypalId, phoneNumber, address, profileImage }
            res.json({
                status:"success",
                data:profile
            })

        } 
    })

}

exports.editProfile=async (req,res)=>{
    if(req.body.data) {
     
        const {firstName, lastName,paypalId,phoneNumber,address} = req.body.data
        const profileData = {
            firstName,
            lastName,
            paypalId,
            phoneNumber,
            address
        }
        await user.findByIdAndUpdate(req.userId, profileData,(err, doc)=>{
            if(err) res.json({status:"failed", message:err})
            else   res.json({status:"success", message:"Records updated successfully"})
         })
         return
    }
    let fileName;
    const storageTarget = multer.diskStorage({
        destination : "public/avatars",
            filename: (req,file,cb)=>{
                fileName= "a" + Date.now() + path.extname(file.originalname)
                cb(null, fileName)
                
            }
    })
    const upload = multer({storage:storageTarget}).single(`file`)
    
    upload(req,res,async ()=>{ 
    
    console.log(req.body)

    const {firstName, lastName,paypalId,phoneNumber,address} = req.body.profile
    console.log(firstName, lastName,paypalId,phoneNumber,address)
    const profileData = {
        firstName,
        lastName,
        paypalId,
        phoneNumber,
        address,
        profileImage:fileName
    }
    await user.findByIdAndUpdate(req.userId, profileData,(err, doc)=>{
        if(err) res.json({status:"failed", message:err})
            else  res.json({status:"success", message:"Records updated successfully"})
     })
        })
    }
   
 /* if(req.body.file) {

            const avatar = new avatarSchema
            avatar.img.data=req.body.file
            avatar.img.contentType = "image/png"
            avatar.save((err,doc)=>{
                if(err) console.log(err)
                if(doc) console.log("file save")
            })
        } */