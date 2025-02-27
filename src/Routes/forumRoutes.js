const express = require("express");
const router = express.Router();
const forumController = require("../Controller/forumController");

router.post("/addTopic", forumController.createTopic);
router.get("/allTopics", forumController.getAllTopics);
router.get("/topic/:id", forumController.getTopicById);
router.post("/comment/:id", forumController.addComment);
router.delete("/deleteTopic/:id", forumController.deleteTopic);
router.delete("/deleteComment/:topicId/:commentId", forumController.deleteComment);
router.get("/user/:userId", forumController.getUserPostsAndComments);

module.exports = router;
