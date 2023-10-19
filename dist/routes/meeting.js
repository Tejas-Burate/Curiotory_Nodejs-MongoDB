"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const meeting_1 = require("../controllers/meeting");
const router = express_1.default.Router();
router.get("/getAllJitsiMeeting", meeting_1.getAllJitsiMeeting);
router.delete("/deleteMeetingByMeetingId", meeting_1.deleteMeetingByMeetingId);
exports.default = router;
