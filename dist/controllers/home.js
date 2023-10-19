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
exports.getDashboardCount = void 0;
const language_1 = __importDefault(require("../models/language"));
const level_1 = __importDefault(require("../models/level"));
const lesson_1 = __importDefault(require("../models/lesson"));
const test_1 = __importDefault(require("../models/test"));
const module_1 = __importDefault(require("../models/module"));
const question_1 = __importDefault(require("../models/question"));
const video_1 = __importDefault(require("../models/video"));
const plan_1 = __importDefault(require("../models/plan"));
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const order_1 = __importDefault(require("../models/order"));
const meeting_1 = __importDefault(require("../models/meeting"));
const liveTest_1 = __importDefault(require("../models/liveTest"));
const getDashboardCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const language = yield language_1.default.countDocuments();
        const level = yield level_1.default.countDocuments();
        const lesson = yield lesson_1.default.countDocuments();
        const test = yield test_1.default.countDocuments();
        const module = yield module_1.default.countDocuments();
        const question = yield question_1.default.countDocuments();
        const video = yield video_1.default.countDocuments();
        const plan = yield plan_1.default.countDocuments();
        const user = yield user_1.default.countDocuments();
        const role = yield role_1.default.countDocuments();
        const order = yield order_1.default.countDocuments();
        const meeting = yield meeting_1.default.countDocuments();
        const liveTest = yield liveTest_1.default.countDocuments();
        const arr = {
            LanguageCount: language,
            LevelCount: level,
            LessonCount: lesson,
            TestCount: test,
            ModuleCount: module,
            QuestionCount: question,
            VideoCount: video,
            PlanCount: plan,
            UserCount: user,
            RoleCount: role,
            OrderCount: order,
            MeetingCount: meeting,
            LiveTestCount: liveTest,
        };
        res.status(200).json(arr);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error.." });
    }
});
exports.getDashboardCount = getDashboardCount;
