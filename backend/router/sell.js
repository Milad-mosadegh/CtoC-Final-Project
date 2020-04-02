const router = require("express").Router();
const sell = require("../controller/sell")

router.post("/postadd", sell.submitAdd)

module.exports = router;