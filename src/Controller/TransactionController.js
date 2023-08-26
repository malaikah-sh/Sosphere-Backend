// const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Transaction = require("../Models/TransactionModel");
dotenv.config();

const CreateTransaction = async (req, res) => {
  console.log(req.body);
  const { TransactionHash } = req.body;

  const transaction = new Transaction({
    _id: new mongoose.Types.ObjectId(),
    TransactionHash: TransactionHash,
  });

  return transaction
    .save()
    .then((transaction) => res.status(201).json({ transaction }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const readAll = (req, res) => {
  Transaction.find()
    .exec()
    .then((Transactions) => res.status(200).json({ Transactions }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const readById = (req, res, next) => {
  console.log("Id", req.params.id);
  Transaction.findById(req.params.id)
    .exec()
    .then((transaction) => res.status(200).json({ transaction }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

module.exports = {
  CreateTransaction,
  readAll,
  readById,
};
