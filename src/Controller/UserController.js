// const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../Models/UserModel");

dotenv.config();

const CreateUser = async (req, res) => {
  console.log(req.body);
  const { Address, Balance } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    Address: Address,
    Balance: Balance,
  });

  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const readAll = (req, res) => {
  User.find()
    .exec()
    .then((User) => res.status(200).json({ User }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const readById = (req, res, next) => {
  console.log("Id", req.params.id);
  User.findById(req.params.id)
    .exec()
    .then((user) => res.status(200).json({ user }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

module.exports = {
  CreateUser,
  readAll,
  readById,
};
