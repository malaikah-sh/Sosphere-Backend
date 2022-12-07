const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  imageURL: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: [String],
    default: [],
    required: false,
  },
});

module.exports = mongoose.model("Post", Post);
