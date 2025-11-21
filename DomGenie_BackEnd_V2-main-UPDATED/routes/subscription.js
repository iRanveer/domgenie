const express = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Currency → Razorpay Plan Mapping (placeholders)
const PLAN_MAPPING = {
  USD: "plan_USD_xxxx",
  CAD: "plan_CAD_xxxx",
  INR: "plan_INR_xxxx",
};

router.post("/create-subscription", async (req, res) => {
  try {
    const { currency } = req.body;

    if (!PLAN_MAPPING[currency]) {
      return res.status(400).json({ error: "Unsupported currency" });
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: PLAN_MAPPING[currency],
      customer_notify: 1,
      total_count: 12,
      quantity: 1,
    });

    res.json({ id: subscription.id });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
