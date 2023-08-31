const express = require("express");
const controller = require("../controller/UserController.js");
const router = express.Router();
const verifyJwt = require("../Middleware/verifyJWT.js");

router.post("/addUser", controller.CreateUser);
router.get("/", controller.readAll);
router.get("/allusers/:id", controller.readById);

// router.post("/setavatar/:id", setAvatar);

module.exports = router;
