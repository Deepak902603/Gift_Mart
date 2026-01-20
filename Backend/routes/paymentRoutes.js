import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// Create new payment
router.post("/", async (req, res) => {
  try {
    const { orderId, paymentMethod, transactionId, amount, currency, status } = req.body;

    if (!orderId || !paymentMethod || !amount) {
      return res.status(400).json({ message: "OrderId, Payment Method & Amount are required" });
    }

    const payment = new Payment({
      orderId,
      paymentMethod,
      transactionId,
      amount,
      currency,
      status,
    });

    await payment.save();
    res.status(201).json({ message: "✅ Payment recorded successfully", payment });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get all payments (optionally filter by orderId)
router.get("/", async (req, res) => {
  try {
    const { orderId } = req.query;
    let query = {};
    if (orderId) query.orderId = orderId;

    const payments = await Payment.find(query).populate("orderId");
    res.json(payments);
  } catch (error) {
    console.error("Fetch Payments Error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
