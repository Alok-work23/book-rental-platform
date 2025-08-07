const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  partner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // delivery person
  currentStatus: {
    type: String,
    enum: ["assigned", "picked", "in-transit", "delivered"],
    default: "assigned"
  },
  distance: Number, // KM
  estimatedArrival: Date
}, { timestamps: true });

module.exports = mongoose.model("Delivery", deliverySchema);
