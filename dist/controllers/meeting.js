"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeetingByMeetingId = exports.getAllJitsiMeeting = void 0;
const meeting_1 = __importDefault(require("../models/meeting"));
const getAllJitsiMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use the populate method to fetch related data from the Language collection
        const meetings = yield meeting_1.default.find().populate("languageId", "languageName");
        res.status(200).json(meetings);
    }
    catch (error) {
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllJitsiMeeting = getAllJitsiMeeting;
const deleteMeetingByMeetingId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { meetingId } = req.body;
        const meeting = yield meeting_1.default.findOne({ _id: meetingId });
        if (!meeting) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Meeting of meeting ID ${meetingId} is not found`,
            });
            return;
        }
        const deleteMeeting = yield meeting_1.default.findByIdAndDelete(meetingId);
        if (!deleteMeeting) {
            res.status(400).json({
                status: 400,
                error: "400",
                message: "Failed to delete meeting",
            });
            return;
        }
        res.status(200).json({
            message: `Meeting of ID ${meetingId} is deleted successfully...`,
        });
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.deleteMeetingByMeetingId = deleteMeetingByMeetingId;
