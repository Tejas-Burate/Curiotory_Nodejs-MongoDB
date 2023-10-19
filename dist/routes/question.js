"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_1 = require("../controllers/question");
const router = express_1.default.Router();
router.get("/getAllQuestionList", question_1.getAllQuestionList);
router.post("/editOptionsByQuestionId", question_1.editOptionsByQuestionId);
router.put("/updateQuestionByQuestionId/:id", question_1.updateQuestionByQuestionId);
exports.default = router;
