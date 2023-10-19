"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const meetingSchema = new mongoose_1.default.Schema({
    users: {
        type: Array,
        ref: "User",
        required: true,
    },
    languageId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Language",
        required: true,
    },
    meetingTitle: {
        type: String,
        required: true,
    },
    meetingStartDate: {
        type: Date,
        required: true,
    },
    meetingEndDate: {
        type: Date,
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
const Meeting = mongoose_1.default.model("Meeting", meetingSchema);
exports.default = Meeting;
