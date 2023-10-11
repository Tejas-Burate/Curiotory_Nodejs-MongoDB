"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lessonSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
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
    lessonName: {
        type: String,
        required: true,
    },
    lessonDescription: {
        type: String,
        required: true,
    },
    lessonImage: {
        type: String,
        required: true,
    },
    status: {
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
const Lesson = mongoose_1.default.model("Lesson", lessonSchema);
exports.default = Lesson;
