const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  name: String,
  otp: String,
  otpExpires: Date,
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "user" }
});

module.exports = mongoose.model('User', userSchema);
