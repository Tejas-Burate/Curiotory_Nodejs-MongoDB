"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the Plan Schema
const questionSchema = new mongoose_1.default.Schema({
    languageId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Language",
        required: true,
    },
    levelId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Level",
        required: true,
    },
    lessonId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true,
    },
    optionList: {
        type: Object,
        required: true,
    },
    difficultyLevel: {
        type: String,
        required: true,
    },
    isActive: {
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
const Question = mongoose_1.default.model("Question", questionSchema);
exports.default = Question;
