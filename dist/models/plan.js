"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the Plan Schema
const planSchema = new mongoose_1.default.Schema({
    planName: {
        type: String,
        required: true,
    },
    languageId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Language",
        required: true,
    },
    levels: {
        type: Object,
        required: true,
    },
    planSubtitle: {
        type: String,
        required: true,
    },
    planPrice: {
        type: Number,
        required: true,
    },
    planDuration: {
        type: Number,
        required: true,
    },
    planDesc: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        enum: ["Active", "Deactive"],
        required: true,
    },
    isLivePlan: {
        type: Number,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    dateModified: {
        type: Date,
        required: true,
    },
});
// Create a Mongoose model based on the schema
const Plan = mongoose_1.default.model("Plan", planSchema);
exports.default = Plan;
