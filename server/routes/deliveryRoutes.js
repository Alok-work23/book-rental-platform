const express = require("express");
const router = express.Router();
const {
  updateDeliveryStatus,
  getDeliveryStatus
} = require("../controllers/deliveryController");

router.put("/:id/status", updateDeliveryStatus);
router.get("/order/:orderId", getDeliveryStatus);

module.exports = router;
