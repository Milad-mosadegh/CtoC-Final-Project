const router = require("express").Router()
const buy   = require("../controller/buy")

router.get("/allproducts", buy.allProucts)
router.get(`/productDetails/:id`, buy.productDetails)


module.exports=router