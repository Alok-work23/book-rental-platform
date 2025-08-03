const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  partner: String,
  currentStatus: String, // e.g. “In Transit”, “Delivered”
  estimatedDelivery: Date
});

module.exports = mongoose.model("Delivery", deliverySchema);
