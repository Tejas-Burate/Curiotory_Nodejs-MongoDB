"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    planId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Plan",
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
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
