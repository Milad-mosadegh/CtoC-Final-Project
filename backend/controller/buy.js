const products = require("../model/productModel")
exports.allProucts=async (req,res)=>{
    products.find({},{
                _id:1,
                title:1,
                category:1,
                condition:1,
                color:1,
                price:1,
                images:1,
                priceRange:1,

    }).exec((err,doc)=>{
        if(err) res.json({status:"failed", message:err})
        else {
            res.send({
                    status:"success",
                    message:"Your reached Buy products",
                    data:doc
                })
        }
    })
}

exports.productDetails=async(req, res)=>{
    const id=req.params.id
    let product= await products.findById(id, {
        title:1,
        category:1,
        condition:1,
        quantity:1,
        color:1,
        price:1,
        description:1,
        creator:1,
        views:1,
        images:1
        })
    if(!product)  res.json({status:"failed", message:"Internal Error please try again"})
    else {
        res.json({status:"success", message:"Successfully retrieved", data:product})
    
    }
                

}