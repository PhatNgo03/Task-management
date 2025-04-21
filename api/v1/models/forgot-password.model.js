const mongoose = require("mongoose");

const forgotSchema = new mongoose.Schema(
  {
    email : String,
    otp: String,
    expireAt: {
      type: Date,
      expires: 0,
      default: Date.now
    }
  },
  {
  timestamps: true
  }
);
const ForgotPassword = mongoose.model('ForgotPassword', forgotSchema, "forgot-password");

module.exports = ForgotPassword;