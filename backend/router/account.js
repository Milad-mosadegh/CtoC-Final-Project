const router = require("express").Router();
const account = require("../controller/account")
const auth = require("../middleware/checkAuthentication")

router.get("/profile", auth.checkToken, account.getProfile)
router.get("/myproducts", auth.checkToken, account.getMyProducts)
router.get("/myproducts", auth.checkToken, account.getMySoldProducts)
router.get("/lastseen", auth.checkToken, account.getLastSeen)
router.post("/profile", auth.checkToken, account.editProfile)
router.post("/lastseen", auth.checkToken, account.lastSeen)
router.post("/setfavourities", auth.checkToken, account.setFavourities)
router.get("/getfavourities", auth.checkToken, account.getFavourities)






module.exports = router

