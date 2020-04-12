const product = require("../model/productModel")
const multer = require("multer")
const path = require("path")
exports.newProduct = async (req,res)=>{



    if(req.body.data){
            const {title, category, condition, quantity, color, price, description} = req.body.data
            const newProduct = new product({
                title,
                category,
                condition,
                quantity,
                color,
                price,
                description
            })
        
            newProduct.save((err,doc)=>{
                if(err) {res.json({status:"failed", message:err})}
                    else res.json({status:"success", message:"you have successfuly posted your product", data:doc})
            }) 
    }
    else{
        
        let fileName;
        const storageTarget = multer.diskStorage({
            destination:"public/avatars",
                filename:(req,file,cb)=>{
                    fileName="a"+Date.now()+path.extname(file.originalname)
                    cb(null, fileName)
                }
        })
        const upload = multer({storage:storageTarget}).array("files", 6)
        upload(req,res, async()=>{
            const {title, category, condition, quantity, color, price, description} = req.body
            console.log(title, category, condition, quantity, color, price, description)
            let images=req.files.map(values=>values.filename)
            console.log(req.files)
            const newProduct = new product({
                title,
                category,
                condition,
                quantity,
                color,
                price,
                description,
                images
            })
            await newProduct.save((err,doc)=>{
                if(err) {res.json({status:"failed", message:err})}
                    else res.json({status:"success", message:"you have successfuly posted your product", data:doc})
            }) 
        })


    }
}