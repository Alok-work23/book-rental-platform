const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

// This route is now protected — needs valid JWT token
router.get('/me', protect, async (req, res) => {
  // req.user contains the token payload (e.g. user ID, role)
  res.json({ message: `Welcome user ${req.user.id}` });
});

module.exports = router;
