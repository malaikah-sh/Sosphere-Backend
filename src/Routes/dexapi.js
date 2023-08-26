const express = require("express");
const controller = require("../Controller/DexApiController");
const router = express.Router();
/// Make it Only access if he holds the token

router.get("/token", controller.getToken);
router.get("/pair", controller.getPair);

module.exports = router;
