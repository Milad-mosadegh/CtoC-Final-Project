const User = require("../model/userModel")
const multer = require("multer")
const path = require("path")
const ActiveProducts = require('../model/activeProductModel')
const SoldProducts = require('../model/soldProductModel')
const InActiveProducts = require("../model/inactiveProductModel")




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
    let products = await ActiveProducts.find({ creator: req.userId },
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
    let products = await SoldProducts.find({ creator: req.userId },
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
        if(lastSeen.includes(productId)) return res.json({status:"success", message:"already there"})
         else {
             if(lastSeen.length>=4) {
                 lastSeen.shift()
                 lastSeen.push(productId)
                }
                else lastSeen.push(productId)
         }

        await User.findByIdAndUpdate(req.userId, {lastSeen},(err,doc)=>{
            if(err) throw err
            else res.json({status:"success", message:"successfully added"})
        })  
    /* await User.findByIdAndUpdate(req.userId,condition,(err,doc)=>{
        console.log(doc, "after last seen updat3e")
        res.json({status:"success", comments:"you reached last seen"})
    }) */
    //{$addToSet:{lastSeen:req.body.data}}
    
}


exports.getLastSeen=async(req,res)=>{
    let result = await User.findById(req.userId, {lastSeen:1})
    if(!result) return res.json({status:"failed" })

    let lastSeen = await ActiveProducts.find({
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
    if(!lastSeen) return res.json({status:"failed", message:"No product to show", data:[]})
    res.json({status:"success", data:lastSeen})
}

exports.setFavorities=async(req,res)=>{
    let id=req.userId
    let productId=req.body.data
    let result = await User.findById(id, {liked:1})
    if(!result) return res.json({status:"failed"})
    let favourities = [...result.liked]

    let index= favourities.indexOf(productId)
    if(index===-1) favourities.push(productId)
        else favourities.splice(index,1)
    await User.findByIdAndUpdate(id,{liked:favourities}, (err, doc)=>{
        if(err) throw err
        else res.json({status:"success"})}
 )}

 exports.getFavoritiesList=async(req,res)=>{
    
    let id=req.userId
    let result = await User.findById(id, {liked:1})
    if(!result)  res.json({status:"failed"})
    else res.json({status:"success", favourities:result.liked})  

   }

exports.getFavoriteProducts=async(req,res)=>{


    let id=req.userId
    let result = await User.findById(id, {liked:1})
    if(!result) return  res.json({status:"failed"})
    let favoriteProducts = await ActiveProducts.find({
        "_id" : {
          "$in" :result.liked
         }
      },{_id: 1,
        title: 1,   
        category: 1,
        condition: 1,
        color: 1,
        price: 1,
        images: 1,
        priceRange: 1,});
    
    if(!favoriteProducts) return res.json({status:"failed", message:"No product to show", products:[]})
    res.json({status:"success", products:favoriteProducts})
   

}

exports.getInactiveProducts = async(req,res)=>{

    let id=req.userId
    let result = await InActiveProducts.find({creator:id},{_id:1, title:1, images:1, price:1})
    console.log(result,"jinactive products")
    if(!result) return  res.json({failed:"You have no Inactive Products"})
    res.json({success:"You have successfully retrieved", products:result})
   

}