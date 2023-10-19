"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const video_1 = require("../controllers/video");
const router = express_1.default.Router();
router.get("/getAllVideoList", video_1.getAllVideoList);
router.get("/getVideoListByLevelId/:id", video_1.getVideoListByLevelId);
router.post("/createVideo", video_1.createVideo);
exports.default = router;
