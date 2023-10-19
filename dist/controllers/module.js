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
exports.getDataTableForModuleList = exports.updateModuleByModuleId = exports.getModuleByModuleId = exports.getModuleByLessonId = exports.getAllModuleList = exports.createModule = void 0;
const module_1 = __importDefault(require("../models/module"));
const language_1 = __importDefault(require("../models/language"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const level_1 = __importDefault(require("../models/level"));
const lesson_1 = __importDefault(require("../models/lesson"));
const createModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { languageId, levelId, lessonId } = req.body;
        const timezone = process.env.TIMEZONE || "Asia/Kolkata";
        const currentDate = new Date();
        const utcOffset = moment_timezone_1.default.tz(timezone).utcOffset();
        currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);
        const language = yield language_1.default.findById(languageId);
        const level = yield level_1.default.findById(levelId);
        const lesson = yield lesson_1.default.findById(lessonId);
        if (!language) {
            res.status(400).json({
                status: 400,
                error: "400",
                message: `Language of ID ${languageId} is not found`,
            });
            return;
        }
        if (!level) {
            res.status(400).json({
                status: 400,
                error: "400",
                message: `Level of ID ${levelId} is not found`,
            });
            return;
        }
        if (!lesson) {
            res.status(400).json({
                status: 400,
                error: "400",
                message: `Lesson of ID ${lessonId} is not found`,
            });
            return;
        }
        const module = yield module_1.default.create(Object.assign(Object.assign({}, req.body), { dateCreated: currentDate, dateModified: currentDate }));
        if (!module) {
            res.status(400).json({
                status: 400,
                error: "400",
                message: "Failed to create new module..",
            });
            return;
        }
        res.status(200).json(module);
    }
    catch (error) {
        console.error("error", error);
        return res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "Internal Server Error",
        });
    }
});
exports.createModule = createModule;
const getAllModuleList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const module = yield module_1.default.find();
        if (module.length === 0) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Module data not found" });
            return;
        }
        res.status(200).json(module);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllModuleList = getAllModuleList;
const getModuleByLessonId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const module = yield module_1.default.find({ lessonId: id });
        if (module.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Module of Lesson Id ${id} is not found`,
            });
            return;
        }
        res.status(200).json(module);
    }
    catch (error) {
        console.error("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getModuleByLessonId = getModuleByLessonId;
const getModuleByModuleId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const module = yield module_1.default.find({ _id: id });
        if (module.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Module of Module Id ${id} is not found`,
            });
            return;
        }
        res.status(200).json(module);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getModuleByModuleId = getModuleByModuleId;
const updateModuleByModuleId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const {lessons} = req.body;
        const id = req.params.id;
        const module = yield module_1.default.findOne({ _id: id });
        if (!module) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `module of module ID ${id} is not found`,
            });
            return;
        }
        const timezone = process.env.TIMEZONE || "Asia/Kolkata";
        const currentDate = new Date();
        const utcOffset = moment_timezone_1.default.tz(timezone).utcOffset();
        currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);
        const moduleUpdate = yield module_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, req.body), { dateModified: currentDate }), {
            new: true,
        });
        if (!moduleUpdate) {
            res.status(400).json({
                status: 400,
                error: "400",
                message: "Failed to update Test",
            });
            return;
        }
        res.status(200).json(moduleUpdate);
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            status: 500,
            error: "500",
            message: "Internal Server Error",
        });
    }
});
exports.updateModuleByModuleId = updateModuleByModuleId;
const getDataTableForModuleList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, length, start, page, order } = req.body;
        const recordPerPage = length;
        const searchData = search.value;
        let searchQuery = {};
        if (searchData) {
            const regex = new RegExp(searchData, "i");
            searchQuery = {
                $or: [
                    { moduleName: regex },
                    { difficultyLevel: regex },
                    { examMode: regex },
                ],
            };
        }
        const totalRecords = yield module_1.default.countDocuments(searchQuery);
        const totalPages = Math.ceil(totalRecords / length);
        let query = module_1.default.find(searchQuery).skip(start).limit(length);
        const sortColumnIndex = order[0].column;
        const sortColumnDir = order[0].dir;
        let sort = {};
        switch (sortColumnIndex) {
            case 0:
                sort = { moduleName: sortColumnDir };
                break;
            case 1:
                sort = { difficultyLevel: sortColumnDir };
                break;
            default:
                sort = { dateCreated: "asc" };
                break;
        }
        query = query.sort(sort);
        query = query.populate("levelId", "levelName");
        query = query.populate("languageId", "languageName");
        query = query.populate("lessonId", "lessonName");
        const result = yield query.exec();
        const responseData = result.map((module) => {
            return {
                _id: module._id,
                language: module.languageId,
                level: module.levelId,
                lesson: module.lessonId,
                moduleName: module.moduleName,
                numberOfQuestions: module.numberOfQuestions,
                difficultyLevel: module.difficultyLevel,
                examMode: module.examMode,
                dateCreated: module.dateCreated,
                dateModified: module.dateModified,
            };
        });
        res.status(200).json({ totalRecords, totalPages, result: responseData });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
});
exports.getDataTableForModuleList = getDataTableForModuleList;
