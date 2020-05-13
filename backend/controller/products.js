
const ActiveProduct = require("../model/activeProductModel");
const InActiveProduct = require("../model/inactiveProductModel")
const mongoose=require("mongoose")
const multer  = require("multer");
const path    = require("path");
const cp      = require('child_process');

exports.newProduct = async (req,res)=>{
    let priceRange;

    console.log(req.body.data, "in new product")
    if(req.body.data){
            const {title, category, condition, quantity, color, price, description} = req.body.data
            const creator= req.userId

            if(price>=250) priceRange=6
            else if(price>=200) priceRange=5
                else if(price>=150) priceRange=4
                    else if(price>=100) priceRange=3
                        else if(price>=50) priceRange=2
                            else priceRange=1
                            
            const newProduct = new ActiveProduct({
                title,
                category,
                condition,
                quantity,
                color,
                price,
                description,
                creator,
                blocked:false,
                sold:false,
                active:true,
                views:0,
                watching:[],
                priceRange


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
            const creator= req.userId
            let priceRange;
            if(price>=250) priceRange=6
                else if(price>=200) priceRange=5
                    else if(price>=150) priceRange=4
                        else if(price>=100) priceRange=3
                            else if(price>=50) priceRange=2
                                else priceRange=1
            req.files.forEach(f => {
                // create thunbnails
                // {public/images/18612876a87a74.jpg} => {public/images/18612876a87a74.jpg.thumb.jpg}
                const thumbPath = f.path + '.thumb.jpg'
                // $ convert $filePath -resize 500x $thumbPath
                // sudo apt install imagemagick
                cp.spawnSync('convert',[f.path,'-resize','500x',thumbPath]);
            })
            let images=req.files.map(values=>values.filename)
            const newProduct = new ActiveProduct({
                title,
                category,
                condition,
                quantity,
                color,
                price,
                description,
                images,
                priceRange,
                creator,
                blocked:false,
                sold:false,
                active:true,
                views:0,
                watching:[]
            })
            await newProduct.save((err,doc)=>{
                if(err) {res.json({status:"failed", message:err})}
                    else res.json({status:"success", message:"you have successfuly posted your product", data:doc})
            }) 
        })
    }
}

exports.inactiveProduct=async(req,res)=>{
    const productId= req.body.data.id
    let inactiveProduct= new InActiveProduct()
    await ActiveProduct.findById(productId,(err,result)=>{
        console.log(result)
        inactiveProduct.save(result) });

    res.json({success:"you reached inactive"})
}

exports.soldProduct=async(req,res)=>{
    console.log("you reached soldProduct", req.userId, "data ;", req.body.data)
    res.json({success:"you reached sold"})

}
exports.deleteProduct=async(req,res)=>{
    console.log("you reached deleteProduct", req.userId, "data ;", req.body.data)
    res.json({success:"you reached delete"})

}

exports.activateProduct=async(req,res)=>{
    console.log("you reached activateProduct", req.userId, "data ;", req.body.data)
    res.json({success:"you reached activate"})

}

exports.editProduct=async(req,res)=>{
    console.log("you reached editProduct", req.userId, "data ;", req.body.data)
    res.json({success:"you reached edit"})

}

exports.blockProduct=async(req,res)=>{
    console.log("you reached blocked", req.userId, "data ;", req.body.data)
    res.json({success:"you reached blocked"})

}