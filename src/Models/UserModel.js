const mongoose = require("mongoose");
const Post = require("./PostModel");
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  age: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", schema);
