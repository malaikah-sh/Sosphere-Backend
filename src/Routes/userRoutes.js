const express = require("express");
const controller = require("../Controller/UserController.js");
const router = express.Router();

router.post("/addUser", controller.createUser);
router.get("/", controller.readAll);
router.get("/allusers/:id", controller.readById);
router.post("/register", controller.createUser);

module.exports = router;
