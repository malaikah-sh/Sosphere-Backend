const express = require("express");
const controller = require("../controller/UserController");
const router = express.Router();
const verifyJwt = require("../Middleware/verifyJWT");

router.post("/addUser", controller.CreateUser);
router.post("/login", controller.login);
router.get("/readAll", verifyJwt, controller.readAll);
router.get("/readUser/:id", verifyJwt, controller.readById);
router.put("/updateUser/:id", verifyJwt, controller.update);
router.delete("/deleteUser/:id", verifyJwt, controller.remove);
router.patch("/patch/:id", verifyJwt, controller.patching);

router.get("/post/:id", verifyJwt, controller.getalluserpost);

module.exports = router;
