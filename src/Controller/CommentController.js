const dotenv = require("dotenv");
const mongoose = require("mongoose");
const commentSchema = require("../Models/commentModel");
dotenv.config();

const createComment = (req, res) => {
  console.log("Creating");
  const { body } = req;
  const { postId, CommentorId, CommentorName, CommentorAvator, comments } =
    body;
  const comment = new commentSchema({
    Id: new mongoose.Types.ObjectId(),
    postId: postId,
    CommentorId: CommentorId,
    CommentorName: CommentorName,
    CommentorAvator: CommentorAvator,
    Comment: comments,
  });
  return comment
    .save()
    .then((comment) => res.status(201).json({ comment }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const getAll = (req, res) => {
  commentSchema
    .find()
    .exec()
    .then((comment) => res.status(200).json({ comment }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const getOne = (req, res) => {
  const { id } = req.params;
  commentSchema
    .findById(id)
    .exec()
    .then((comment) => res.status(200).json({ comment }))
    .catch((error) => {
      console.log(error);
    });
};

const update = (req, res) => {
  const { Id } = req.params;
  const { postId, CommentorId, CommentorName, CommentorAvator, comments } =
    req.body;
  commentSchema.findByIdAndUpdate(Id, {
    postId: postId,
    CommentorId: CommentorId,
    CommentorName: CommentorName,
    CommentorAvator: CommentorAvator,
    Comment: comments,
  });
};

const remove = (req, res) => {
  const { Id } = req.params;
  commentSchema
    .findByIdAndRemove(Id)
    .exec()
    .then((comment) => res.status(200).json({ comment }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

module.exports = { createComment, getAll, getOne, update, remove };
