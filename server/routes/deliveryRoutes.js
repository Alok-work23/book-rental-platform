const express = require("express");
const router = express.Router();
const { assignDeliveryPartner } = require("../controllers/deliveryController");

router.post("/assign", assignDeliveryPartner);

module.exports = router;
