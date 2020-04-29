const router = require("express").Router();
const account = require("../controller/account")
const auth = require("../middleware/checkAuthentication")

router.get("/profile", auth.checkToken, account.getProfile)
router.get("/myproducts", auth.checkToken, account.getMyProducts)
router.get("/myproducts", auth.checkToken, account.getMySoldProducts)

router.post("/profile", auth.checkToken, account.editProfile)


module.exports = router

