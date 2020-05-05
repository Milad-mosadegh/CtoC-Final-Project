const Products = require("../model/productModel")
const User = require("../model/userModel")
exports.allProucts = async (req, res) => {
    Products.find({}, {
        _id: 1,
        title: 1,
        category: 1,
        condition: 1,
        color: 1,
        price: 1,
        images: 1,
        priceRange: 1,

    }).exec((err, doc) => {
        if (err) res.json({ status: "failed", message: err })
        else {
            res.send({
                status: "success",
                message: "Your reached Buy products",
                data: doc
            })
        }
    })
}

exports.productDetails = async (req, res) => {
    const id = req.params.id
    let product = await Products.findById(id, {
        title: 1,
        category: 1,
        condition: 1,
        quantity: 1,
        color: 1,
        price: 1,
        description: 1,
        creator: 1,
        views: 1,
        images: 1
    })
    .populate([{path:"creator",select:"firstName", model:User}])
    if (!product) res.json({ status: "failed", message: "Internal Error please try again" })
    else {
        console.log(product)
        res.json({ status: "success", message: "Successfully retrieved", data: product })

    }


}

exports.latestProducts =async(req,res)=>{

    let latest= await Products.find({},{
        _id: 1,
        title: 1,
        category: 1,
        condition: 1,
        color: 1,
        price: 1,
        images: 1,
        priceRange: 1,

    }).sort({'_id':-1}).limit(4)

    if(latest) return res.json({status:"success",data:latest})
        else res.json({status:"failed",message:"request failed"})

}
/* 
exports.lastSeen = async(req,res)=>{
    let result = await User.findById(req.userId, {lastSeen:1})
    if(!result) return res.json({status:"failed"})
} */