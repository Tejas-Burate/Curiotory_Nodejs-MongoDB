"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lesson_1 = require("../controllers/lesson");
const router = express_1.default.Router();
router.get("/getAllLessonsByLevelId/:id", lesson_1.getAllLessonsByLevelId);
router.get("/getAllLessons", lesson_1.getAllLessons);
router.put("/updateLessonByLessonId/:id", lesson_1.updateLessonByLessonId);
router.post("/getDataTableForLessonList", lesson_1.getDataTableForLessonList);
exports.default = router;
