const express = require("express");
const controller = require("../controller/UserController");
const router = express.Router();
const verifyJwt = require("../Middleware/verifyJWT");

router.post("/addUser", controller.CreateUser);
router.get("/", controller.readAll);
router.get("/allusers/:id", controller.readById);

// router.post("/setavatar/:id", setAvatar);

module.exports = router;
