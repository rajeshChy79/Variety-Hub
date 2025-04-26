const Razorpay = require("razorpay");
require("dotenv").config(); // Load environment variables

//  Initialize Razorpay Instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, //  Load from .env
  key_secret: process.env.RAZORPAY_SECRET, //  Load from .env
});

module.exports = razorpayInstance;
