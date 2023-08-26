const express = require("express");
const controller = require("../Controller/MessageController");
const router = express.Router();
const verifyJwt = require("../Middleware/verifyJWT");
/// Only access if he holds the token

router.post("/addmsg/", controller.addMessage);
router.post("/getmsg/", controller.getMessages);

module.exports = router;
