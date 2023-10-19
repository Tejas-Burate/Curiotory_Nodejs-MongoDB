"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moduleSchema = new mongoose_1.default.Schema({
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
    moduleName: {
        type: String,
        required: true,
    },
    numberOfQuestions: {
        type: Number,
        required: true,
    },
    difficultyLevel: {
        type: String,
        required: true,
    },
    examMode: {
        type: String,
        required: true,
    },
    questionSet: {
        type: Array,
        required: true,
        // default: null, // You can set the default value to null or adjust as needed
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
const Module = mongoose_1.default.model("Module", moduleSchema);
exports.default = Module;
