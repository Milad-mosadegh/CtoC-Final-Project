const router = require("express").Router()
const sell   = require("../controller/sell")
const auth   = require("../middleware/checkAuthentication")

router.post("/newproduct",auth.checkToken, sell.newProduct)

module.exports=router