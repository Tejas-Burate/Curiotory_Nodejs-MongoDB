"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const languageSchema = new mongoose_1.default.Schema({
    languageName: {
        type: String,
        required: true,
    },
    languageObj: {
        type: Object,
        required: true,
    },
    languageImage: {
        type: String,
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
const Language = mongoose_1.default.model("Language", languageSchema);
exports.default = Language;
