const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Messages = require("../Models/MessageModel");

dotenv.config();

const getMessages = async (req, res) => {
  Messages.find()
    .exec()
    .then((Messagess) => res.status(200).json({ Messagess }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

const addMessage = async (req, res, next) => {
  console.log(req.body);
  const { from, message } = req.body;
  const msg = new Messages({
    _id: new mongoose.Types.ObjectId(),
    message: { text: message },
    sender: from,
  });

  return msg
    .save()
    .then((msg) => res.status(201).json({ msg }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

module.exports = {
  addMessage,
  getMessages,
};
