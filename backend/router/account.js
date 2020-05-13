const router = require("express").Router();
const account = require("../controller/account")
const auth = require("../middleware/checkAuthentication")

router.get("/profile", auth.checkToken, account.getProfile)
router.get("/myproducts", auth.checkToken, account.getMyProducts)
router.get("/soldproducts", auth.checkToken, account.getSoldProducts)
router.get("/inactiveproducts", auth.checkToken, account.getInactiveProducts)
router.get("/lastseen", auth.checkToken, account.getLastSeen)
router.post("/profile", auth.checkToken, account.editProfile)
router.post("/lastseen", auth.checkToken, account.lastSeen)
router.post("/setfavorities", auth.checkToken, account.setFavorities)
router.get("/getfavoritelist", auth.checkToken, account.getFavoritiesList)
router.get("/getfavoriteproducts", auth.checkToken, account.getFavoriteProducts)







module.exports = router

