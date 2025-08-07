const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  category: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  image: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);

