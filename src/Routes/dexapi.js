const express = require("express");
const controller = require("../Controller/DexApiController.js");
const router = express.Router();
/// Make it Only access if he holds the token

router.get("/token", controller.getToken);
router.get("/pair", controller.getPair);
router.get("/webtoadd", controller.getaddress);

module.exports = router;
