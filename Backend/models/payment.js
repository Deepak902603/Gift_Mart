import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Billing", // Link with billing info
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: [
        "Direct Bank Transfer",
        "Check Payment",
        "Cash on Delivery",
        "PayPal",
        "Google Pay",
        "Paytm",
        "PhonePe",
      ],
      required: [true, "Payment method is required"],
    },
    transactionId: {
      type: String,
      validate: {
        validator: function (v) {
          if (
            ["PayPal", "Google Pay", "Paytm", "PhonePe"].includes(this.paymentMethod)
          ) {
            return v && v.length > 0; // required for online payments
          }
          return true; // optional for others
        },
        message: "Transaction ID is required for online payments",
      },
      default: null,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be at least 1"],
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
