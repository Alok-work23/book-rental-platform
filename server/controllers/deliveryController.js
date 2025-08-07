const User = require("../models/User");
const Delivery = require("../models/Delivery");
const Order = require("../models/Order");

// Helper to calculate distance using Haversine formula
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
  return R * c; // in KM
};

exports.assignDeliveryPartner = async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findById(orderId).populate("buyer seller");
    if (!order) return res.status(404).json({ msg: "Order not found" });

    const buyerLocation = order.buyer.location.coordinates;
    const sellerLocation = order.seller.location.coordinates;

    const distance = getDistance(buyerLocation, sellerLocation);

    if (distance > 50) {
      return res.status(400).json({ msg: "Delivery not available in this area" });
    }

    // Find delivery partners within 10 KM of seller
    const partners = await User.find({
      role: "partner",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: sellerLocation
          },
          $maxDistance: 10000 // 10 KM
        }
      }
    });

    if (partners.length === 0) {
      return res.status(400).json({ msg: "No delivery partner nearby" });
    }

    // Assign first found partner
    const delivery = await Delivery.create({
      order: order._id,
      partner: partners[0]._id,
      distance,
      currentStatus: "assigned"
    });

    return res.status(201).json({
      msg: "Delivery partner assigned",
      deliveryId: delivery._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
