import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming User has its own schema
    ref: "User", // Reference to the User model
    required: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming Plan has its own schema
    ref: "Plan", // Reference to the Plan model
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "created",
      "authorized",
      "captured",
      "refund",
      "failed",
      "paid",
      "started",
    ],
    required: true,
  },
  rPaymentId: {
    type: String,
    required: true,
  },
  rOrderId: {
    type: String,
    required: true,
  },
  rSignature: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: false,
  },
  dateModified: {
    type: Date,
    required: false,
  },
});

const Order = mongoose.model("Order".orderSchema);

export default Order;
