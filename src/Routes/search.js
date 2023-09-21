const express = require("express");
const controller = require("../Controller/SearchController");
const router = express.Router();
const verifyJwt = require("../Middleware/verifyJWT.js");

router.post("/addResult", controller.CreateResult);
router.get("/", controller.readAll);

module.exports = router;
