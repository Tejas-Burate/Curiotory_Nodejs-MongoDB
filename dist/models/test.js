"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const testSchema = new mongoose_1.default.Schema({
    languageId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Language",
        required: false,
    },
    levelId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Level",
        required: false,
    },
    lesson: {
        type: Array,
        ref: "Lesson",
        required: false,
    },
    testImage: {
        type: String,
        required: true,
    },
    testName: {
        type: String,
        required: true,
    },
    rightAns: {
        type: Number,
        required: true,
    },
    wrongAns: {
        type: Number,
        required: true,
    },
    totalQues: {
        type: Number,
        required: true,
    },
    questions: {
        type: Object,
        default: null, // You can set the default value to null or adjust as needed
    },
    time: {
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
const Test = mongoose_1.default.model("Test", testSchema);
exports.default = Test;
