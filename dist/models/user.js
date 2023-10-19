"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roleId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    languageId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Language",
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Staged", "Provisioned", "Active", "Recovery"],
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
    deviceRegistrationToken: {
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
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
