const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  TransactionHash: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", schema);
