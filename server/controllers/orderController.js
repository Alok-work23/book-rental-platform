const Order = require("../models/Order");
const Book = require("../models/Book");
const User = require("../models/User");
const axios = require("axios"); // for delivery trigger

// Haversine formula
const getDistance = (coord1, coord2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

exports.createOrder = async (req, res) => {
  const { bookId, buyerId } = req.body;

  try {
    const book = await Book.findById(bookId).populate("owner");
    const buyer = await User.findById(buyerId);
    const seller = book.owner;

    if (!buyer || !seller || !book) {
      return res.status(404).json({ msg: "Invalid data" });
    }

    const buyerLoc = buyer.location.coordinates;
    const sellerLoc = seller.location.coordinates;

    const distance = getDistance(buyerLoc, sellerLoc);

    // Reject if distance too far
    if (distance > 50) {
      return res.status(400).json({ msg: "Book not available in your area" });
    }

    // Create Order
    const newOrder = await Order.create({
      book: book._id,
      buyer: buyer._id,
      seller: seller._id,
      distanceKm: distance,
    });

    // Call Aditya’s delivery assign route (internal call)
    await axios.post("http://localhost:5000/api/delivery/assign", {
      orderId: newOrder._id
    });

    res.status(201).json({ msg: "Order placed", orderId: newOrder._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
