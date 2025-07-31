const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  price: Number,
  available: Boolean,
  description: String,
  imageUrl: String
});

module.exports = mongoose.model("Book", bookSchema);
