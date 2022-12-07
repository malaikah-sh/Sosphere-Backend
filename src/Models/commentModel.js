const mongoose = require("mongoose");
const Comments = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  CommentorId: {
    type: String,
    required: true,
  },
  CommentorName: {
    type: String,
    required: true,
  },
  CommentorAvator: {
    type: String,
    required: false,
  },
  Comment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comments", Comments);
