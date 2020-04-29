const user = require("../model/userModel")
const multer= require("multer")
const path = require("path")
exports.getProfile=(req,res)=>{

    user.findById(req.userId,(err, doc)=>{

        if(err) return res.status(501).json({
            status:"failed",
            message:err
        })
        else{
            const {firstName, lastName, email, paypalId, phoneNumber, profileImage } = doc
            let street,city, zipCode;
            if(doc.address)  {
                    street = doc.address.street;
                    city = doc.address.city;
                    zipCode = doc.address.zipCode
            } 
            else{
                street=""
                city=""
                zipCode=""
            }
            const profile = {firstName, lastName, email, paypalId, phoneNumber, street, city, zipCode, profileImage }
            console.log(profile)
            res.json({
                status:"success",
                data:profile
            })

        } 
    })

}

exports.editProfile=async (req,res)=>{
    if(req.body.data) {
     
        const {firstName, lastName,paypalId,phoneNumber,street,city,zipCode} = req.body.data
        const profileData = {
            firstName,
            lastName,
            paypalId,
            phoneNumber,
            address:{
                street,
                city,
                zipCode
            }
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
    


    const {firstName, lastName,paypalId,phoneNumber,street,city,zipCode} = req.body
    console.log(firstName, lastName,paypalId,phoneNumber,street,city,zipCode)
    const profileData = {
        firstName,
        lastName,
        paypalId,
        phoneNumber,
        address:{
            street,
            city,
            zipCode
        },
        profileImage:fileName
    }
    await user.findByIdAndUpdate(req.userId, profileData,(err, doc)=>{
        if(err) res.json({status:"failed", message:err})
            else  res.json({status:"success", message:"Records updated successfully"})
     })
        })
    }
   
