const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  partner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  currentStatus: {
    type: String,
    enum: ["assigned", "picked", "in-transit", "delivered"],
    default: "assigned"
  },
  locationUpdates: [String], // Optional live tracking
  estimatedArrival: Date,
}, { timestamps: true });

module.exports = mongoose.model("Delivery", deliverySchema);




const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  partner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  currentStatus: {
    type: String,
    enum: ["assigned", "picked", "in-transit", "delivered"],
    default: "assigned"
  },
  distance: Number, // KM
  estimatedArrival: Date
}, { timestamps: true });

module.exports = mongoose.model("Delivery", deliverySchema);
