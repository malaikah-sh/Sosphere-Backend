// const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const SearchResult = require("../Models/SearchModel");

dotenv.config();

const CreateResult = async (req, res) => {
  console.log(req.body);
  const { Address, Tokenomics, Audit, Score, Released } = req.body;

  // Check if an entry with the same address already exists
  SearchResult.findOne({ Address })
    .exec()
    .then((existingResult) => {
      if (existingResult) {
        // If an entry with the same address exists, increment the 'repeat' by one
        existingResult.Repeat += 1;
        return existingResult.save();
      } else {
        // If no entry with the same address exists, create a new one
        const searchResult = new SearchResult({
          Address: Address,
          Tokenomics: Tokenomics,
          Audit: Audit,
          Score: Score,
          Released: Released,
          Repeat: 1, // Initialize 'repeat' to 1 for a new entry
        });
        return searchResult.save();
      }
    })
    .then((result) => res.status(201).json({ searchResult: result }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const readAll = (req, res) => {
  SearchResult.find()
    .sort({ Repeat: -1 }) // Sort in descending order of Repeat
    .limit(10) // Limit the results to 10
    .exec()
    .then((searchResults) => res.status(200).json({ searchResults })) // Changed variable name to avoid confusion with the model
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

module.exports = {
  CreateResult,
  readAll,
};
