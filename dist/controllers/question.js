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
exports.updateQuestionByQuestionId = exports.editOptionsByQuestionId = exports.getAllQuestionList = void 0;
const question_1 = __importDefault(require("../models/question"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const getAllQuestionList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield question_1.default.aggregate([
            {
                $lookup: {
                    from: "languages",
                    localField: "languageId",
                    foreignField: "_id",
                    as: "language",
                },
            },
            {
                $lookup: {
                    from: "levels",
                    localField: "levelId",
                    foreignField: "_id",
                    as: "level",
                },
            },
            {
                $lookup: {
                    from: "lessons",
                    localField: "lessonId",
                    foreignField: "_id",
                    as: "lesson",
                },
            },
            {
                $unwind: "$language",
            },
            {
                $unwind: "$level",
            },
            {
                $unwind: "$lesson",
            },
            {
                $project: {
                    questionId: "$_id",
                    optionList: 1,
                    language: {
                        _id: "$language._id",
                        languageName: "$language.languageName",
                    },
                    level: {
                        _id: "$level._id",
                        levelName: "$level.levelName",
                    },
                    lesson: {
                        _id: "$lesson._id",
                        lessonName: "$lesson.lessonName",
                    },
                    question: 1,
                    solution: 1,
                    difficultyLevel: 1,
                    isActive: 1,
                },
            },
        ]);
        if (!result || result.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: "Questions not found",
            });
            return;
        }
        res.status(200).json({ data: result });
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
exports.getAllQuestionList = getAllQuestionList;
const editOptionsByQuestionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { questionId, options } = req.body;
        // // Map the 'options' array to the correct structure
        // const arr: Option[] = options.map((o: Option) => ({
        //   optionValue: o.optionValue,
        //   optionId: o.optionId,
        //   isCorrect: o.isCorrect,
        //   isActive: "1", // Ensure isActive is a string
        // }));
        // const question = await Question.findOne({ _id: questionId });
        // if (question) {
        //   question.optionList = arr;
        //   await question.save();
        //   const success = "Success";
        //   res.json(success);
        // } else {
        //   const error = "Question not found";
        //   res.status(400).json(error);
        // }
    }
    catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});
exports.editOptionsByQuestionId = editOptionsByQuestionId;
const updateQuestionByQuestionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timezone = process.env.TIMEZONE || "Asia/Kolkata";
        const currentDate = new Date();
        const utcOffset = moment_timezone_1.default.tz(timezone).utcOffset();
        currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);
        const id = req.params.id;
        // Use findByIdAndUpdate with the correct syntax
        const qts = yield question_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, req.body), { dateModified: currentDate }), { new: true });
        if (!qts) {
            res.status(400).json({
                status: 400,
                error: "404",
                message: `Failed to update Question of Id ${id}`,
            });
            return;
        }
        res.status(201).json(qts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});
exports.updateQuestionByQuestionId = updateQuestionByQuestionId;
