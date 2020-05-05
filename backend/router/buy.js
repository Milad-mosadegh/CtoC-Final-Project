const router = require("express").Router()
const buy   = require("../controller/buy")
const checkAuth = require("../middleware/checkAuthentication")

router.get("/allproducts", buy.allProucts)
router.get(`/productdetails/:id`, buy.productDetails)
router.get(`/latestprdoucts`, buy.latestProducts)
//router.get("/lastseen", checkAuth, buy.lastSeen)


module.exports=router