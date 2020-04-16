const products = require("../model/productModel")
exports.getAllProucts=async (req,res)=>{
    products.find((err,doc)=>{
        if(err) res.json({status:"failed", message:err})
        else res.send({status:"success", message:"Your reached Buy products", data:doc})
    })
    

}