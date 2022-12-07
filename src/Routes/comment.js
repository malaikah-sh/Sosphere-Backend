const express = require("express");
const controller = require("../controller/CommentController");
const router = express.Router();
const verifyJwt = require("../Middleware/verifyJWT");
router.get("/GetComment", verifyJwt, controller.getAll);
router.get("/GetAComment/:id", verifyJwt, controller.getOne);
router.post("/CreateComment", verifyJwt, controller.createComment);
router.put("/UpdateComment/:id", verifyJwt, controller.update);
router.delete("/DeleteComment/:id", verifyJwt, controller.remove);

module.exports = router;
