const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    mobile: { type: String, unique: true },
  password: { type: String }, // Optional if using OTP only
    role: {
    type: String,
    enum: ["user", "partner", "admin"],
    default: "user"
    },
    isVerified: { type: Boolean, default: false },
    address: String,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
