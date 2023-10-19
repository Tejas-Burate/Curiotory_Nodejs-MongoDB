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
exports.editProfileData = exports.getAllTeacherByLanguageId = exports.getTeachersList = exports.getAllUserByLanguageId = exports.getUserDetails = void 0;
const user_1 = __importDefault(require("../models/user"));
const teacherDetails_1 = __importDefault(require("../models/teacherDetails"));
const teacherDetails_2 = __importDefault(require("../models/teacherDetails"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.find();
        if (user.length === 0) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Users Not Found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getUserDetails = getUserDetails;
const getAllUserByLanguageId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_1.default.find({ languageId: id });
        if (user.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `User's of Language ID ${id} is not found`,
            });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllUserByLanguageId = getAllUserByLanguageId;
const getTeachersList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacherList = yield teacherDetails_1.default.find();
        if (teacherList.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: "Teacher Details Not Found",
            });
            return;
        }
        res.status(200).json(teacherList);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getTeachersList = getTeachersList;
const getAllTeacherByLanguageId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // You should use the Mongoose ObjectId to create a valid query
        const ObjectId = require("mongoose").Types.ObjectId;
        // Use the correct Mongoose query to find by languageId and roleId
        const users = yield user_1.default.find({
            languageId: new ObjectId(id),
            roleId: new ObjectId("65115259a2acb4c71b4d6d76"), // Replace with the correct roleId
        });
        if (users.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Teacher of language Id ${id} is not found`,
            });
            return;
        }
        const teacherPromises = users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const teacher = yield teacherDetails_2.default.find({ userId: user._id });
            return {
                teacher,
            };
        }));
        const teachers = yield Promise.all(teacherPromises);
        res.status(200).json(teachers);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllTeacherByLanguageId = getAllTeacherByLanguageId;
const editProfileData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const user = yield user_1.default.findOne({ _id: userId });
        if (!user) {
            res
                .status(404)
                .json({
                status: 404,
                error: "404",
                message: `User of ID ${userId} is not found`,
            });
            return;
        }
        const timezone = process.env.TIMEZONE || "Asia/Kolkata";
        const currentDate = new Date();
        const utcOffset = moment_timezone_1.default.tz(timezone).utcOffset();
        currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);
        const editUser = yield user_1.default.findByIdAndUpdate(userId, Object.assign(Object.assign({}, req.body), { dateModified: currentDate }), { new: true });
        if (!editUser) {
            res
                .status(400)
                .json({ status: 400, error: "400", message: "Failed to update user" });
            return;
        }
        res.status(200).json(editUser);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.editProfileData = editProfileData;
