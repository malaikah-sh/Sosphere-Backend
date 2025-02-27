const Forum = require("../Models/forumModel");

// 🟢 Create a new topic
exports.createTopic = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    const newTopic = new Forum({ title, description, user });
    await newTopic.save();
    res.status(201).json({ message: "Topic created!", topic: newTopic });
  } catch (error) {
    res.status(500).json({ error: "Failed to create topic", details: error.message });
  }
};

// 🔵 Get all topics
exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Forum.find().sort({ createdAt: -1 });
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch topics", details: error.message });
  }
};

// 🟡 Get a single topic with comments
exports.getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Forum.findById(id);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch topic", details: error.message });
  }
};

// 🟠 Add a comment to a topic
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, user } = req.body;
    const topic = await Forum.findById(id);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    topic.comments.push({ text, user });
    await topic.save();
    res.status(200).json({ message: "Comment added!", topic });
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment", details: error.message });
  }
};

// 🔴 Delete a topic
exports.deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    await Forum.findByIdAndDelete(id);
    res.status(200).json({ message: "Topic deleted!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete topic", details: error.message });
  }
};

// 🟣 Delete a comment from a topic
exports.deleteComment = async (req, res) => {
  try {
    const { topicId, commentId } = req.params;
    const topic = await Forum.findById(topicId);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    topic.comments = topic.comments.filter((c) => c._id.toString() !== commentId);
    await topic.save();
    res.status(200).json({ message: "Comment deleted!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment", details: error.message });
  }
};

  //🟡 Fetching 
  exports.getUserPostsAndComments = async (req, res) => {
    try {
      const { userId } = req.params;
      const topics = await Topic.find({ createdBy: userId }).sort({ createdAt: -1 });
      const comments = await Comment.find({ createdBy: userId }).populate("topicId", "title").sort({ createdAt: -1 });
  
      res.status(200).json({ topics, comments });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user posts and comments", details: error.message });
    }
  };
  
