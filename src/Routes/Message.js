const express = require("express");
const controller = require("../Controller/MessageController.js");
const router = express.Router();
const verifyJwt = require("../Middleware/verifyJWT.js");
/// Only access if he holds the token

router.post("/addmsg/", controller.addMessage);
router.post("/getmsg/", controller.getMessages);

module.exports = router;
