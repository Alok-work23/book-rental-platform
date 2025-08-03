const Delivery = require("../models/Delivery");

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    delivery.currentStatus = req.body.status;
    await delivery.save();
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDeliveryStatus = async (req, res) => {
  try {
    const delivery = await Delivery.findOne({ order: req.params.orderId });
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
