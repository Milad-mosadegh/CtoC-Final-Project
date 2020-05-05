const User = require("../model/userModel")

const multer = require("multer")
const path = require("path")
const avatarSchema = require("../model/avatarModel")
const fs = require("fs")
const Products = require('../model/productModel')
const SoldSchema = require('../model/productModel')




exports.getProfile = (req, res) => {

    User.findById(req.userId, (err, doc) => {

        if (err) return res.status(501).json({
            status: "failed",
            message: err
        })
        else {
            const { firstName, lastName, email, paypalId, phoneNumber, profileImage } = doc
            let street, city, zipCode;
            if (doc.address) {
                street = doc.address.street;
                city = doc.address.city;
                zipCode = doc.address.zipCode
            }
            else {
                street = ""
                city = ""
                zipCode = ""
            }
            const profile = { firstName, lastName, email, paypalId, phoneNumber, street, city, zipCode, profileImage }
            res.json({
                status: "success",
                data: profile
            })

        }
    })

}

exports.editProfile = async (req, res) => {
    if (req.body.data) {

        const { firstName, lastName, paypalId, phoneNumber, street, city, zipCode } = req.body.data
        const profileData = {
            firstName,
            lastName,
            paypalId,
            phoneNumber,
            address: {
                street,
                city,
                zipCode
            }
        }
        await User.findByIdAndUpdate(req.userId, profileData, (err, doc) => {
            if (err) res.json({ status: "failed", message: err })
            else res.json({ status: "success", message: "Records updated successfully" })
        })
        return
    }
    let fileName;
    const storageTarget = multer.diskStorage({
        destination: "public/avatars",
        filename: (req, file, cb) => {
            fileName = "a" + Date.now() + path.extname(file.originalname)
            cb(null, fileName)

        }
    })
    const upload = multer({ storage: storageTarget }).single(`file`)

    upload(req, res, async () => {



        const { firstName, lastName, paypalId, phoneNumber, street, city, zipCode } = req.body
        console.log(firstName, lastName, paypalId, phoneNumber, street, city, zipCode)
        const profileData = {
            firstName,
            lastName,
            paypalId,
            phoneNumber,
            address: {
                street,
                city,
                zipCode
            },
            profileImage: fileName
        }
        await User.findByIdAndUpdate(req.userId, profileData, (err, doc) => {
            if (err) res.json({ status: "failed", message: err })
            else res.json({ status: "success", message: "Records updated successfully" })
        })
    })
}

exports.getMyProducts = async (req, res) => {
    let products = await Products.find({ creator: req.userId },
        {
            _id: 1,
            title: 1,
            price: 1,
            images: 1,
        }
    )

    if (!products) {
        res.json({ status: "failed", message: "Your have no Products" })
    } else {
        res.json({ status: "success", data: products })
    }
}

exports.getMySoldProducts = async (req, res) => {
    let products = await SoldSchema.find({ creator: req.userId },
        {
            _id: 1,
            title: 1,
            price: 1,
            images: 1,
        }
    )

    if (!products) {
        res.json({ status: "failed", message: "Your have no Products" })
    } else {
        res.json({ status: "success", data: products })
    }
}

exports.lastSeen =async(req,res)=>{
    let productId= req.body.data;
/*     let condition = {
        $cond:{
            if: {$isArray:"lastSeen"},
            then:{$addToSet :{lastSeen:req.body.data}},
            else: "NA"
        }
    } */
    let result = await User.findById(req.userId, {lastSeen:1})
    let lastSeen = [...result.lastSeen]
        if(lastSeen.includes(productId)) return res.json({status:"success"})
         else {
             if(lastSeen.length>=4) {
                 lastSeen.shift()
                 lastSeen.push(productId)
                }
                else lastSeen.push(productId)
         }

        await User.findByIdAndUpdate(req.userId, {lastSeen},(err,doc)=>{
            if(err) throw err
            else res.json({status:"success"})
        })  
    /* await User.findByIdAndUpdate(req.userId,condition,(err,doc)=>{
        console.log(doc, "after last seen updat3e")
        res.json({status:"success", comments:"you reached last seen"})
    }) */
    //{$addToSet:{lastSeen:req.body.data}}
    
}


exports.getLastSeen=async(req,res)=>{
    let result = await User.findById(req.userId, {lastSeen:1})
    if(!result) return res.json({status:"failed", message:"No items to show", data:[] })

    let lastSeen = await Products.find({
        "_id" : {
          "$in" :result.lastSeen
         }
      },{_id: 1,
        title: 1,
        category: 1,
        condition: 1,
        color: 1,
        price: 1,
        images: 1,
        priceRange: 1,});
    console.log(lastSeen, "after array query")
    if(!lastSeen) return res.json({status:"failed", message:"No product to show", data:[]})
    res.json({status:"success", data:lastSeen})
}