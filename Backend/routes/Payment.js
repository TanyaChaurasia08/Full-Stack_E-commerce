const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

// Replace with your real keys
const razorpay = new Razorpay({
  key_id: "rzp_test_h9OZRMM5sxiiXl",
  key_secret: "8bm4jBiMBqP7sd4BLmBB54WU",
});


router.post("/order", async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Convert rupees to paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

module.exports = router;
