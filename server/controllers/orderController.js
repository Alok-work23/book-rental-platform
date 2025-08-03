const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("book");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
