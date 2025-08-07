const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateOTP } = require('../utils/otp');
const nodemailer = require('nodemailer');

exports.sendOTP = async (req, res) => {
  const { email, mobile } = req.body;
  const otp = generateOTP();

  try {
    let user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (!user) user = new User({ email, mobile });

    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    // Send email (for now; SMS later)
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transport.sendMail({
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`
    });

    res.json({ msg: "OTP sent to email/mobile" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, mobile, otp } = req.body;
  const user = await User.findOne({ $or: [{ email }, { mobile }] });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ msg: "Invalid or expired OTP" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ token, user });
};
