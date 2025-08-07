const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["placed", "shipped", "delivered", "cancelled"],
    default: "placed"
  },
  deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveryTrackingId: String,
  shippingAddress: String,
  distanceKm: Number,
  totalCost: Number,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);



const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  distanceKm: Number,
  shippingAddress: String,
  status: {
    type: String,
    enum: ["placed", "shipped", "delivered", "cancelled"],
    default: "placed"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);

