const router = require("express").Router()
const buy   = require("../controller/buy")

router.get("/allproducts", buy.getAllProucts)

module.exports=router