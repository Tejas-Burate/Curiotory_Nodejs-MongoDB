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
exports.getDataTableForLessonList = exports.updateLessonByLessonId = exports.getAllLessonsByLevelId = exports.getAllLessons = exports.createLesson = void 0;
const lesson_1 = __importDefault(require("../models/lesson"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const { ObjectId } = require("mongoose").Types;
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
const getAllLessonsByLevelId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log("id", id);
        const lesson = yield lesson_1.default.find({ levelId: id }, { lessonName: 1 });
        if (lesson.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Lesson of given LevelId ${id} is not found`,
            });
            return;
        }
        res.status(200).json(lesson);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "500",
            message: "Internal Server Error",
        });
    }
});
exports.getAllLessonsByLevelId = getAllLessonsByLevelId;
const updateLessonByLessonId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const timezone = process.env.TIMEZONE || "Asia/Kolkata";
        const currentDate = new Date();
        const utcOffset = moment_timezone_1.default.tz(timezone).utcOffset();
        currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);
        // Use findByIdAndUpdate to update the lesson by ID
        const lesson = yield lesson_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, req.body), { dateModified: currentDate }), { new: true } // Return the updated lesson
        );
        if (!lesson) {
            return res.status(404).json({
                status: 404,
                error: "Not Found",
                message: `Lesson with ID ${id} not found`,
            });
        }
        res.status(200).json(lesson);
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
exports.updateLessonByLessonId = updateLessonByLessonId;
const getDataTableForLessonList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, length, start, order } = req.body;
    const recordPerPage = length;
    const searchData = search.value;
    try {
        let query = lesson_1.default.find();
        if (searchData) {
            const regex = new RegExp(searchData, "i");
            query.or([
                { lessonName: regex },
                { status: regex },
                { lessonDescription: regex },
            ]);
        }
        // Use aggregate or other query methods as needed
        // Make sure the query is not executed implicitly in multiple places
        const totalRecords = yield query.countDocuments();
        const totalPages = Math.ceil(totalRecords / length);
        query.sort({
            [order[0].column]: order[0].dir === "asc" ? 1 : -1,
        });
        query.skip(start).limit(length);
        // Execute the query using .exec() or other appropriate method
        const result = yield query.exec();
        const formattedResult = result.map((lesson) => {
            var _a, _b;
            return ({
                languageId: lesson.languageId,
                userId: (_a = lesson.userId) === null || _a === void 0 ? void 0 : _a._id,
                lessonName: lesson.lessonName,
                status: lesson.status,
                lessonDescription: lesson.lessonDescription,
                user: {
                    userId: (_b = lesson.userId) === null || _b === void 0 ? void 0 : _b._id, // Optional chaining
                    // username: lesson.userId?.fullName, // Optional chaining
                },
            });
        });
        res.status(200).json({
            recordPerPage,
            recordsTotal: totalRecords,
            recordsFiltered: totalRecords,
            totalPages,
            data: formattedResult,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "An error occurred while fetching data.",
        });
    }
});
exports.getDataTableForLessonList = getDataTableForLessonList;
