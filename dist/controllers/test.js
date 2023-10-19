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
exports.updateTestByTestId = exports.getTestListByLanguageId = exports.getTestByTestId = exports.getTestList = void 0;
const test_1 = __importDefault(require("../models/test"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const getTestList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield test_1.default.find();
        if (test.length === 0) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Test Not Found" });
            return;
        }
        res.status(200).json(test);
    }
    catch (error) {
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getTestList = getTestList;
const getTestByTestId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const test = yield test_1.default.findOne({ languageId: id });
        if (!test) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Test of Test Id ${id} is not found`,
            });
            return;
        }
        res.status(200).json(test);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getTestByTestId = getTestByTestId;
const getTestListByLanguageId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const test = yield test_1.default.find({ languageId: id });
        if (test.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Test of Language Id ${id} is not found`,
            });
            return;
        }
        res.status(200).json(test);
    }
    catch (error) {
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getTestListByLanguageId = getTestListByLanguageId;
const updateTestByTestId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const {lessons} = req.body;
        const id = req.params.id;
        const test = yield test_1.default.findOne({ _id: id });
        if (!test) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Test of Test ID ${id} is not found`,
            });
            return;
        }
        const timezone = process.env.TIMEZONE || "Asia/Kolkata";
        const currentDate = new Date();
        const utcOffset = moment_timezone_1.default.tz(timezone).utcOffset();
        currentDate.setUTCMinutes(currentDate.getUTCMinutes() + utcOffset);
        const testUpdate = yield test_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, req.body), { dateModified: currentDate }), {
            new: true,
        });
        if (!testUpdate) {
            res.status(400).json({
                status: 400,
                error: "400",
                message: "Failed to update Test",
            });
            return;
        }
        res.status(200).json(testUpdate);
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
exports.updateTestByTestId = updateTestByTestId;
