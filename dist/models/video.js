"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const videoSchema = new mongoose_1.default.Schema({
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
    videoName: {
        type: String,
        required: true,
    },
    videoThumbnail: {
        type: String,
        required: true,
    },
    videoFileName: {
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
const Video = mongoose_1.default.model("Video", videoSchema);
exports.default = Video;
