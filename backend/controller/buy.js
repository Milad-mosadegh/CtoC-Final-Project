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
    console.log(req.params.id)
    res.json({status:"success", message:"you reached", data:{test:"test"}})

}