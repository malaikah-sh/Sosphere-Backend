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
    type: String,
    required: true,
  },
  Released: {
    type: String,
    required: true,
  },
  Repeat: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("SearchResult", searchResult);
