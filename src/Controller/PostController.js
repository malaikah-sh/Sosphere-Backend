const dotenv = require("dotenv");
const mongoose = require("mongoose");
const PostSchema = require("../Models/PostModel");
dotenv.config();

const createPost = (req, res) => {
  console.log("Creating");
  const { body } = req;
  const { userId, title, description, imageURL, date, comments } = body;
  const post = new PostSchema({
    id: new mongoose.Types.ObjectId(),
    userId: userId,
    title: title,
    description: description,
    imageURL: imageURL,
    date: date,
    comments: comments,
  });
  return post
    .save()
    .then((post) => res.status(201).json({ post }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const getAll = (req, res) => {
  PostSchema.find()
    .exec()
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const getOne = (req, res) => {
  const { id } = req.params;
  PostSchema.findById(id)
    .exec()
    .then((post) => res.status(200).json({ post }))
    .catch((error) => {
      console.log(error);
    });
};

const update = (req, res) => {
  const { id } = req.params;
  const { userId, title, description, imageURL, date, comments } = req.body;
  PostSchema.findByIdAndUpdate(id, {
    userId: userId,
    title: title,
    description: description,
    imageURL: imageURL,
    date: date,
    comments: comments,
  });
};

const remove = (req, res) => {
  const { id } = req.params;
  PostSchema.findByIdAndRemove(id)
    .exec()
    .then((post) => res.status(200).json({ post }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

module.exports = { createPost, getAll, getOne, update, remove };
