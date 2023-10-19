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
exports.createVideo = exports.getVideoListByLevelId = exports.getAllVideoList = void 0;
const video_1 = __importDefault(require("../models/video"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const getAllVideoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield video_1.default.find();
        if (!video) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Video Not Found" });
            return;
        }
        res.status(200).json(video);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "An error occurred while updating the lesson.",
        });
    }
});
exports.getAllVideoList = getAllVideoList;
const getVideoListByLevelId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const video = yield video_1.default.find({ levelId: id });
        if (video.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Video of level Id ${id} is not found`,
            });
            return;
        }
        res.status(200).json(video);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "An error occurred while updating the lesson.",
        });
    }
});
exports.getVideoListByLevelId = getVideoListByLevelId;
const createVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timezone = process.env.TIMEZONE || "Asia/Kolkata";
        const currentDate = new Date();
        const utcOffset = moment_timezone_1.default.tz(timezone).utcOffset();
        currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);
        const video = yield video_1.default.create(Object.assign(Object.assign({}, req.body), { dateCreated: currentDate, dateModified: currentDate }));
        if (!video) {
            res
                .status(400)
                .json({ status: 400, error: "400", message: "Failed to create video" });
            return;
        }
        res.status(201).json(video);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "An error occurred while updating the lesson.",
        });
    }
});
exports.createVideo = createVideo;
