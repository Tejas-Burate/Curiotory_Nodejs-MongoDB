"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const levelSchema = new mongoose_1.default.Schema({
    levelName: {
        type: String,
        required: true,
    },
    languageId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Language",
        required: false,
    },
    dateCreated: {
        type: Date,
    },
    dateModified: {
        type: Date,
    },
});
const Level = mongoose_1.default.model("Level", levelSchema);
exports.default = Level;
