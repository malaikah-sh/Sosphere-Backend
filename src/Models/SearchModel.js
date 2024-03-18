const mongoose = require("mongoose");
const searchResult = new mongoose.Schema({
  Address: {
    type: String,
    required: true,
  },
  Tokenomics: {
    type: String,
    required: true,
  },
  Audit: {
    type: String,
    required: true,
  },
  Score: {
    type: Number,
    required: true,
  },
  Released: {
    type: Number,
    required: true,
  },
  Repeat: {
    type: Number,
    required: true,
    default: 0,
  },
  Symbol: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("SearchResult", searchResult);
