const router  = require("express").Router();
const messages = require("../controller/messages")
const auth    = require("../middleware/checkAuthentication")

router.post("/sendmessage",auth.checkToken, messages.createMessage)
router.get("/messageslist",auth.checkToken, messages.messagesList)
router.delete("/deletemessage", auth.checkToken,messages.deleteMessage)
router.get("/getconversation/:id",auth.checkToken, messages.getConversation)
router.post("/updateconversation",auth.checkToken, messages.updateConversation)



module.exports = router