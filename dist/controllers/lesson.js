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
exports.getAllLessons = exports.createLesson = void 0;
const lesson_1 = __importDefault(require("../models/lesson"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const createLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timezone = process.env.TIMEZONE || "Asia/Kolkata";
        const currentDate = new Date();
        const utcOffset = moment_timezone_1.default.tz(timezone).utcOffset();
        currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);
        const lesson = yield lesson_1.default.create(Object.assign(Object.assign({}, req.body), { dateCreated: currentDate, dateModified: currentDate }));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "An error occurred while updating the level.",
        });
    }
});
exports.createLesson = createLesson;
const getAllLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lesson = yield lesson_1.default.find();
        if (lesson.length === 0) {
            res
                .status(404)
                .json({ Status: 404, error: "404", message: "Lessons not found" });
            return;
        }
        res.status(200).json(lesson);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "An error occurred while updating the level.",
        });
    }
});
exports.getAllLessons = getAllLessons;
