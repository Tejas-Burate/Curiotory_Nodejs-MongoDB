"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.get("/getUserDetails", user_1.getUserDetails);
router.get("/getAllUserByLanguageId/:id", user_1.getAllUserByLanguageId);
router.get("/getTeachersList", user_1.getTeachersList);
router.get("/getAllTeacherByLanguageId/:id", user_1.getAllTeacherByLanguageId);
router.put("/editProfileData", user_1.editProfileData);
exports.default = router;
