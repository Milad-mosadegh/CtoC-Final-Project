const router = require("express").Router();
const auth   = require("../controller/auth")

router.post("/signin", auth.signin)

module.exports = router;