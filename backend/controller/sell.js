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
            let priceRange;
            if(price>=250) priceRange=6
                else if(price>=200) priceRange=5
                    else if(price>=150) priceRange=4
                        else if(price>=100) priceRange=3
                            else if(price>=50) priceRange=2
                                else priceRange=1

            let images=req.files.map(values=>values.filename)
            const newProduct = new product({
                title,
                category,
                condition,
                quantity,
                color,
                price,
                description,
                images,
                priceRange
            })
            await newProduct.save((err,doc)=>{
                if(err) {res.json({status:"failed", message:err})}
                    else res.json({status:"success", message:"you have successfuly posted your product", data:doc})
            }) 
        })


    }
}