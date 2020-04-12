const router = require("express").Router()
const sell   = require("../controller/sell")

router.post("/newproduct", sell.newProduct)

module.exports=router