const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema({
    name: String,
    address: String,
    location: String,
    capacity: String,
    occupied: String,
    contact: String
});

module.exports = mongoose.model("Shelter", shelterSchema);
