const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["placed", "shipped", "delivered", "cancelled", "pending"],
    default: "placed"
  },
  deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveryTrackingId: String,
  shippingAddress: String,
  distanceKm: Number,
  totalCost: Number,
  paymentMethod: String,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);

