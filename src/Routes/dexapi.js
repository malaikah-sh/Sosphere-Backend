const express = require("express");
const controller = require("../Controller/DexApiController.js");
const router = express.Router();
/// Make it Only access if he holds the token

router.get("/token", controller.getToken);
router.get("/pair", controller.getPair);
router.get("/v2/token", controller.getV2Token);

module.exports = router;
