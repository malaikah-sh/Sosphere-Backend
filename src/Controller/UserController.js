const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../Models/UserModel");
const Post = require("../Models/PostModel");
const saltRounds = 10;
dotenv.config();

const CreateUser = async (req, res) => {
  console.log(req.body);
  let hashPassword = "";
  const { username, email, password, date, age, height } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  hashPassword = bcrypt.hashSync(password, salt);

  console.log(hashPassword);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: username,
    email: email,
    password: hashPassword,
    date: date,
    age: age,
    height: height,
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
    .then((users) => res.status(200).json({ users }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const readById = (req, res, next) => {
  console.log(req.params.id);
  User.findById(req.params.id)
    .exec()
    .then((user) => res.status(200).json({ user }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "Email not found" });
      } else {
        let isvlaid = bcrypt.compareSync(password, user.password);
        if (!isvlaid) {
          return res.status(400).json({ error: "Invalid password" });
        } else {
          let jwtSecretKey = process.env.JWT_SECRET_KEY;
          let data = {
            userId: user.id,
            email: user.email,
          };
          const accessToken = jwt.sign(data, jwtSecretKey, {
            expiresIn: "30m",
          });
          const refreshToken = jwt.sign(data, jwtSecretKey, {
            expiresIn: "1h",
          });
          return res.status(200).json({ user, accessToken, refreshToken });
        }
        // });
      }
    });
};

const update = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
    .then((user) => res.status(200).json({ user }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const remove = (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .exec()
    .then((user) => res.status(200).json({ user }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const patching = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then((user) => res.status(200).json({ user }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const getalluserpost = (req, res, next) => {
  Post.find({
    userId: req.params.id,
  })
    .exec()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

module.exports = {
  CreateUser,
  readAll,
  readById,
  update,
  remove,
  patching,
  login,
  getalluserpost,
};
