const express = require("express");
const controller = require("/var/task/src/Routes/controller/TransactionController.js");
const router = express.Router();
const verifyJwt = require("../Middleware/verifyJWT");

router.post("/addTransaction", controller.CreateTransaction);
router.get("/", controller.readAll);
router.get("/:id", controller.readById);

module.exports = router;
