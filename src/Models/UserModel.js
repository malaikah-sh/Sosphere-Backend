const mongoose = require("mongoose");
const user = new mongoose.Schema({
  Address: {
    type: String,
    required: true,
  },
  Balance: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", user);
