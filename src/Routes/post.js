const express = require("express");
const controller = require("../controller/PostController");
const router = express.Router();
const verifyJwt = require("../Middleware/verifyJWT");
router.get("/GetPosts", verifyJwt, controller.getAll);
router.get("/GetAPost/:id", verifyJwt, controller.getOne);
router.post("/CreatePost", verifyJwt, controller.createPost);
router.put("/UpdatePost/:id", verifyJwt, controller.update);
router.delete("/DeletePost/:id", verifyJwt, controller.remove);

module.exports = router;
