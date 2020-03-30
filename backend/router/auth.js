const router = require("express").Router();
const auth   = require("../controller/auth")

router.post("/signin", auth.signin)
router.post("/signup", auth.signup)

module.exports = router;