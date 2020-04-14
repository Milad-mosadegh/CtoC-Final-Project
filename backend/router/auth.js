const router  = require("express").Router();
const auth    = require("../controller/auth")
const tokenAuth = require("../middleware/checkAuthentication")

router.post("/signin",      auth.signin)
router.post("/signup",      auth.signup)
router.get("/authenticated",tokenAuth.checkToken,auth.authenticated)
router.post("/resetpass", auth.resetPassword)

module.exports = router;
