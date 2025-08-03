const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  address: String,
  status: { type: String, default: "pending" },
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
